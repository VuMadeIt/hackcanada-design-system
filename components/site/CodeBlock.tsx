import { codeToHtml } from "shiki";
import { CopyButton } from "./CopyButton";

export async function CodeBlock({ code, lang = "tsx", title }: { code: string; lang?: string; title?: string }) {
  const html = await codeToHtml(code.trim(), {
    lang,
    themes: { light: "github-light", dark: "github-dark-dimmed" },
    defaultColor: false,
  });
  return (
    <div className="mb-3 overflow-hidden rounded-md border border-border bg-surface">
      <div className="flex h-5 items-center border-b border-border bg-bg-muted pr-half pl-2">
        <span className="font-mono text-mono text-text-muted">{title ?? lang}</span>
        <CopyButton text={code.trim()} />
      </div>
      <div className="shiki-wrap overflow-x-auto p-2 font-mono text-[13px] leading-[24px]" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
