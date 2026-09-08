import { palettes } from "@/lib/landing-content";

export function getPalette(paletteId: string) {
  return (
    palettes.find((p) => p.id === paletteId) ??
    palettes.find((p) => p.id === "signal")!
  );
}
