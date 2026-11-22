import type { Metadata } from "next";
import { PageHeader, Section, P } from "@/components/site/Doc";
import { CodeBlock } from "@/components/site/CodeBlock";
import { ImageLibrary } from "@/components/docs/ImageLibrary";
import { imageSlots } from "@/lib/images";

export const metadata: Metadata = { title: "Images" };

export default function ImagesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Images"
        lead="Every picture on this site lives in one list. Swap a single image, or drop a whole folder to try a new set across every page at once."
        meta={[
          { label: "Slots", value: String(imageSlots.length) },
          { label: "Saved in", value: "This browser" },
          { label: "Source", value: "lib/images.ts" },
        ]}
      />
      <Section title="Library" intro="Replacements stay in this browser until you reset them. Nobody else sees them, and the files never leave your computer.">
        <ImageLibrary />
      </Section>
      <Section title="Make it permanent" intro="When a new set looks right, put it in the repo so everyone gets it.">
        <P>Easiest: save each new file over the old one in public/img, keeping the same name. Or point a slot at a new file:</P>
        <CodeBlock
          lang="ts"
          code={`// lib/images.ts
{ id: "shop.charger", file: "/img/shop/charger-2027.png", label: "Charger", ... }`}
        />
        <P className="pt-2">Product photos work best as 640 × 640 squares on white. Mascots should be transparent PNGs, at least 512 px on the long side.</P>
      </Section>
    </>
  );
}
