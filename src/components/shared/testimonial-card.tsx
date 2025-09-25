// src/components/shared/TestimonialCard.tsx
import Image from "next/image";
import { Star } from "lucide-react";

// Define the type for the testimonial prop
type Testimonial = {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  quote: string;
};

interface TestimonialCardProps {
  testimonial: Testimonial;
}

// A small helper component to render the stars
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${
            index < rating
              ? "text-orange-400 fill-orange-400"
              : "text-gray-300 dark:text-gray-600"
          }`}
        />
      ))}
    </div>
  );
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="w-full bg-card p-6 rounded-2xl border border-border/60 shadow-sm">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <h3 className="font-semibold text-lg text-foreground">
            {testimonial.name}
          </h3>
        </div>
        <StarRating rating={testimonial.rating} />
        <blockquote className="text-muted-foreground leading-relaxed">
          &quot;{testimonial.quote}&quot;
        </blockquote>
      </div>
    </div>
  );
};

export default TestimonialCard;
