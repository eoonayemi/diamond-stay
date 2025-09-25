"use client"; // This component might involve client-side state for form handling later

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState } from "react"; // For basic input handling

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send 'email' to your backend here
    console.log("Subscribing with email:", email);
    alert("Thank you for subscribing!");
    setEmail(""); // Clear the input after submission
  };

  return (
    <section className="py-16 lg:py-24 bg-zinc-50 dark:bg-zinc-900">
      {" "}
      {/* Use bg-secondary for alternating background */}
      <div className="xl:px-48 lg:px-20 sm:px-10 px-5">
        <div className="bg-card text-center py-16 px-6 rounded-3xl shadow-xl dark:shadow-none max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground mb-4">
            Stay Inspired
          </h2>
          <p className="max-w-xl mx-auto text-lg text-muted-foreground mb-8">
            Join our newsletter and be the first to discover new destinations,
            exclusive offers, and travel inspiration.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 max-w-sm mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-input dark:bg-input-dark text-foreground border-border rounded-xl px-5 py-3 text-base focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 py-3 text-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              Subscribe <ArrowRight className="w-5 h-5" />
            </Button>
          </form>

          <p className="text-xs text-muted-foreground mt-8">
            By subscribing, you agree to our{" "}
            <Link
              href="/privacy-policy"
              className="underline hover:text-foreground/80 transition-colors"
            >
              Privacy Policy
            </Link>{" "}
            and consent to receive updates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
