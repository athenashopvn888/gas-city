import { resetFleetArticleCache } from "./articles.ts";
import { CODED_NAP, CODED_PAGES, fleetVersion } from "./coded.ts";
import { defaultManifestUrl } from "./config.ts";
import { resolveBanners, resolveNap, resolvePages } from "./resolve.ts";
import { resolveFullscreenPromos, resolveTvCards } from "./tv.ts";
import { FLEET_CONTENT_TAG, FLEET_STORE_CODE, type ContentBundle, type ContentManifest, type FleetState, type TvCardSlot, type TvFullscreenPromo } from "./types.ts";
import { parseBundle, parseManifest, rejectHttp } from "./validate.ts";

export const FLEET_MANIFEST_ENV = "FLEET_CONTENT_MANIFEST_URL";
export const FLEET_REVALIDATE_ENV = "FLEET_REVALIDATE_SECRET";
export { CONTENT_MODE_ENV, EDGE_CONFIG_ENV, contentModeForcesCoded, readEmergencyCoded } from "./emergency.ts";
import { readEmergencyCoded } from "./emergency.ts";
/** Public blob. Used when FLEET_CONTENT_MANIFEST_URL is unset. Not a secret. */
export const FLEET_MANIFEST_DEFAULT_URL = defaultManifestUrl();
/** ISR window so a publish shows up within about five minutes without the revalidate secret. */
export const FLEET_ISR_SECONDS = 300;

type Accepted = {
  manifest: ContentManifest;
  bundle: ContentBundle;
  etag: string;
};

let accepted: Accepted | null = null;

export function resetFleetContentCache(): void {
  accepted = null;
  resetFleetArticleCache();
}

export function codedFleetState(renderedAt = new Date().toISOString(), manifest: FleetState["manifest"] = "absent"): FleetState {
  return {
    active: false,
    version: fleetVersion(null),
    contentVersion: null,
    bundleUrl: "",
    renderedAt,
    manifest,
    mode: "coded",
    nap: CODED_NAP,
    banners: [],
    pages: CODED_PAGES,
    tvCards: {},
    fullscreenPromos: [],
  };
}

function stateFrom(bundle: ContentBundle, manifest: ContentManifest, renderedAt: string, manifestStatus: FleetState["manifest"]): FleetState {
  const now = new Date(renderedAt);
  return {
    active: true,
    version: fleetVersion(manifest.contentVersion),
    contentVersion: manifest.contentVersion,
    bundleUrl: manifest.bundleUrl,
    renderedAt,
    manifest: manifestStatus,
    mode: "bundle",
    nap: resolveNap(bundle),
    banners: resolveBanners(bundle),
    pages: resolvePages(bundle),
    tvCards: resolveTvCards(bundle, now),
    fullscreenPromos: resolveFullscreenPromos(bundle, now),
  };
}

function fallbackState(renderedAt: string): FleetState {
  return accepted
    ? stateFrom(accepted.bundle, accepted.manifest, renderedAt, "err")
    : codedFleetState(renderedAt, "err");
}

export function fleetManifestUrl(explicit?: string | null): string {
  if (explicit !== undefined) return explicit?.trim() || "";
  return process.env[FLEET_MANIFEST_ENV]?.trim() || FLEET_MANIFEST_DEFAULT_URL;
}

function fleetRequestInit(headers?: Record<string, string>): RequestInit {
  return {
    headers,
    next: { revalidate: FLEET_ISR_SECONDS, tags: [FLEET_CONTENT_TAG] },
    signal: AbortSignal.timeout(8000),
  };
}

export async function readFleetContent(options: {
  manifestUrl?: string | null;
  fetchImpl?: typeof fetch;
  emergencyCoded?: boolean;
  renderedAt?: string;
} = {}): Promise<FleetState> {
  const renderedAt = options.renderedAt ?? new Date().toISOString();
  const emergency = options.emergencyCoded ?? await readEmergencyCoded(options.fetchImpl);
  if (emergency) return codedFleetState(renderedAt);
  const manifestUrl = fleetManifestUrl(options.manifestUrl);
  if (!manifestUrl) return codedFleetState(renderedAt);

  const fetchImpl = options.fetchImpl ?? fetch;
  const manifestHeaders: Record<string, string> = {};
  if (accepted?.etag) manifestHeaders["if-none-match"] = accepted.etag;
  let manifestResponse: Response;
  try {
    manifestResponse = await fetchImpl(manifestUrl, fleetRequestInit(manifestHeaders));
  } catch {
    return fallbackState(renderedAt);
  }
  const httpProblem = rejectHttp(manifestResponse.status);
  if (manifestResponse.status === 304 && accepted) return stateFrom(accepted.bundle, accepted.manifest, renderedAt, "ok");
  if (httpProblem || manifestResponse.status === 304) return fallbackState(renderedAt);
  const manifestRaw = await manifestResponse.text();
  const manifest = parseManifest(manifestRaw);
  if (!manifest.ok) return fallbackState(renderedAt);

  let bundleResponse: Response;
  try {
    bundleResponse = await fetchImpl(manifest.value.bundleUrl, fleetRequestInit());
  } catch {
    return fallbackState(renderedAt);
  }
  const bundleHttp = rejectHttp(bundleResponse.status);
  if (bundleHttp) return fallbackState(renderedAt);
  const bundleRaw = await bundleResponse.text();
  const bundle = parseBundle(bundleRaw, accepted?.bundle ?? null);
  if (!bundle.ok) return fallbackState(renderedAt);

  const etag = manifestResponse.headers.get("etag") || `"${FLEET_STORE_CODE}-${manifest.value.contentVersion}"`;
  accepted = { manifest: manifest.value, bundle: bundle.value, etag };
  return stateFrom(bundle.value, manifest.value, renderedAt, "ok");
}

export function tvManifestDecision(state: FleetState, ifNoneMatch: string | null) {
  const etag = manifestEtag(state.contentVersion);
  if (ifNoneMatch === etag) return { status: 304 as const, etag, body: null };
  return { status: 200 as const, etag, body: tvManifestBody(state) };
}

export function manifestEtag(version: number | null): string {
  return version == null ? `"${FLEET_STORE_CODE}-coded"` : `"${FLEET_STORE_CODE}-${version}"`;
}

export type TvManifestPayload = ContentManifest & {
  tvCards: Record<string, TvCardSlot>;
  fullscreenPromos: TvFullscreenPromo[];
};

export function tvManifestBody(state: FleetState): TvManifestPayload {
  return {
    storeCode: FLEET_STORE_CODE,
    contentVersion: state.contentVersion ?? 0,
    bundleUrl: state.bundleUrl,
    publishedAt: state.renderedAt,
    jobId: state.active ? "published" : "coded",
    tvCards: state.tvCards,
    fullscreenPromos: state.fullscreenPromos,
  };
}

/** CDN absorbs TV polling. Browsers still revalidate. */
export const TV_MANIFEST_CACHE_CONTROL = "public, max-age=0, s-maxage=60, stale-while-revalidate=300";
