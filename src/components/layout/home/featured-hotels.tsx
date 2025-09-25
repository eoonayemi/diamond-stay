// src/components/layout/FeaturedHotels.tsx
import { hotels } from "@/lib/constants";
import { HotelCard } from "@/components/shared";
import { Button } from "@/components/ui/button";

const FeaturedHotels = () => {
  // We'll display a subset of hotels, e.g., the first 8
  const featured = hotels.slice(0, 8);

  // Randomly assign 'Best Seller' status for demonstration
  const bestSellerIndices = [0, 2, 5]; // Example indices

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="xl:px-48 lg:px-20 sm:px-10 px-5">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            Featured Destinations
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Discover our handpicked selection of exceptional properties around
            the world, offering unparalleled luxury and unforgettable
            experiences.
          </p>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8">
          {featured.map((hotel, index) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              isBestSeller={bestSellerIndices.includes(index)}
            />
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Button variant="outline" className="px-10">
            View All Hotels
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHotels;
