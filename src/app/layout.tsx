"use client";

import "./globals.css";
import { QueryProvider } from "../context/query-context";

export const metadata = {
  title: "Tasks App",
  description: "A simple tasks application built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <QueryProvider>
          <main className="container mx-auto p-4">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
