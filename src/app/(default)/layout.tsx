// app/layout.tsx

import type { Metadata } from "next";

import DropDownMenu from "./_Components/DropDownMenu";
import Header from "../_Components/Header";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="flex">
          <DropDownMenu />
          {children}
        </div>
      </body>
    </html>
  );
}
