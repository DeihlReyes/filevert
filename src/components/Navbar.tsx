"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileIcon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/#features" },
  { name: "How it works", href: "/#how-it-works" },
  { name: "Benefits", href: "/#benefits" },
  { name: "FAQs", href: "/#faqs" },
  { name: "Testimonials", href: "/#testimonials" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <FileIcon className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">Filevert</span>
            </Link>
          </div>
          <div className="hidden lg:block">
            <div className="flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden space-x-5 lg:flex lg:items-center lg:justify-center">
            <Button asChild>
              <Link href="/convert">Try for Free</Link>
            </Button>
            <ModeToggle />
          </div>
          <div className="flex items-center lg:hidden">
            <Button asChild>
              <Link href="/convert">Try for Free</Link>
            </Button>
            <ModeToggle />
            <Button
              variant="outline"
              size="icon"
              className="ml-4"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block rounded-lg px-3 py-2 text-base font-medium",
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
