"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { MobileSidebar } from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";
import { Database, Moon, Sun, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_ITEMS } from "@/lib/constants";

function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();

  React.useEffect(() => setMounted(true), []);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-9 w-9 rounded-lg border border-border/50 hover:border-border hover:bg-accent/10"
      aria-label="Cambiar tema"
    >
      {mounted ? (
        <>
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
        </>
      ) : (
        <Sun className="h-4 w-4" />
      )}
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
        "relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 rounded-md",
        isActive
          ? "text-foreground bg-primary/5"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden h-9 w-9 rounded-lg border border-border/50">
          <Menu className="h-[18px] w-[18px]" />
          <span className="sr-only">Abrir menú de navegación</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72 p-0">
        <SheetHeader className="border-b border-border/50 px-4 py-4">
          <SheetTitle className="flex items-center gap-2.5 text-base">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Database className="h-4 w-4" />
            </div>
            SQL Academy
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col p-3 space-y-0.5" aria-label="Navegación móvil">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center rounded-lg px-3 py-2 text-sm transition-all duration-200",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent/50"
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDocs = pathname.startsWith("/introduction") || pathname.startsWith("/installation") ||
    pathname.startsWith("/sql-") || pathname.startsWith("/postgresql") ||
    pathname.startsWith("/simulator") || pathname.startsWith("/exercises");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-sm"
          : "border-b border-transparent bg-background",
        isDocs && "lg:pl-64"
      )}
    >
      <div className="flex h-14 items-center gap-3 px-4 sm:px-6 max-w-7xl mx-auto">
        {isDocs && <MobileSidebar />}

        <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="SQL Academy - Inicio">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
            <Database className="h-[18px] w-[18px]" strokeWidth={2} />
          </div>
          <span className="hidden sm:inline font-semibold text-base tracking-tight">
            SQL Academy
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 ml-6 border-l border-border/50 pl-6" aria-label="Navegación principal">
          <NavLink href="/introduction">Documentación</NavLink>
          <NavLink href="/exercises">Ejercicios</NavLink>
          <NavLink href="/simulator">Simulador</NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
