// src/components/rooms/HostInfo.tsx
import Image from "next/image";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Reusable StarRating component (can be moved to a shared file if used often)
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

type Hotel = {
  host: string;
  rating: number;
  reviews: number;
};

interface HostInfoProps {
  hotel: Hotel;
}

const HostInfo: React.FC<HostInfoProps> = ({ hotel }) => {
  return (
    <>
      <Separator className="my-8" />
      <div className="flex flex-col sm:flex-row items-start gap-6">
        {/* Host Avatar */}
        <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src="/images/host.jpg" // Generic host image as seen in the design
            alt={`Avatar for ${hotel.host}`}
            fill
            className="object-cover"
          />
        </div>

        {/* Host Details */}
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-semibold text-foreground">
            Hosted by {hotel.host}
          </h3>
          <div className="flex items-center gap-2">
            <StarRating rating={hotel.rating} />
            <span className="text-muted-foreground font-medium">
              {hotel.reviews}+ reviews
            </span>
          </div>
          <Button className="mt-2 w-fit">Contact Now</Button>
        </div>
      </div>
    </>
  );
};

export default HostInfo;
