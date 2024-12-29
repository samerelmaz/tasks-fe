"use client";

import "./globals.css";
import { QueryProvider } from "../context/query-context";
import { ToastContainer } from "react-toastify";

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
          <ToastContainer />
        </QueryProvider>
      </body>
    </html>
  );
}
