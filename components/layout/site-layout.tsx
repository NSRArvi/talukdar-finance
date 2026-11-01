"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // If inside the /admin panel, do not render public Header and Footer
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-white overflow-x-clip">
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}

