// src/app/about/page.tsx
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";

// SEO Metadata
export const metadata: Metadata = {
  title: "About DiamondStay | Curated Luxury Stays",
  description:
    "Learn about DiamondStay's mission to provide unparalleled luxury and comfort at the world's most exclusive properties. Discover our story and our commitment to excellence.",
};

// Data for Team Members
const teamMembers = [
  {
    name: "Alex Thompson",
    title: "Founder & CEO",
    image: "/images/team1.jpg", // Placeholder
  },
  {
    name: "Maria Garcia",
    title: "Head of Guest Experience",
    image: "/images/team2.jpg", // Placeholder
  },
  {
    name: "Fatima Wagner",
    title: "Lead Property Curator",
    image: "/images/team3.jpg", // Placeholder
  },
];

const AboutPage = () => {
  return (
    <main className="bg-background text-foreground">
      {/* Section 1: The Vision (Inspired by Poliform & minimalist typography) */}
      <section className="text-center pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="xl:px-48 lg:px-20 sm:px-10 px-5">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">
            ABOUT DIAMONDSTAY
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tighter">
            Beyond a Stay. An Experience.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            We believe travel is more than just a destination; it’s about the
            story you bring home. DiamondStay was born from a desire to redefine
            luxury hospitality by focusing on curated, one-of-a-kind properties
            and deeply personalized service.
          </p>
        </div>
      </section>

      {/* Section 2: Image Collage (Inspired by 10.8 & asymmetric layouts) */}
      <section className="xl:px-48 lg:px-20 sm:px-10 px-5 pb-16 lg:pb-24">
        <div className="grid grid-cols-3 grid-rows-2 gap-4 md:gap-6 h-[60vh] max-h-[700px]">
          <div className="col-span-3 md:col-span-2 row-span-2 relative rounded-2xl overflow-hidden">
            <Image
              src="/images/about-main.webp"
              alt="A serene and luxurious hotel lounge"
              fill
              className="object-cover"
            />
          </div>
          <div className="col-span-3 md:col-span-1 relative rounded-2xl overflow-hidden">
            <Image
              src="/images/about-top.jpg"
              alt="Architectural detail of a modern building"
              fill
              className="object-cover"
            />
          </div>
          <div className="col-span-3 md:col-span-1 relative rounded-2xl overflow-hidden">
            <Image
              src="/images/about-bottom.jpg"
              alt="A beautifully prepared dish on a table"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 3: Our Philosophy (Inspired by "Crafting Timeless Spaces") */}
      <section className="xl:px-48 lg:px-20 sm:px-10 px-5 py-16 lg:py-24 bg-zinc-50 dark:bg-zinc-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="lg:pr-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter">
              The Art of Curation
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Our portfolio isn't a list; it's a collection. Every property is
              handpicked and vetted by our team of travel experts for its unique
              character, exceptional quality, and prime location. We seek out
              the hidden gems and iconic landmarks that offer more than just a
              place to sleep.
            </p>
            <Button asChild className="mt-6" size="lg">
              <Link href="/search">
                Explore Properties <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <Image
              src="/images/about-philosophy.jpg"
              alt="A person looking out over a stunning view from a balcony"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 4: Meet the Team (Inspired by "The dream team") */}
      <section className="py-16 lg:py-24">
        <div className="xl:px-48 lg:px-20 sm:px-10 px-5 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tighter">
            Meet the Curators
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Our team combines decades of experience in luxury hospitality and
            travel to ensure your experience is flawless.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:px-48 lg:px-20 sm:px-10 px-5">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative h-80 w-full rounded-2xl overflow-hidden mb-4">
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-primary font-medium">{member.title}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
