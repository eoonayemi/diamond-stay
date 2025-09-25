// src/components/search/TopSearchBar.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { format, parseISO } from "date-fns";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const TopSearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State for each input, same as before
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(1);

  // Sync state from URL on initial load
  useEffect(() => {
    setDestination(searchParams.get("destination") || "");
    setGuests(Number(searchParams.get("guests") || 1));
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    if (checkIn && checkOut) {
      setDate({ from: parseISO(checkIn), to: parseISO(checkOut) });
    }
  }, [searchParams]);

  // Update URL with new search params
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (destination) params.set("destination", destination);
    else params.delete("destination");
    if (date?.from) params.set("checkIn", format(date.from, "yyyy-MM-dd"));
    else params.delete("checkIn");
    if (date?.to) params.set("checkOut", format(date.to, "yyyy-MM-dd"));
    else params.delete("checkOut");
    params.set("guests", guests.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full lg:w-auto mx-auto">
      <div className="w-full lg:max-w-2xl mx-auto border rounded-full shadow-md hover:shadow-lg transition-shadow flex items-center">
        {/* Desktop View: Using your preferred design */}
        <div className="hidden md:flex flex-1 items-center">
          {/* Destination Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex-1 text-left px-6 py-3 rounded-full hover:bg-muted transition-colors">
                <p className="font-semibold">Anywhere</p>
                <p className="text-xs text-muted-foreground truncate">
                  {destination || "Search destinations"}
                </p>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g., Paris"
                />
              </div>
            </PopoverContent>
          </Popover>

          <Separator orientation="vertical" className="h-8" />

          {/* Date Range Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex-1 text-left px-6 py-3 rounded-full hover:bg-muted transition-colors">
                <p className="font-semibold">Any week</p>
                <p className="text-xs text-muted-foreground">
                  {date?.from && date?.to
                    ? `${format(date.from, "LLL dd")} - ${format(
                        date.to,
                        "LLL dd"
                      )}`
                    : "Add dates"}
                </p>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Separator orientation="vertical" className="h-8" />

          {/* Guests Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <button className="flex-1 text-left px-6 py-3 rounded-full hover:bg-muted transition-colors">
                <p className="font-semibold text-foreground/80">Add guests</p>
                <p className="text-xs text-muted-foreground">
                  {guests > 0 ? `${guests} guests` : "Who's coming?"}
                </p>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-60">
              <div className="grid gap-4">
                <Label htmlFor="guests">Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  min={1}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Mobile View: Using a Sheet for the form */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex-1 md:hidden flex items-center gap-4 px-6 py-3 text-left">
              <Search className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold">{destination || "Where to?"}</p>
                <p className="text-xs text-muted-foreground">
                  Anywhere · Any week · Add guests
                </p>
              </div>
            </button>
          </SheetTrigger>
          <SheetContent side="top" className="h-screen overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Refine your search</SheetTitle>
            </SheetHeader>
            <div className="grid gap-6 py-6">
              <div className="grid gap-2">
                <Label htmlFor="dest-mobile">Destination</Label>
                <Input
                  id="dest-mobile"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Search destinations"
                />
              </div>
              <div className="grid gap-2">
                <Label>Dates</Label>
                <Calendar mode="range" selected={date} onSelect={setDate} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="guests-mobile">Guests</Label>
                <Input
                  id="guests-mobile"
                  type="number"
                  min={1}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                />
              </div>
              <Button onClick={handleSearch} className="w-full text-lg h-12">
                Search
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Search Icon Button (visible on all sizes) */}
        <div className="p-2">
          <Button
            onClick={handleSearch}
            size="icon"
            className="bg-primary hover:bg-primary/90 rounded-full h-10 w-10"
          >
            <Search className="h-4 w-4 text-primary-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
};
