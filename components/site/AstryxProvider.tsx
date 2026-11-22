"use client";

import Link from "next/link";
import { Theme } from "@astryxdesign/core/theme";
import { LinkProvider } from "@astryxdesign/core/Link";
import { themes, defaultThemeSlug } from "@/src/astryx-themes";
import { useTheme } from "./theme";

export function AstryxProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  return (
    <Theme theme={themes[defaultThemeSlug]} mode={theme}>
      <LinkProvider component={Link}>{children}</LinkProvider>
    </Theme>
  );
}
