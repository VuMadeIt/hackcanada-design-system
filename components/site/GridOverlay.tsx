"use client";

export function GridOverlay() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] lg:pl-32">
      <div className="mx-auto grid h-full max-w-page grid-cols-4 gap-2 px-2 md:grid-cols-8 md:gap-3 md:px-4 xl:grid-cols-12 xl:px-5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`h-full bg-spec-soft ${i >= 4 ? "hidden md:block" : ""} ${i >= 8 ? "md:hidden xl:block" : ""}`}
          />
        ))}
      </div>
      <p className="fixed right-2 bottom-2 rounded-sm bg-spec px-1 py-half font-mono text-mono text-white">
        <span className="md:hidden">4 col · 16 gutter · 16 margin</span>
        <span className="hidden md:inline xl:hidden">8 col · 24 gutter · 32 margin</span>
        <span className="hidden xl:inline">12 col · 24 gutter · 40 margin</span>
        {" "}· press G to hide
      </p>
    </div>
  );
}
