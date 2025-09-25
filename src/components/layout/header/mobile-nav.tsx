import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/constants";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  return (
    <nav
      className={`flex md:hidden flex-col items-center justify-center absolute inset-0 ${
        isOpen ? "translate-y-0" : "-translate-y-[100%]"
      } overflow-hidden h-screen bg-background gap-10 z-40 transistion-transform duration-300`}
    >
      {navLinks.map((link) => (
        <div className="group relative" key={link.name} onClick={onClose}>
          <Link href={link.href} className="text-lg">
            {link.name}
          </Link>
          <div className="bg-white absolute w-0 group-hover:w-full group-hover:h-0.5 rounded-full transition-all duration-300" />
        </div>
      ))}

      <div>
        <Button className="rounded-full w-24 h-10 text-lg">Login</Button>
      </div>

      <div className="absolute top-5 right-5" onClick={onClose}>
        <X size={30} />
      </div>
    </nav>
  );
};

export default MobileNav;
