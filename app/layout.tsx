import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import Header from "@/components/Header";
import { EditableProvider } from "@/lib/hooks/useEditable";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <EditableProvider defaultEditable={true}>
          <Header />
          {children}
        </EditableProvider>
      </body>
    </html>
  );
}
