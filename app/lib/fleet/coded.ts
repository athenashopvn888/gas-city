export { CODED_BANNERS, CODED_NAP, CODED_PAGES } from "./config.ts";
import { CODED_BANNERS, FLEET_STORE_CODE } from "./config.ts";
import type { ResolvedBanner } from "./types.ts";

export function fleetVersion(contentVersion: number | null): string {
  return contentVersion == null ? `${FLEET_STORE_CODE}:coded` : `${FLEET_STORE_CODE}:${contentVersion}`;
}

export function codedBannerFor(id: ResolvedBanner["id"]): ResolvedBanner | undefined {
  return CODED_BANNERS.find((entry) => entry.id === id);
}
