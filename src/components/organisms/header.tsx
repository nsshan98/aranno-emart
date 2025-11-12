"use client";
import React, { useState, useEffect } from "react";
import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "../atoms/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../atoms/sheet";
import { ThemeToggle } from "./theme-toggle";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const Header = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Readme", href: "/readme" },
    { label: "Solutions", href: "#solutions" },
    { label: "Pricing", href: "#pricing" },
    { label: "Resources", href: "#resources" },
    { label: "About", href: "#about" },
  ];

  return (
    <header
      className={`shadow-sm sticky top-0  z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <span className="text-primary-foreground font-bold text-lg">
                  A
                </span>
              </div>
              <span className="text-xl font-semibold text-foreground">
                Aranno E-mart
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-accent/50 rounded-md transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              size="sm"
              onClick={() => router.push("/auth/login")}
              className="cursor-pointer"
            >
              Sign In
            </Button>
            <Button
              className="bg-[#E97B2F] hover:bg-[#D66A20] text-white"
              size={"lg"}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Cart (0)
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-lg">
                          A
                        </span>
                      </div>
                      <span className="text-xl font-semibold">
                        Aranno E-mart
                      </span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-1 mt-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 text-base font-medium text-foreground hover:bg-accent/50 rounded-md transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  ))}
                  <div className="pt-4 space-y-2 border-t border-border mt-4">
                    <Button
                      className="w-full"
                      onClick={() => router.push("/auth/login")}
                    >
                      Sign In
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
