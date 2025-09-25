// src/app/contact/page.tsx
import { ContactForm } from "@/components/contact";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact Us | DiamondStay",
  description:
    "Get in touch with the DiamondStay team. We're here to help with your inquiries, support, and feedback.",
};

const faqItems = [
  {
    question: "What makes DiamondStay different?",
    answer:
      "We focus on a curated selection of high-quality, unique properties and provide personalized, 24/7 customer support to ensure an exceptional travel experience from start to finish.",
  },
  {
    question: "How secure is my booking and payment information?",
    answer:
      "We use industry-leading encryption and security protocols to protect all your personal and payment information. Your privacy and security are our top priorities.",
  },
  {
    question: "Can I make special requests for my stay?",
    answer:
      "Absolutely! You can add special requests during the booking process or contact our support team afterward. We'll do our best to coordinate with the host to accommodate your needs.",
  },
];

const ContactPage = () => {
  return (
    <main className="bg-secondary">
      {/* Section 1: Contact Info and Form */}
      <section className="py-16 lg:pb-24 lg:pt-40 bg-background">
        {" "}
        {/* Changed background to white for contrast */}
        <div className="xl:px-48 lg:px-20 sm:px-10 px-5 grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-16 items-start">
          {" "}
          {/* Adjusted grid column ratio */}
          {/* Left Side: Contact Details */}
          <div className="pt-8 pb-4 lg:pr-12">
            {" "}
            {/* Added top/bottom padding and right padding for spacing */}
            <h1 className="text-6xl font-extrabold tracking-tighter mb-4 text-foreground">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Email, call, or complete the form to learn how DiamondStay can
              enhance your travel experience.
            </p>
            {/* General Info Links */}
            <div className="space-y-2 mb-10">
              {" "}
              {/* Adjusted spacing and margin */}
              <Link
                href="mailto:info@diamondstay.io"
                className="block text-xl text-foreground font-medium hover:text-primary transition-colors"
              >
                info@diamondstay.io
              </Link>
              <p className="text-xl text-foreground font-medium">
                +1-202-555-0182
              </p>
              <Link
                href="/support"
                className="block text-primary text-base font-semibold hover:underline"
              >
                Customer Support
              </Link>
            </div>
            {/* Support Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border">
              {" "}
              {/* Added top border as in inspiration */}
              <div>
                <h4 className="font-bold text-foreground text-lg mb-2">
                  Customer Support
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Our support team is available around the clock to address any
                  concerns or queries you may have.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-foreground text-lg mb-2">
                  Feedback & Suggestions
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We value your feedback and are continuously working to improve
                  our platform. Your input is crucial in shaping the future of
                  DiamondStay.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-foreground text-lg mb-2">
                  Media Inquiries
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  For media-related questions or press inquiries, please contact
                  us at{" "}
                  <Link
                    href="mailto:media@diamondstay.io"
                    className="text-primary hover:underline"
                  >
                    media@diamondstay.io
                  </Link>
                </p>
              </div>
            </div>
          </div>
          {/* Right Side: Contact Form Container */}
          {/* The form container itself has a lighter background and shadow, achieved in ContactForm.tsx */}
          <div className="lg:mt-8">
            {" "}
            {/* Adjusted margin-top to align */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Section 2: Location */}
      <section className="py-16 lg:py-24 bg-zinc-50 dark:bg-zinc-900">
        <div className="xl:px-48 lg:px-20 sm:px-10 px-5 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-semibold text-primary uppercase">
              Our Location
            </span>
            <h2 className="text-4xl font-bold tracking-tighter mt-2 mb-4">
              Connecting Near and Far
            </h2>
            <h3 className="font-semibold text-xl">Headquarters</h3>
            <p className="text-muted-foreground">
              123 Luxury Lane, Suite 456
              <br />
              Beverly Hills, CA 90210
              <br />
              United States
            </p>
          </div>
          <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-lg border">
            {/* For a real map, you would use a library like Google Maps React or Mapbox.
                    For this design, a static image is perfect. */}
            <Image
              src="/images/map-placeholder.png"
              alt="Map showing office location"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Section 3: FAQ */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="xl:px-48 lg:px-20 sm:px-10 px-5">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tighter">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground mt-4">
              Have questions? We have answers. If you can't find what you're
              looking for, feel free to contact us.
            </p>
          </div>
          <div className="mt-12 max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem value={`item-${index + 1}`} key={index}>
                  <AccordionTrigger className="text-lg text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
