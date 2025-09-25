// src/components/rooms/RoomHeader.tsx
import { Star, MapPin } from "lucide-react";

// Define the type for the prop for clarity
type Hotel = {
  host: string;
  bedType: string;
  rating: number;
  reviews: number;
  address: string;
};

interface RoomHeaderProps {
  hotel: Hotel;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating)
            ? "text-orange-400 fill-orange-400"
            : "text-gray-300 dark:text-gray-600"
        }`}
      />
    ))}
  </div>
);

export const RoomHeader: React.FC<RoomHeaderProps> = ({ hotel }) => {
  return (
    <header>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <h1 className="text-4xl font-bold text-foreground">{hotel.host}</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium bg-muted text-muted-foreground px-3 py-1 rounded-full">
            {hotel.bedType}
          </span>
          <span className="text-sm font-bold bg-primary text-primary-foreground px-3 py-1 rounded-full">
            20% OFF
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2">
        <div className="flex items-center gap-2">
          <StarRating rating={hotel.rating} />
          <span className="font-semibold text-foreground">
            {hotel.reviews}+ reviews
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{hotel.address}</span>
        </div>
      </div>
    </header>
  );
};
