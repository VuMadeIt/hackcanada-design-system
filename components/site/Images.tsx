"use client";

/* eslint-disable @next/next/no-img-element */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { asset } from "@/lib/asset";
import { imageSlots, slotById } from "@/lib/images";

const DB = "hc-images";
const STORE = "overrides";

function openDb() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function tx<T>(mode: IDBTransactionMode, run: (s: IDBObjectStore) => IDBRequest<T>) {
  const db = await openDb();
  return new Promise<T>((resolve, reject) => {
    const req = run(db.transaction(STORE, mode).objectStore(STORE));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

type Ctx = {
  overrides: Record<string, string>;
  replace: (id: string, file: Blob) => Promise<void>;
  reset: (id: string) => Promise<void>;
  resetAll: () => Promise<void>;
};

const ImageContext = createContext<Ctx>({
  overrides: {},
  replace: async () => {},
  reset: async () => {},
  resetAll: async () => {},
});

const byPath = Object.fromEntries(imageSlots.map((s) => [asset(s.file), s.id]));

export function ImageProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = useState<Record<string, string>>({});

  useEffect(() => {
    let urls: string[] = [];
    (async () => {
      try {
        const [keys, blobs] = await Promise.all([
          tx<IDBValidKey[]>("readonly", (s) => s.getAllKeys()),
          tx<Blob[]>("readonly", (s) => s.getAll()),
        ]);
        const next: Record<string, string> = {};
        keys.forEach((k, i) => (next[String(k)] = URL.createObjectURL(blobs[i])));
        urls = Object.values(next);
        setOverrides(next);
      } catch {
        /* private mode or no IndexedDB: keep the defaults */
      }
    })();
    return () => urls.forEach((u) => URL.revokeObjectURL(u));
  }, []);

  const replace = useCallback(async (id: string, file: Blob) => {
    await tx("readwrite", (s) => s.put(file, id));
    setOverrides((o) => {
      if (o[id]) URL.revokeObjectURL(o[id]);
      return { ...o, [id]: URL.createObjectURL(file) };
    });
  }, []);

  const reset = useCallback(async (id: string) => {
    await tx("readwrite", (s) => s.delete(id));
    setOverrides((o) => {
      if (o[id]) URL.revokeObjectURL(o[id]);
      const { [id]: _, ...rest } = o;
      void _;
      return rest;
    });
  }, []);

  const resetAll = useCallback(async () => {
    await tx("readwrite", (s) => s.clear());
    setOverrides((o) => {
      Object.values(o).forEach((u) => URL.revokeObjectURL(u));
      return {};
    });
  }, []);

  const value = useMemo(() => ({ overrides, replace, reset, resetAll }), [overrides, replace, reset, resetAll]);
  return <ImageContext.Provider value={value}>{children}</ImageContext.Provider>;
}

export function useImages() {
  return useContext(ImageContext);
}

/** Resolve a slot id to its current source, with any local replacement applied. */
export function useImage(id: string) {
  const { overrides } = useContext(ImageContext);
  return overrides[id] ?? asset(slotById[id]?.file ?? id);
}

/** Pass any image path through here so a replaced file shows up in components too. */
export function useSrc(src?: string) {
  const { overrides } = useContext(ImageContext);
  if (!src) return src;
  const id = byPath[src];
  return (id && overrides[id]) || src;
}

export function Img({
  id,
  alt,
  ref,
  ...props
}: { id: string; alt?: string; ref?: React.Ref<HTMLImageElement> } & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src">) {
  const src = useImage(id);
  return <img ref={ref} src={src} alt={alt ?? slotById[id]?.alt ?? ""} {...props} />;
}
