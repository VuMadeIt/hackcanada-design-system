"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

// The stored choice is the source of truth, not <html data-theme>: Astryx's root Theme writes that
// attribute while hydrating with the server's "light", which would otherwise overwrite a saved "dark".
let current: Theme | null = null;
const listeners = new Set<() => void>();

function read(): Theme {
  if (current) return current;
  try {
    current = localStorage.getItem("hc-theme") === "dark" ? "dark" : "light";
  } catch {
    current = "light";
  }
  return current;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function setTheme(t: Theme) {
  current = t;
  document.documentElement.dataset.theme = t;
  try {
    localStorage.setItem("hc-theme", t);
  } catch {}
  listeners.forEach((l) => l());
}

export function useTheme() {
  const theme = useSyncExternalStore<Theme>(subscribe, read, () => "light");
  return { theme, setTheme, toggle: () => setTheme(theme === "dark" ? "light" : "dark") };
}
