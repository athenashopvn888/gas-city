import { cache } from "react";
import {
  CIG_WORDING_FALLBACK,
  CIGARETTE_REVALIDATE_SECONDS,
  cigaretteAccessFrom,
  cigarettePublicHeaders,
  decideCigaretteGuide,
  decideCigaretteSurface,
  publicWebsiteCigaretteFlag,
  reconcileSurfaceItems,
  type CigaretteAccess,
  type CigaretteSurfaceDecision,
  type CigaretteWording,
} from "./cigDecision";
import type { FleetState } from "./fleet/types";
import { allItems, type ItemProduct } from "./products";
import itemsJson from "./items.json";
import { cigaretteEnvHardOff, SHOW_CIGARETTES } from "./siteConfig";

export type CigaretteSnapshot = {
  web: CigaretteSurfaceDecision;
  tv: CigaretteSurfaceDecision;
  guides: CigaretteSurfaceDecision;
  wording: CigaretteWording;
  live: boolean;
  items: ItemProduct[];
};

export type PublicCigaretteState = {
  web: boolean;
  tv: boolean;
  wording: CigaretteWording;
};

const DEFAULT_MENU_URL =
  "https://script.google.com/macros/s/AKfycbx09_sDal1eMVF1r-hUck4e7oq_XBHEWhGvA79JuhZNQ6P4CdhCas0xE3FfexWQ3hq4/exec";

const staticShelf = itemsJson as ItemProduct[];

function menuUrl(): string {
  const raw = (process.env.MENU_FEED_URL || "").trim();
  return raw || DEFAULT_MENU_URL;
}

function snapshotFrom(cig: unknown, items: ItemProduct[], live: boolean, errored: boolean): CigaretteSnapshot {
  const webDecision = decideCigaretteSurface({ cig, items, surface: "web", errored, codedShow: SHOW_CIGARETTES });
  const tv = decideCigaretteSurface({ cig, items, surface: "tv", errored });
  const guides = decideCigaretteGuide({ cig, items, errored, codedShow: SHOW_CIGARETTES });
  // SHOW_CIGARETTES ? feed.web : false, and false on a feed error or a missing block.
  const web = { ...webDecision, show: publicWebsiteCigaretteFlag(webDecision, SHOW_CIGARETTES) };
  return { web, tv, guides, wording: web.wording, live, items };
}

export async function readCigaretteFeed(): Promise<CigaretteSnapshot> {
  if (cigaretteEnvHardOff()) return snapshotFrom(null, [], false, false);
  try {
    const response = await fetch(`${menuUrl()}?store=GCC01`, {
      next: { revalidate: CIGARETTE_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return snapshotFrom(null, staticShelf, false, true);
    const data = await response.json() as { cig?: unknown; items?: ItemProduct[]; flowers?: unknown };
    const items = Array.isArray(data?.items) && data.items.length ? data.items : staticShelf;
    const cig = data?.cig ?? null;
    const live = Array.isArray(data?.flowers);
    // Last-good cig inside the cache window still follows its saved tvOn.
    // A miss with no saved cig is an error. TV hides, and the website flag stays off.
    return snapshotFrom(cig, items, live, !live && !cig);
  } catch {
    return snapshotFrom(null, staticShelf.length ? staticShelf : allItems, false, true);
  }
}

export const getCigaretteSnapshot = cache(readCigaretteFeed);

export function toPublicCigaretteState(snap: CigaretteSnapshot): PublicCigaretteState {
  return { web: snap.web.show, tv: snap.tv.show, wording: snap.wording };
}

export function snapshotHeaders(snap: CigaretteSnapshot): Record<string, string> {
  return cigarettePublicHeaders({ web: snap.web.show, tv: snap.tv.show, wording: snap.wording });
}

/** Coded content keeps today's switch. A live bundle lets webOn and tvOn drive. */
export async function getPublicCigaretteFlags(fleet: FleetState): Promise<PublicCigaretteState> {
  if (!fleet.active) {
    return { web: SHOW_CIGARETTES, tv: SHOW_CIGARETTES, wording: CIG_WORDING_FALLBACK };
  }
  const snap = await getCigaretteSnapshot();
  return toPublicCigaretteState(snap);
}

export async function getCigaretteAccess(fleetActive: boolean): Promise<CigaretteAccess> {
  if (!fleetActive) return SHOW_CIGARETTES ? "show" : "redirect";
  const snap = await getCigaretteSnapshot();
  return cigaretteAccessFrom({ fleetActive: true, decision: snap.web });
}

export { reconcileSurfaceItems };
