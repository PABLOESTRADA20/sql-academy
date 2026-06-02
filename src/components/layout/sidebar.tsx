"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_ITEMS } from "@/lib/constants";
import { ChevronDown, Database, BookOpenText, Menu } from "lucide-react";

function NavItem({
  item,
  onNavigate,
}: {
  item: (typeof NAV_ITEMS)[number];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(
    pathname.startsWith(item.href) && !!item.items
  );
  const hasActiveChild = item.items?.some(
    (sub) => pathname === sub.href || pathname.startsWith(sub.href + "/")
  );
  const isActive = pathname === item.href;

  if (item.items) {
    return (
      <div>
        <button
          onClick={() => setOpen(!open)}
          className={cn(
            "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 focus-ring",
            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            (isActive || hasActiveChild) && "bg-sidebar-accent text-sidebar-accent-foreground"
          )}
          aria-expanded={open}
          aria-controls={`submenu-${item.href.replace(/\//g, "-")}`}
        >
          <span>{item.title}</span>
          <ChevronDown
            className={cn(
              "ml-auto h-3.5 w-3.5 text-muted-foreground transition-all duration-200",
              open && "rotate-180"
            )}
          />
        </button>
        <div
          id={`submenu-${item.href.replace(/\//g, "-")}`}
          role="region"
          className={cn(
            "ml-3 mt-1 space-y-0.5 border-l border-border/50 pl-3 overflow-hidden transition-all duration-200",
            open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          )}
        >
          {item.items.map((subItem) => {
            const isSubActive = pathname === subItem.href;
            return (
              <Link
                key={subItem.href}
                href={subItem.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center rounded-md px-3 py-1.5 text-sm transition-all duration-200 focus-ring",
                  isSubActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:text-foreground hover:bg-sidebar-accent/50"
                )}
                aria-current={isSubActive ? "page" : undefined}
              >
                {subItem.title}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200 focus-ring",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
          : "text-sidebar-foreground"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {item.title}
    </Link>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 border-r border-border/50 bg-sidebar-background lg:sticky lg:block">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border/50">
        <BookOpenText className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Contenido
        </span>
      </div>
      <ScrollArea className="h-[calc(100vh-7.5rem)]">
        <nav className="space-y-0.5 px-3 py-3" aria-label="Navegación de documentación">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.href} item={item} />
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}

export function MobileSidebar() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9 rounded-lg border border-border/50">
          <Menu className="h-[18px] w-[18px]" />
          <span className="sr-only">Abrir menú lateral</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0 border-r border-border/50">
        <SheetHeader className="border-b border-border/50 px-4 py-4">
          <SheetTitle className="flex items-center gap-2.5 text-base">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Database className="h-4 w-4" />
            </div>
            SQL Academy
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <nav className="space-y-0.5 p-3" aria-label="Navegación de documentación">
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.href} item={item} onNavigate={() => setOpen(false)} />
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
