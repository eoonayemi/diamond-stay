// src/components/layout/Footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const [email, setEmail] = useState("");
  const pathname = usePathname();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribing with email:", email);
    alert("Thank you for subscribing!");
    setEmail("");
  };

  const companyLinks = [
    { name: "About", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Blog", href: "/blog" },
    { name: "Partners", href: "/partners" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Safety Information", href: "/safety" },
    { name: "Cancellation Options", href: "/cancellation" },
    { name: "Contact Us", href: "/contact" },
    { name: "Accessibility", href: "/accessibility" },
  ];

  return (
    <footer
      className={`${
        pathname === "/" ? "bg-background" : "bg-zinc-50 dark:bg-zinc-900"
      } text-secondary-foreground pt-16 lg:pt-24`}
    >
      <div className="xl:px-48 lg:px-20 sm:px-10 px-5">
        {/* Top Section: Branding, Nav, and Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Branding and Socials */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-7 h-7">
                <Image
                  src="/images/logo-purple.png"
                  alt="DiamondStay Logo"
                  fill
                />
              </div>
              <span className="text-2xl font-semibold text-primary">
                DiamondStay
              </span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Discover the world&apos;s most extraordinary places to stay, from
              boutique hotels to luxury villas and private islands.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" aria-label="Instagram">
                <Instagram className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Facebook">
                <Facebook className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          {/* Company & Support Links */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2 lg:col-span-2">
            <div>
              <h3 className="font-semibold text-foreground mb-4 tracking-wider">
                COMPANY
              </h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4 tracking-wider">
                SUPPORT
              </h3>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 tracking-wider">
              STAY UPDATED
            </h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for travel inspiration and special
              offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-r-none border-r-0 focus-visible:ring-offset-0 focus-visible:ring-0"
              />
              <Button
                type="submit"
                size="icon"
                className="rounded-l-none"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section: Copyright and Legal Links */}
        <div className="mt-16 border-t border-border pt-8 pb-8 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DiamondStay. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/sitemap"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
