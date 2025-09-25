// src/components/rooms/RoomInfo.tsx
import { AmenityBadge } from "@/components/shared";

type Hotel = {
  services: string[];
  price: number;
};

interface RoomInfoProps {
  hotel: Hotel;
}

const RoomInfo: React.FC<RoomInfoProps> = ({ hotel }) => {
  return (
    <div className="mt-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Left Side: Title and Amenities */}
        <div className="w-full">
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            Experience Luxury Like Never Before
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {hotel.services.slice(0, 3).map(
              (
                service // Displaying first 3 services for this design
              ) => (
                <AmenityBadge key={service} service={service} />
              )
            )}
          </div>
        </div>

        {/* Right Side: Price */}
        <div className="flex-shrink-0">
          <p className="text-3xl font-bold text-foreground">
            ${hotel.price}
            <span className="text-lg font-normal text-foreground">/night</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoomInfo;
