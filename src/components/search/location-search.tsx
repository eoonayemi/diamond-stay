// src/components/search/LocationSearch.tsx
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

// In a real app, this data would come from a geocoding API like Google Places or Mapbox.
const suggestedLocations = [
  "Lekki, Nigeria",
  "Ikeja, Nigeria",
  "London, United Kingdom",
  "Toronto, Canada",
  "Accra, Ghana",
];

interface LocationSearchProps {
  styles?: string;
  value: string;
  onValueChange: (value: string) => void;
  onLocationSelect?: () => void;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({
  styles = "",
  value,
  onValueChange,
  onLocationSelect = () => {},
}) => {
  const filteredLocations = suggestedLocations.filter((loc) =>
    loc.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className={`grid gap-4 ${styles}`}>
      <Input
        id="destination"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder="Search destinations"
        className="h-12"
      />
      <ul className="space-y-5">
        {filteredLocations.map((location) => (
          <li key={location}>
            <button
              onClick={() => {
                onValueChange(location);
                onLocationSelect();
              }}
              className="flex w-full items-center md:p-3 gap-4 rounded-lg hover:bg-muted"
            >
              <div className="p-3 bg-muted rounded-md">
                <MapPin className="h-5 w-5" />
              </div>
              <span>{location}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
