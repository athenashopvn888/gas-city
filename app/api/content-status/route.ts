import { NextResponse } from "next/server";
import { getCigaretteSnapshot } from "../../lib/cigaretteFeed";
import { getFleetContent } from "../../lib/fleetContent";
import { FLEET_STORE_CODE } from "../../lib/fleet/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Diagnostic only. Version, manifest ok/err, mode, and cigarette flags. No secrets and no env values. */
export async function GET() {
  const [fleet, cig] = await Promise.all([getFleetContent(), getCigaretteSnapshot()]);
  return NextResponse.json({
    storeCode: FLEET_STORE_CODE,
    version: fleet.version,
    contentVersion: fleet.contentVersion,
    manifest: fleet.manifest,
    mode: fleet.mode,
    cig: { web: cig.web.show, tv: cig.tv.show, guides: cig.guides.show },
  }, { headers: { "Cache-Control": "no-store" } });
}
