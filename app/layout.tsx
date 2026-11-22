import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Shell } from "@/components/site/Shell";
import { AstryxProvider } from "@/components/site/AstryxProvider";
import "./layers.css";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hack Canada Design System",
    template: "%s · Hack Canada Design System",
  },
  description:
    "Foundations, rules, components and micro-interactions behind the Hack Canada hacker dashboard.",
};

const themeScript = `(function(){try{var t=localStorage.getItem('hc-theme');document.documentElement.dataset.theme=t==='dark'?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" className={jetbrains.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">
        <AstryxProvider>
          <Shell>{children}</Shell>
        </AstryxProvider>
      </body>
    </html>
  );
}
