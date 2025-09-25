// src/components/shared/ExclusiveOfferCard.tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Define the type for the offer prop
type Offer = {
  id: number;
  discount: string;
  title: string;
  description: string;
  expires: string;
  image: string;
};

interface ExclusiveOfferCardProps {
  offer: Offer;
}

const ExclusiveOfferCard: React.FC<ExclusiveOfferCardProps> = ({ offer }) => {
  return (
    <div className="group relative w-full h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      {/* Background Image */}
      <Image
        src={offer.image}
        alt={offer.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/90" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6 text-white">
        {/* Top Section: Discount Tag */}
        <div>
          <span className="bg-white/90 text-black text-xs font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-sm">
            {offer.discount}
          </span>
        </div>

        {/* Bottom Section: Text and Link */}
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold">{offer.title}</h3>
          <p className="text-sm text-white/90">{offer.description}</p>
          <div className="pt-4">
            <p className="text-xs text-white/80 font-medium">{offer.expires}</p>
            <Link
              href="/offers"
              className="flex items-center gap-2 mt-1 font-semibold group-hover:gap-3 transition-[gap] duration-300"
            >
              View Offers
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExclusiveOfferCard;
