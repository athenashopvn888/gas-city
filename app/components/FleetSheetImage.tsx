"use client";

import { useState } from "react";
import Link from "next/link";
import { FLEET_CATEGORY_BANNER_STYLE, nextFleetImageSrc } from "../lib/fleet/imageFallback";
import type { ResolvedBanner } from "../lib/fleet/types";

/**
 * Sheet image, then that spot's coded image, then the category name.
 * Width, height, and aspect stay put. Each swap happens once.
 * Text banner uses the brand ground #170b03 and amber edge #f59e0b.
 */
export default function FleetSheetImage({
  banner,
  imageStyle,
  linkStyle,
  className,
}: {
  banner: ResolvedBanner;
  imageStyle?: React.CSSProperties;
  linkStyle?: React.CSSProperties;
  className?: string;
}) {
  const [src, setSrc] = useState(banner.image);
  const [imageFailed, setImageFailed] = useState(false);
  const showText = banner.render === "text" || imageFailed || !src;
  const width = banner.imageWidth;
  const height = banner.imageHeight;
  const aspect = width && height ? `${width} / ${height}` : undefined;
  const textStyle: React.CSSProperties = {
    ...FLEET_CATEGORY_BANNER_STYLE,
    aspectRatio: aspect,
    minHeight: aspect ? undefined : (height || 180),
  };
  const label = banner.categoryName || banner.title;

  return (
    <Link href={banner.href} aria-label={banner.alt} style={linkStyle}>
      {showText ? (
        <div data-fleet-text-banner="" role="img" aria-label={banner.alt} title={banner.title} style={textStyle}>{label}</div>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={banner.alt}
          title={banner.title}
          width={width}
          height={height}
          className={className}
          style={imageStyle}
          onError={() => {
            const next = nextFleetImageSrc(src, banner.codedImage);
            if (next) {
              setSrc(next);
              return;
            }
            setImageFailed(true);
          }}
        />
      )}
    </Link>
  );
}
