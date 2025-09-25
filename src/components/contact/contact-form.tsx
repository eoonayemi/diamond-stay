// src/components/contact/ContactForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useState } from "react"; // Import useState

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  // FormLabel, // Removed FormLabel
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Assuming you have cn utility

// Schema for form validation
const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"), // Min 1 for placeholder style
  lastName: z.string().min(1, "Last name is required"), // Min 1 for placeholder style
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  message: z
    .string()
    .min(10, "Message is too short")
    .max(500, "Message cannot exceed 500 characters"),
});

const ContactForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const [messageCharCount, setMessageCharCount] = useState(0);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Your message has been sent successfully!");
    form.reset();
    setMessageCharCount(0); // Reset character count
  }

  return (
    <div className="bg-card p-8 rounded-2xl shadow-lg border border-border/60">
      <h3 className="text-2xl font-semibold mb-2">Get in Touch</h3>
      <p className="text-muted-foreground mb-6">You can reach us anytime.</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {" "}
            {/* Adjusted gap */}
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      className="h-14 pl-4 pr-12 text-base"
                      placeholder="First name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="absolute -bottom-6 left-0 text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      className="h-14 pl-4 pr-12 text-base"
                      placeholder="Last name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="absolute -bottom-6 left-0 text-xs" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input
                    className="h-14 pl-4 pr-12 text-base"
                    placeholder="Your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute -bottom-6 left-0 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="relative">
                {/* This mimics the country code input from the inspiration */}
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-base text-muted-foreground">
                    +1
                  </span>
                  <Input
                    className="h-14 pl-10 pr-4 text-base"
                    placeholder="Phone number"
                    {...field}
                  />
                </div>
                <FormMessage className="absolute -bottom-6 left-0 text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Textarea
                    placeholder="How can we help?"
                    className="min-h-[140px] pl-4 pr-12 py-3 text-base"
                    maxLength={500}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setMessageCharCount(e.target.value.length);
                    }}
                  />
                </FormControl>
                <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                  {messageCharCount}/500
                </div>
                <FormMessage className="absolute -bottom-6 left-0 text-xs" />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full h-12 text-lg">
            Submit
          </Button>
        </form>
      </Form>

      <p className="text-xs text-muted-foreground mt-6 text-center">
        By contacting us, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-primary">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-primary">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
};

export default ContactForm;
