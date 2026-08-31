"use client";

import { useState, useRef } from "react";
import styles from "./magnifier.module.css";

interface MagnifierProps {
  src: string;
  alt: string;
  className?: string;
}

export default function Magnifier({ src, alt, className }: MagnifierProps) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, width: 400, height: 400 });
  const imgRef = useRef<HTMLImageElement>(null);

  const LENS_SIZE = 160; // diameter of the lens
  const ZOOM = 2.5;      // zoom factor

  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const fallbackSrc = src && (src.includes("r2.dev") || src.includes("images.torontodispensaryhub.com"))
    ? `https://athena-cannabis-images.vercel.app/products/${src.split("/").pop()}`
    : src;
  const currentSrc = failedSrc === src ? fallbackSrc : src;

  const handleImageError = () => {
    if (fallbackSrc !== src) setFailedSrc(src);
  };

  function handleMouseMove(e: React.MouseEvent) {
    if (!imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setPos({ x, y, width: rect.width, height: rect.height });
  }

  function handleMouseEnter() {
    setShow(true);
  }

  function handleMouseLeave() {
    setShow(false);
  }

  // Background position for the zoomed lens
  const bgX = pos.x * ZOOM - LENS_SIZE / 2;
  const bgY = pos.y * ZOOM - LENS_SIZE / 2;

  return (
    <div
      className={styles.magnifierWrap}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={imgRef}
        src={currentSrc}
        onError={handleImageError}
        alt={alt}
        className={className}
      />

      {/* Lens overlay */}
      {show && (
        <div
          className={styles.lens}
          style={{
            width: LENS_SIZE,
            height: LENS_SIZE,
            left: pos.x - LENS_SIZE / 2,
            top: pos.y - LENS_SIZE / 2,
            backgroundImage: `url(${currentSrc})`,
            backgroundSize: `${pos.width * ZOOM}px ${pos.height * ZOOM}px`,
            backgroundPosition: `-${bgX}px -${bgY}px`,
          }}
        />
      )}

      {/* Hint icon (hidden on hover) */}
      <span className={`${styles.hint} ${show ? styles.hintHidden : ""}`}>
        🔍
      </span>
    </div>
  );
}
