import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { StoreProvider } from "@/store/StoreProvider";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap", // Optional, adds font-display: swap;
});

export const metadata: Metadata = {
  title: "Ecommerce Website",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body className={poppins.className + "flex flex-col min-h-screen"}>
          <main className="grid grid-rows-[auto_max] gap-4">{children}</main>
        </body>
      </StoreProvider>
    </html>
  );
}
