// src/components/form/HotelSearchForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

// Make all fields optional for this form's validation
const homeSearchSchema = hotelSearchSchema.partial();

export const HotelSearchForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof homeSearchSchema>>({
    resolver: zodResolver(homeSearchSchema),
    defaultValues: {
      destination: "",
      guests: 1,
    },
  });

  function onSubmit(values: z.infer<typeof homeSearchSchema>) {
    const { destination, checkIn, checkOut, guests } = values;

    // If all fields are empty/default, navigate without params
    if (!destination && !checkIn && !checkOut && guests === 1) {
      router.push("/search");
      return;
    }

    // Otherwise, build the query string with provided values
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (checkIn) params.set("checkIn", format(checkIn, "yyyy-MM-dd"));
    if (checkOut) params.set("checkOut", format(checkOut, "yyyy-MM-dd"));
    if (guests) params.set("guests", guests.toString());

    router.push(`/search?${params.toString()}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-5 w-full justify-items-center items-start gap-4 "
      >
        {/* Destination Input (No change) */}
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem className="w-full md:w-[7rem] lg:w-[9rem] xl:w-[12rem]">
              <FormLabel className="text-foreground/80 flex items-center gap-2">
                <MapPin size={16} /> Destination
              </FormLabel>
              <FormControl>
                <Input placeholder="e.g., Paris" {...field} />
              </FormControl>
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />

        {/* Check-in Date (No change) */}
        <FormField
          control={form.control}
          name="checkIn"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full md:w-[7rem] lg:w-[9rem] xl:w-[12rem]">
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
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "yyyy-MM-dd")
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
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />

        {/* Check-out Date (No change) */}
        <FormField
          control={form.control}
          name="checkOut"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full md:w-[7rem] lg:w-[9rem] xl:w-[12rem]">
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
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "yyyy-MM-dd")
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
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />

        {/* Guests and Search Button */}
        {/* <div className="grid grid-cols-2 gap-4 md:grid-cols-[1fr,auto]"> */}
        <FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <FormItem className="w-full md:w-[7rem] lg:w-[9rem] xl:w-[12rem]">
              <FormLabel className="text-foreground/80 flex items-center gap-2">
                <Users size={16} /> Guests
              </FormLabel>
              <FormControl>
                {/* 2. UPDATED INPUT: Explicitly convert value to a number onChange */}
                <Input
                  type="number"
                  min={1}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                  className="text-muted-foreground"
                />
              </FormControl>
              <FormMessage className="text-left" />
            </FormItem>
          )}
        />

        <div className="mt-6 w-full md:w-[7rem] lg:w-[9rem] xl:w-[12rem]">
          {" "}
          <Button type="submit" className="w-full">
            <Search size={20} className="mr-2" /> Search
          </Button>
        </div>

        {/* </div> */}
      </form>
    </Form>
  );
};

export default HotelSearchForm;
