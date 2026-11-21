export type ComponentDoc = {
  slug: string;
  name: string;
  category: "Actions" | "Inputs" | "Display" | "Feedback" | "Navigation" | "Overlays" | "Hack Canada";
  summary: string;
  figma?: string;
  whenToUse: string[];
  whenNot: string[];
  anatomy: string[];
  specs: [string, string, string][];
  a11y: string[];
  content: string[];
  props: [string, string, string, string][];
  code: string;
  related: string[];
  doText: string;
  dontText: string;
};
