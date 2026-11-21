import type { Metadata } from "next";
import { PageHeader, Section, Table, List } from "@/components/site/Doc";
import { FormDemo } from "@/components/docs/PatternDemos";

export const metadata: Metadata = { title: "Forms" };

export default function Forms() {
  return (
    <article>
      <PageHeader eyebrow="Patterns" title="Forms" lead="Applications, teams and profiles are all forms. Most people fill them in once, so they need to be right the first time." />
      <Section title="Try it" intro="Submit it empty to see the error pattern.">
        <FormDemo />
      </Section>
      <Section title="Layout">
        <Table
          head={["Rule", "Value"]}
          mono={[1]}
          rows={[
            ["One column", "max 640 wide"],
            ["Label to input", "8"],
            ["Input to helper text", "4"],
            ["Field to field", "24"],
            ["Group to group", "48, with a heading"],
            ["Input height", "48 (40 in dense tables)"],
            ["Actions", "Right aligned, primary last"],
          ]}
        />
      </Section>
      <Section title="Validation">
        <List
          items={[
            "Check when someone leaves a field, not while they're typing.",
            "On submit, show a summary at the top and move focus to it, then mark each field.",
            "Error text says how to fix it, sits under the field, and is linked with aria-describedby.",
            "Mark the few optional fields, not the many required ones.",
            "Never clear what someone typed because of an error.",
          ]}
        />
      </Section>
    </article>
  );
}
