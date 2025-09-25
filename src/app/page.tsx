"use client";

import { HotelSearchForm } from "@/components/form";
import {
  ExclusiveOffers,
  FeaturedHotels,
  NewsletterSection,
  Testimonials,
} from "@/components/layout";
import { useScrollPosition } from "@/hooks";

export default function Home() {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 2;

  return (
    <main className="flex flex-col justify-center">
      <section className="relative bg-[url('/images/hero-image1.webp')] bg-cover h-[1000px] md:h-screen bg-center w-full">
        <div
          className={`absolute inset-0 bg-black/50 flex flex-col items-center justify-center max-md:text-center text-white xl:px-48 lg:px-20 sm:px-10 px-5 ${
            isScrolled ? "pt-[85px]" : "pt-[80px]"
          }`}
        >
          <div className="md:self-start bg-primary/80 text-primary-foreground px-4 py-2 rounded-full mb-4">
            {" "}
            <p>The Ultimate Hotel Experience</p>
          </div>
          <div className="self-start max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Discover Your Perfect Gateway Destination
            </h1>
            <p className="text-lg md:text-2xl mb-8">
              Unparalleled luxury and comfort await at the world's most
              exclusive hotels and resorts. Start your journey today.
            </p>
          </div>

          <div className="md:self-start flex flex-col md:flex-row bg-background p-4 rounded-lg shadow-lg w-full max-w-6xl mt-10">
            <HotelSearchForm />
          </div>
        </div>
      </section>

      {/* Featured Hotels Section */}
      <FeaturedHotels />

      {/* New Exclusive Offers Section */}
      <ExclusiveOffers />

      {/* New Testimonials Section */}
      <Testimonials />

      {/* New Newsletter Section */}
      <NewsletterSection />
    </main>
  );
}
