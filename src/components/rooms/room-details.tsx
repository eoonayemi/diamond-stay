// src/components/rooms/RoomDetails.tsx
import React from "react";
import { Separator } from "@/components/ui/separator";

// 1. Import solid icons from Font Awesome via react-icons
import { FaHouse, FaHeart } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { PiSealCheckFill } from "react-icons/pi";

// Define the Highlight type for clarity
type Highlight = {
  icon: string;
  title: string;
  description: string;
};

// Define the Hotel type to include description and highlights
type Hotel = {
  description: string;
  highlights: Highlight[];
};

interface RoomDetailsProps {
  hotel: Hotel;
}

// 2. Update the iconMap to use the react-icons components
const iconMap: { [key: string]: React.ComponentType<any> } = {
  Home: FaHouse,
  CheckCircle: PiSealCheckFill,
  MapPin: FaMapMarkerAlt,
  Heart: FaHeart,
};

const RoomDetails: React.FC<RoomDetailsProps> = ({ hotel }) => {
  return (
    <div className="mt-8">
      {/* Highlights Section */}
      <div className="space-y-6">
        {hotel.highlights.map((highlight, index) => {
          const IconComponent =
            iconMap[highlight.icon] ||
            (() => <span className="text-destructive">?</span>);

          return (
            <div key={index} className="flex items-start gap-4">
              {/* 3. The icon component works directly, no fill prop needed */}
              <IconComponent className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {highlight.title}
                </h3>
                <p className="text-muted-foreground">{highlight.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <Separator className="my-20" />

      {/* Description Section */}
      <div>
        <h3 className="sr-only">Room Description</h3>
        <p className="text-muted-foreground leading-relaxed">
          {hotel.description}
        </p>
      </div>
    </div>
  );
};

export default RoomDetails;
