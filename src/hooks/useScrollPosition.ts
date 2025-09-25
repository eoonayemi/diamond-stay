// hooks/useScrollPosition.js

"use client"; // This is a client component

import { useState, useEffect } from "react";

// This is the core of the hook
const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // A variable to store the timeout ID
    let ticking = false;

    const handleScroll = () => {
      // Use requestAnimationFrame for smooth, efficient updates
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return scrollY;
};

export default useScrollPosition;
