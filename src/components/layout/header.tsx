"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";
import { Database, Moon, Sun, Globe, MessageCircle } from "lucide-react";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-9 w-9 rounded-lg border border-border/50 hover:border-border hover:bg-accent/10"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      className={cn(
        "relative px-3 py-1.5 text-sm font-medium transition-colors duration-200",
        isActive
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
      {isActive && (
        <span className="absolute inset-x-3 -bottom-px h-0.5 bg-primary rounded-full" />
      )}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const isDocs = pathname.startsWith("/introduction") || pathname.startsWith("/installation") ||
    pathname.startsWith("/sql-") || pathname.startsWith("/postgresql") ||
    pathname.startsWith("/simulator") || pathname.startsWith("/exercises");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60",
        isDocs && "lg:pl-64"
      )}
    >
      <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
        {isDocs && <MobileSidebar />}

        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
            <Database className="h-[18px] w-[18px]" strokeWidth={2} />
          </div>
          <span className="hidden sm:inline font-semibold text-base tracking-tight">
            SQL Academy
          </span>
        </Link>

        {!isDocs && (
          <nav className="hidden md:flex items-center gap-1 ml-6 border-l border-border/50 pl-6">
            <NavLink href="/introduction">Documentación</NavLink>
            <NavLink href="/exercises">Ejercicios</NavLink>
            <NavLink href="/simulator">Simulador</NavLink>
          </nav>
        )}

        <div className="ml-auto flex items-center gap-1.5">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
          >
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg border border-border/50 hover:border-border">
              <Globe className="h-4 w-4" />
            </Button>
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
          >
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg border border-border/50 hover:border-border">
              <MessageCircle className="h-4 w-4" />
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
