// src/components/layout/Header.tsx
"use client";

import { useState } from "react";
import { usePathname } from "next/navigation"; // 1. Import usePathname
import Navbar from "./navbar";
import Image from "next/image";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollPosition } from "@/hooks";
import MobileNav from "./mobile-nav";
import ModeToggle from "@/components/shared/mode-toggle";

const Header = () => {
  const scrollY = useScrollPosition();
  const pathname = usePathname(); // 2. Get the current pathname

  // 3. Determine the header's state based on page and scroll position
  const isHomePage = pathname === "/";
  const isScrolled = scrollY > 2;
  const isTransparent = isHomePage && !isScrolled;

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 py-4 xl:px-48 lg:px-20 sm:px-10 px-5 flex justify-between items-center h-[80px] ${
        !isTransparent && // Apply solid background and shadow if NOT transparent
        "bg-clip-padding backdrop-filter backdrop-blur-sm bg-background/80 h-[85px] shadow-md"
      } transition-all duration-300`}
    >
      <div className="flex items-center gap-2">
        <div className="aspect-square w-[1.7rem]">
          <Image
            src={"/images/logo-purple.png"}
            alt="Logo"
            className="h-full w-full hidden dark:block"
            width={100}
            height={100}
          />
          <Image
            // Use isTransparent to decide which logo to show on light mode
            src={
              isTransparent
                ? "/images/logo-purple.png"
                : "/images/logo-purple.png"
            }
            alt="Logo"
            className="h-full w-full dark:hidden"
            width={100}
            height={100}
          />
        </div>
        <div
          // Use isTransparent to control text color
          className={`text-[1.5rem] font-semibold tracking-wide ${
            isTransparent ? "text-white" : "text-primary"
          }`}
        >
          DiamondStay
        </div>
      </div>

      {/* Pass the correct state down to the Navbar */}
      <Navbar isScrolled={!isTransparent} />

      <div className="md:flex items-center gap-4 hidden">
        <div>
          <Search
            // Use isTransparent to control icon color
            className={`font-bold text-xl ${
              isTransparent ? "text-white" : "text-foreground"
            }`}
          />
        </div>
        <div>
          <Button
            className={`rounded-full w-24 h-10 text-lg ${
              isTransparent
                ? "bg-primary text-white"
                : "bg-primary text-primary-foreground" // Now uses brand color
            }`}
          >
            Login
          </Button>
        </div>
        {/* Pass the correct state down to the ModeToggle */}
        <ModeToggle variant={isTransparent ? "ghost" : "default"} />
      </div>

      <div className="flex items-center gap-4 md:hidden">
        <ModeToggle variant={isTransparent ? "ghost" : "default"} />
        <div onClick={() => setIsMobileNavOpen(true)}>
          <Menu
            size={30}
            // Use isTransparent to control icon color
            className={`font-bold text-xl ${
              isTransparent ? "text-white" : "text-foreground"
            }`}
          />
        </div>
      </div>

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </header>
  );
};

export default Header;
