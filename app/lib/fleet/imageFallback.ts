/**
 * After a sheet banner image errors, the only allowed replacement is that
 * slot's coded image. Anything else (no coded image, or the coded image is
 * the one that just failed) becomes the category-name banner. Never a third graphic.
 * Each step runs once: a second error on the coded image does not swap again.
 */
export function nextFleetImageSrc(failedSrc: string, codedImage: string | undefined): string | null {
  const coded = codedImage?.trim() ?? "";
  if (!coded || coded === failedSrc) return null;
  return coded;
}

/** Gas City brand block: dark ground, amber edge, white type. No background image. */
export const FLEET_CATEGORY_BANNER_STYLE = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "24px",
  background: "#170b03",
  color: "#ffffff",
  fontWeight: 800,
  fontSize: "clamp(28px, 4vw, 48px)",
  lineHeight: 1.15,
  textAlign: "center" as const,
  boxShadow: "inset 0 0 0 3px #f59e0b",
};
