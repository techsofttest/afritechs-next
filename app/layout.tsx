import type { Metadata } from "next";
import "./globals.css";
import GlobalRequestBag from "@/components/cart/GlobalRequestBag";

export const metadata: Metadata = {
  title: "AFRI TECHS SARLU | Solutions Multisectorielles",
  description: "Machinisme, Énergie, IT, et Solutions Industrielles pour l'Afrique.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      {/* Forcing font-normal globally to ensure no bold text is rendered */}
      <body className="min-h-full flex flex-col font-serif font-normal text-foreground">
        {children}
        <GlobalRequestBag />
      </body>
    </html>
  );
}