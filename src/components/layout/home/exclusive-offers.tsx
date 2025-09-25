// src/components/layout/ExclusiveOffers.tsx
import { exclusiveOffers } from "@/lib/constants";
import { ExclusiveOfferCard } from "@/components/shared";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ExclusiveOffers = () => {
  return (
    <section className="py-16 lg:py-24 bg-zinc-50 dark:bg-zinc-900">
      <div className="xl:px-48 lg:px-20 sm:px-10 px-5">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
              Exclusive Offers
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Take advantage of our limited-time offers and special packages to
              enhance your stay and create unforgettable memories.
            </p>
          </div>
          <Link
            href="/offers"
            className="group mt-4 md:mt-0 flex-shrink-0 flex items-center gap-2 font-semibold text-foreground hover:text-primary transition-colors"
          >
            View All Offers
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {exclusiveOffers.map((offer) => (
            <ExclusiveOfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExclusiveOffers;
