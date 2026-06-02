"use client";

import * as React from "react";
import { Sidebar } from "@/components/layout/sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <main className="flex-1 px-6 py-8 sm:px-8 lg:px-10 xl:px-14 max-w-4xl mx-auto lg:mx-0 lg:max-w-none">
        {children}
      </main>
    </div>
  );
}
