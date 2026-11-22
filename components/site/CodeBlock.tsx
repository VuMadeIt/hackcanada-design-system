import { codeToHtml } from "shiki";
import { CopyButton } from "./CopyButton";

export async function CodeBlock({ code, lang = "tsx", title }: { code: string; lang?: string; title?: string }) {
  const html = await codeToHtml(code.trim(), {
    lang,
    themes: { light: "github-light-high-contrast", dark: "github-dark-dimmed" },
    defaultColor: false,
  });
  return (
    <div className="mb-3 overflow-hidden rounded-md hairline bg-bg-muted">
      <div className="flex h-5 items-center border-b border-border pr-half pl-2">
        <span className="text-caption font-medium text-text-muted">{title ?? lang}</span>
        <CopyButton text={code.trim()} />
      </div>
      <div className="shiki-wrap overflow-x-auto p-2 font-mono text-[13px] leading-[24px]" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
