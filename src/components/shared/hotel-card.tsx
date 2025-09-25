// src/components/shared/HotelCard.tsx
"use client"; // 1. Component now needs state for the carousel

import { useState } from "react"; // 2. Import useState for managing the current image
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

type Hotel = {
  id: number;
  host: string;
  city: string;
  address: string;
  images: string[];
  rating: number;
  price: number;
};

interface HotelCardProps {
  hotel: Hotel;
  isBestSeller?: boolean;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, isBestSeller }) => {
  // 3. State to track the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 4. Click handlers for carousel buttons
  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents the Link from navigating
    e.stopPropagation(); // Stops the event from bubbling up
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % hotel.images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + hotel.images.length) % hotel.images.length
    );
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add favorite logic here
    console.log("Favorited:", hotel.id);
  };

  return (
    <Link href={`/rooms/${hotel.id}`} className="block group">
      {" "}
      {/* Moved group here */}
      <div className="w-full rounded-xl border border-border/60 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 bg-card">
        {/* Image Section */}
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={`/images/${hotel.images[currentImageIndex]}`} // 5. Use state for dynamic image source
            alt={hotel.host}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* 6. Carousel Controls - Visible on Hover */}
          <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={handlePrevImage}
              size="icon"
              className="bg-white/80 hover:bg-white text-black rounded-full h-8 w-8"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleNextImage}
              size="icon"
              className="bg-white/80 hover:bg-white text-black rounded-full h-8 w-8"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* 7. Wishlist Heart Icon */}
          <Button
            onClick={handleFavoriteClick}
            size="icon"
            variant="ghost"
            className="absolute top-3 right-3 text-white rounded-full bg-black/30 hover:bg-black/50 hover:text-white"
          >
            <Heart className="h-5 w-5" />
          </Button>

          {/* 8. Pagination Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {hotel.images.slice(0, 5).map(
              (
                _,
                index // Show dots for first 5 images
              ) => (
                <div
                  key={index}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    currentImageIndex === index ? "bg-white" : "bg-white/60"
                  }`}
                />
              )
            )}
          </div>

          {isBestSeller && (
            <div className="absolute top-3 left-3 bg-background/80 text-foreground text-xs font-semibold px-3 py-1 rounded-full shadow-md backdrop-blur-sm">
              Best Seller
            </div>
          )}
        </div>

        {/* Content Section (Your original design, untouched) */}
        <div className="p-4 space-y-3">
          <div className="flex justify-between items-center gap-5">
            <h3 className="font-semibold text-lg truncate text-foreground">
              {hotel.host}
            </h3>
            <div className="flex items-center gap-1 flex-shrink-0">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium text-sm text-foreground/90">
                {hotel.rating}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <p className="text-sm truncate">{hotel.city}</p>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div>
              <span className="text-xl font-bold text-foreground">
                ${hotel.price}
              </span>
              <span className="text-sm text-muted-foreground">/night</span>
            </div>
            <Button
              size="sm"
              className="font-semibold bg-primary text-primary-foreground"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
