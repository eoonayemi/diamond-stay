// src/components/rooms/RoomAvailability.tsx
"use client";

import { useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { toast } from "sonner";
import { Calendar as CalendarIcon, KeyRound } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const RoomAvailability = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 5),
  });
  const [guests, setGuests] = useState(1);
  const [isAvailable, setIsAvailable] = useState(false);

  // This is a mock check. In a real app, this would be an API call.
  const handleCheckAvailability = () => {
    // Simulate an API call delay
    const promise = () =>
      new Promise<void>((resolve, reject) =>
        setTimeout(() => {
          // Simple mock logic: fail 30% of the time
          if (Math.random() > 0.3) {
            resolve();
          } else {
            reject();
          }
        }, 1000)
      );

    toast.promise(promise, {
      loading: "Checking availability...",
      success: () => {
        setIsAvailable(true);
        return "Room is available for the selected dates!";
      },
      error: () => {
        setIsAvailable(false);
        return "Sorry, the room is not available for these dates.";
      },
    });
  };

  const handleBookNow = () => {
    // Logic to proceed to the booking/payment page
    toast.success("Redirecting to booking page...");
    // router.push('/book');
  };

  return (
    <div className="mt-8 p-6 bg-card rounded-2xl shadow-lg border border-border/60">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-end gap-4">
        {/* Check-in / Check-out Date Range Picker */}
        <div className="grid gap-2 lg:col-span-2">
          <Label htmlFor="dates">Check-in - Check-out</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="dates"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                disabled={(day) =>
                  day < new Date(new Date().setHours(0, 0, 0, 0))
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests Input */}
        <div className="grid gap-2">
          <Label htmlFor="guests">Guests</Label>
          <Input
            id="guests"
            type="number"
            min={1}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
          />
        </div>

        {/* Action Button */}
        <div className="w-full">
          {isAvailable ? (
            <Button onClick={handleBookNow} className="w-full text-lg h-12">
              <KeyRound className="mr-2 h-5 w-5" />
              Book Now
            </Button>
          ) : (
            <Button
              onClick={handleCheckAvailability}
              className="w-full text-lg h-12"
            >
              Check Availability
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomAvailability;
