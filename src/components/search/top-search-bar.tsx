"use client";

import { useState, useEffect, useRef } from "react";
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
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Import the new components
import { GuestStepper } from "./guest-stepper";
import { LocationSearch } from "./location-search";
import { useOutsideClick } from "@/hooks";

export const TopSearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State for inputs
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  // State for UI control
  const [activePopover, setActivePopover] = useState("");
  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const [openCollapsible, setOpenCollapsible] = useState("destination");

  const popoverWrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClick(popoverWrapperRef, () => {
    setActivePopover("");
  });

  const totalGuests = adults + children;

  // Sync state from URL on initial load
  useEffect(() => {
    setDestination(searchParams.get("destination") || "");
    setAdults(Number(searchParams.get("adults") || 1));
    setChildren(Number(searchParams.get("children") || 0));
    setInfants(Number(searchParams.get("infants") || 0));
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
    params.set("adults", adults.toString());
    params.set("children", children.toString());
    params.set("infants", infants.toString());

    router.push(`${pathname}?${params.toString()}`);
    setSheetIsOpen(false); // Close sheet after search
  };

  const handleClearFilters = () => {
    setDestination("");
    setDate(undefined);
    setAdults(0);
    setChildren(0);
    setInfants(0);
  };

  return (
    <div className="w-full mx-auto">
      <div className="w-full sm:max-w-xl lg:max-w-2xl mx-auto border rounded-full shadow-md hover:shadow-lg transition-shadow flex items-center">
        {/* Desktop View */}
        <div
          ref={popoverWrapperRef}
          className="hidden md:flex flex-1 items-center"
        >
          <Popover open={activePopover === "destination"}>
            <PopoverTrigger asChild>
              <button
                className={`flex-1 text-left px-6 py-3 rounded-full hover:bg-muted ${
                  activePopover === "destination" && "bg-muted/60"
                } transition-colors`}
                onClick={() =>
                  setActivePopover(
                    activePopover === "destination" ? "" : "destination"
                  )
                }
              >
                <p className="font-semibold">Anywhere</p>
                <p className="text-xs text-muted-foreground truncate">
                  {destination || "Search destinations"}
                </p>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px]" align="start">
              <LocationSearch
                onLocationSelect={() => setActivePopover("date")}
                value={destination}
                onValueChange={setDestination}
              />
            </PopoverContent>
          </Popover>
          <Separator orientation="vertical" className="h-8" />
          <Popover open={activePopover === "date"}>
            <PopoverTrigger asChild>
              <button
                className={` flex-1 text-left px-6 py-3 rounded-full hover:bg-muted ${
                  activePopover === "date" && "bg-muted/60"
                } transition-colors`}
                onClick={() => () =>
                  setActivePopover(
                    activePopover === "date" ? "" : "date"
                  )
                }
              >
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
          <Popover open>
            <PopoverTrigger asChild>
              <button
                className={`flex-1 text-left px-6 py-3 rounded-full hover:bg-muted ${
                  activePopover === "guests" && "bg-muted/60"
                } transition-colors`}
                onClick={() => setActivePopover("guests")}
              >
                <p className="font-semibold text-foreground/80">Add guests</p>
                <p className="text-xs text-muted-foreground">
                  {totalGuests > 0 ? `${totalGuests} guests` : "Who's coming?"}
                </p>
              </button>
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
        </div>

        {/* Mobile View: Using a Sheet with Collapsibles */}
        <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
          <SheetTrigger asChild>
            <button className="flex-1 md:hidden flex items-center gap-4 px-6 py-3 text-left">
              <Search className="h-6 w-6 text-primary" />
              <div>
                <p className="font-semibold">{destination || "Where to?"}</p>
                <p className="flex gap-1 text-[0.6rem] text-muted-foreground">
                  <span>{destination || "Add destination"}</span>
                  <span> · </span>
                  <span>
                    {date?.from && date?.to
                      ? `${format(date.from, "LLL dd")} - ${format(
                          date.to,
                          "LLL dd"
                        )}`
                      : "Any week"}
                  </span>
                  <span> · </span>
                  <span>
                    {totalGuests > 0 ? `${totalGuests} guests` : "Add guests"}
                  </span>
                </p>
              </div>
            </button>
          </SheetTrigger>
          <SheetContent
            side="top"
            className="h-screen overflow-y-auto bg-zinc-100 dark:bg-zinc-900 pb-20"
          >
            <SheetHeader className="my-2">
              <SheetTitle className="text-2xl text-center">
                Refine your search
              </SheetTitle>
            </SheetHeader>
            <div className="grid gap-4 py-6 px-4 -mt-10">
              {/* Destination Collapsible */}
              <Collapsible
                open={openCollapsible === "destination"}
                onOpenChange={() => setOpenCollapsible("destination")}
              >
                <CollapsibleTrigger asChild>
                  <div
                    className={`flex justify-between items-center p-5 rounded-xl transition-colors bg-background ${
                      openCollapsible === "destination" && "hidden"
                    } shadow-md hover:shadow-lg`}
                  >
                    <p className="font-semibold text-lg">Where</p>
                    <p className="text-muted-foreground truncate">
                      {destination || "Add destination"}
                    </p>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4">
                  <LocationSearch
                    value={destination}
                    onValueChange={setDestination}
                    styles="max-sm:bg-background max-sm:p-10 max-sm:rounded-xl"
                  />
                </CollapsibleContent>
              </Collapsible>

              {/* Date Collapsible */}
              <Collapsible
                open={openCollapsible === "date"}
                onOpenChange={() => setOpenCollapsible("date")}
              >
                <CollapsibleTrigger asChild>
                  <div
                    className={`flex justify-between items-center p-5 rounded-xl transition-colors bg-background ${
                      openCollapsible === "date" && "hidden"
                    } shadow-md hover:shadow-lg`}
                  >
                    <p className="font-semibold text-lg">When</p>
                    <p className="text-muted-foreground">
                      {date?.from && date?.to
                        ? `${format(date.from, "LLL dd")} - ${format(
                            date.to,
                            "LLL dd"
                          )}`
                        : "Add dates"}
                    </p>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col bg-background p-10 rounded-xl">
                    <Label className="text-xl text-left">Dates</Label>
                    <Calendar
                      mode="range"
                      selected={date}
                      onSelect={setDate}
                      className="self-center mt-5 bg-card rounded-xl"
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Guests Collapsible */}
              <Collapsible
                open={openCollapsible === "guests"}
                onOpenChange={() => setOpenCollapsible("guests")}
              >
                <CollapsibleTrigger asChild>
                  <div
                    className={`flex justify-between items-center p-5 rounded-xl transition-colors bg-background ${
                      openCollapsible === "guests" && "hidden"
                    } shadow-md hover:shadow-lg`}
                  >
                    <p className="font-semibold text-lg">Who</p>
                    <p className="text-muted-foreground">
                      {totalGuests > 0 ? `${totalGuests} guests` : "Add guests"}
                    </p>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4 space-y-4 rounded-2xl bg-background p-10">
                  <Label className="text-xl mb-5 text-center">Guests</Label>
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
                </CollapsibleContent>
              </Collapsible>

              <div className="flex justify-between items-center fixed inset-x-0 bottom-0 bg-background p-5">
                <div>
                  <Button
                    className="bg-transparent underline w-full text-lg h-12 text-foreground hover:text-foreground/60 hover:bg-transparent"
                    onClick={handleClearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
                <div>
                  {" "}
                  <Button
                    onClick={handleSearch}
                    className="w-full text-lg h-12 flex items-center gap-2 justify-center bg-primary"
                  >
                    <Search className="h-4 w-4" /> Search
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Search Icon Button */}
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
