// src/components/layout/Testimonials.tsx
import { testimonials } from "@/lib/constants";
import { TestimonialCard } from "@/components/shared";

const Testimonials = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="xl:px-48 lg:px-20 sm:px-10 px-5">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
            What Our Guests Say
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Discover why discerning travelers consistently choose DiamondStay
            for their exclusive and luxurious accommodations around the world.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
