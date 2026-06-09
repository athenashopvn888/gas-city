import type { Metadata } from "next";
import GamesContent from "./GamesContent";

export const metadata: Metadata = {
  title: "Cannabis Arcade Games — GAS CITY CANNABIS | GTA",
  description: "Play free online cannabis-themed games like Flappy Bud and Snake Munchies while you wait at GAS CITY CANNABIS.",
  alternates: {
    canonical: "https://gascitycannabis.com/games",
  },
};

export default function GamesPage() {
  return <GamesContent />;
}
