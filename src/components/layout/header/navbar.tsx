import { navLinks } from "@/lib/constants";
import React from "react";
import { NavLink } from "./nav-link";

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  return (
    <nav className="flex sm:gap-10 md:gap-5 max-md:hidden">
      {navLinks.map((link) => (
        <NavLink key={link.name} href={link.href} isScrolled={isScrolled}>
          {link.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
