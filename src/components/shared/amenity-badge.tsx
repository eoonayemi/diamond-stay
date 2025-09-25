// src/components/shared/AmenityBadge.tsx
import {
  LucideProps,
  BedDouble,
  MountainSnow,
  Wifi,
  Wind,
  UtensilsCrossed,
  ParkingCircle,
  Soup,
  Dumbbell,
  Waves,
  Dog,
  Sprout,
  Users,
} from "lucide-react";
import React from "react";

// Map service names to Lucide icons
const iconMap: { [key: string]: React.ComponentType<LucideProps> } = {
  "Room Service": BedDouble,
  "Mountain View": MountainSnow,
  "Pool Access": Waves,
  "Free Wifi": Wifi,
  "Air Conditioning": Wind,
  "Free Breakfast": Soup,
  Gym: Dumbbell,
  Pool: Waves,
  "Pet Friendly": Dog,
  Spa: Sprout,
  "On-site Restaurant": UtensilsCrossed,
  "Valet Parking": ParkingCircle,
  // Add other mappings as needed
};

interface AmenityBadgeProps {
  service: string;
}

const AmenityBadge: React.FC<AmenityBadgeProps> = ({ service }) => {
  const IconComponent = iconMap[service] || Users; // Default icon

  return (
    <div className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm text-foreground">
      <IconComponent className="h-4 w-4" />
      <span>{service}</span>
    </div>
  );
};

export default AmenityBadge;
