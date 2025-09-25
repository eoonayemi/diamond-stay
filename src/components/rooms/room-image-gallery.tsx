// src/components/rooms/RoomImageGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils"; // Assuming you have this utility from Shadcn

interface RoomImageGalleryProps {
  images: string[];
}

export const RoomImageGallery: React.FC<RoomImageGalleryProps> = ({
  images,
}) => {
  // We'll display the first 5 images as per the design.
  const displayImages = images.slice(0, 5);
  const [selectedImage, setSelectedImage] = useState(displayImages[0]);

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-[30rem]">
        {/* Main Image Display */}
        <div className="relative md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden">
          <Image
            src={`/images/${selectedImage}`}
            alt="Selected room view"
            fill
            className="object-cover transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, 66vw"
          />
        </div>

        {/* Thumbnail Images */}
        {displayImages.slice(1, 5).map((image, index) => (
          <div
            key={index}
            className={cn(
              "relative rounded-2xl overflow-hidden cursor-pointer ring-2 ring-offset-2 ring-offset-background transition-all duration-300",
              selectedImage === image
                ? "ring-orange-500" // The selected state border
                : "ring-transparent hover:ring-orange-500/50"
            )}
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={`/images/${image}`}
              alt={`Room view ${index + 2}`}
              fill
              className="object-cover"
              sizes="33vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
