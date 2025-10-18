"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { CalendarIcon, MapPin, Users, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { hotelSearchSchema } from "@/lib/schemas";

// Import the new components we're integrating
import { GuestStepper } from "../search/guest-stepper";
import { LocationSearch } from "../search/location-search";

// All fields are optional for the hero form, validation is not strict here
const homeSearchSchema = hotelSearchSchema.partial();

const HotelSearchForm = () => {
  const router = useRouter();

  // State for guest steppers
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const totalGuests = adults + children;

  const form = useForm<z.infer<typeof homeSearchSchema>>({
    resolver: zodResolver(homeSearchSchema),
    defaultValues: {
      guests: 0,
    },
  });

  // Keep the form's 'guests' field in sync with our stepper state
  useEffect(() => {
    form.setValue("guests", totalGuests);
  }, [totalGuests, form]);

  function onSubmit(values: z.infer<typeof homeSearchSchema>) {
    const { destination, checkIn, checkOut } = values;

    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (checkIn) params.set("checkIn", format(checkIn, "yyyy-MM-dd"));
    if (checkOut) params.set("checkOut", format(checkOut, "yyyy-MM-dd"));

    // Add detailed guest counts to the URL
    params.set("adults", adults.toString());
    params.set("children", children.toString());
    params.set("infants", infants.toString());

    router.push(`/search?${params.toString()}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-5 w-full items-end gap-4"
      >
        {/* Destination with LocationSearch Popover */}
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-foreground/80 flex items-center gap-2">
                <MapPin size={16} /> Destination
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-start text-left font-normal text-foreground/80",
                        !field.value &&
                          "text-muted-foreground hover:text-muted-foreground"
                      )}
                    >
                      {field.value || "Search destinations"}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[400px]" align="start">
                  <LocationSearch
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Check-in Date */}
        <FormField
          control={form.control}
          name="checkIn"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className="text-foreground/80 flex items-center gap-2">
                <CalendarIcon size={16} /> Check in
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "text-left font-normal",
                        !field.value
                          ? "text-muted-foreground hover:text-muted-foreground"
                          : "text-foreground/80"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "LLL dd, y")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    autoFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Check-out Date */}
        <FormField
          control={form.control}
          name="checkOut"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel className="text-foreground/80 flex items-center gap-2">
                <CalendarIcon size={16} /> Check out
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "text-left font-normal",
                        !field.value
                          ? "text-muted-foreground hover:text-muted-foreground"
                          : "text-foreground/80"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "LLL dd, y")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < (form.getValues("checkIn") || new Date())
                    }
                    autoFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Guests with GuestStepper Popover */}
        <FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-foreground/80 flex items-center gap-2">
                <Users size={16} /> Guests
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Input
                      readOnly
                      value={
                        totalGuests > 0 ? `${totalGuests} guests` : "Add guests"
                      }
                      className={cn(
                        "text-foreground/80 cursor-pointer text-left",
                        !field.value &&
                          "text-muted-foreground hover:text-muted-foreground hover:bg-muted"
                      )}
                    />
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                  <div className="grid gap-6 p-4">
                    <GuestStepper
                      label="Adults"
                      description="Ages 13 or above"
                      value={adults}
                      onValueChange={setAdults}
                    />
                    <GuestStepper
                      label="Children"
                      description="Ages 2-12"
                      value={children}
                      onValueChange={setChildren}
                    />
                    <GuestStepper
                      label="Infants"
                      description="Under 2"
                      value={infants}
                      onValueChange={setInfants}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Search Button */}
        <div className="w-full">
          <Button type="submit" className="w-full h-10">
            <Search size={20} className="mr-2" /> Search
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default HotelSearchForm;
