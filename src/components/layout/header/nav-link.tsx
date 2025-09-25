// src/components/layout/NavLink.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  isScrolled: boolean;
  children: React.ReactNode;
}

export const NavLink: React.FC<NavLinkProps> = ({
  href,
  isScrolled,
  children,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const linkColor = isScrolled
    ? isActive
      ? "text-primary"
      : "text-foreground"
    : "text-white";
  const pointerColor = isScrolled ? "bg-primary" : "bg-white";

  return (
    <div className="group relative">
      <Link
        href={href}
        className={`hover:opacity-80 transition-all duration-300 ${linkColor}`}
      >
        {children}
      </Link>
      <div
        className={`absolute w-full h-0.5 rounded-full transition-all duration-300 ${pointerColor} ${
          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      />
    </div>
  );
};
