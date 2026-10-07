import type { CSSProperties } from "react";

export type TvTheme = {
  headerImage: string;
  backgroundImage: string;
  cornerLeft?: string;
  cornerRight?: string;
  primary: string;
  accent: string;
  glow: string;
  cardBorder: string;
  headerText: string;
  sloganLeft: string;
  sloganRight: string;
  footerLeft: string;
  footerRight: string;
};

export const TV_THEMES: Readonly<Record<string, TvTheme>> = {
  GCC01: {
    headerImage: "/tv-theme/gcc01/header.webp",
    backgroundImage: "/tv-theme/gcc01/background.webp",
    cornerLeft: "/tv-theme/gcc01/corner-left.png",
    cornerRight: "/tv-theme/gcc01/corner-right.png",
    primary: "#080C08",
    accent: "#69F000",
    glow: "rgba(105,240,0,.44)",
    cardBorder: "rgba(195,255,150,.92)",
    headerText: "#FFFFFF",
    sloganLeft: "FUEL THE VIBE",
    sloganRight: "PREMIUM CITY SELECTION",
    footerLeft: "GAS CITY CANNABIS",
    footerRight: "HIGH ENERGY · HIGH STANDARDS",
  },
};

export function getTvTheme(storeCode?: string | null): TvTheme | undefined {
  return storeCode ? TV_THEMES[storeCode] : undefined;
}

type TvThemeVariables = CSSProperties & {
  "--tv-theme-header-image": string;
  "--tv-theme-background-image": string;
  "--tv-theme-primary": string;
  "--tv-theme-accent": string;
  "--tv-theme-glow": string;
  "--tv-theme-card-border": string;
  "--tv-theme-header-text": string;
};

export function getTvThemeVariables(theme: TvTheme): TvThemeVariables {
  return {
    "--tv-theme-header-image": `url("${theme.headerImage}")`,
    "--tv-theme-background-image": `url("${theme.backgroundImage}")`,
    "--tv-theme-primary": theme.primary,
    "--tv-theme-accent": theme.accent,
    "--tv-theme-glow": theme.glow,
    "--tv-theme-card-border": theme.cardBorder,
    "--tv-theme-header-text": theme.headerText,
  };
}