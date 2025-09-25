// src/components/search/FilterSidebar.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

const FilterSidebar = () => {
  // In a real app, state for these filters would be managed here (e.g., with useState or useReducer)
  // and would likely interact with URL search params.

  return (
    <aside className="p-6 bg-card rounded-xl border border-border/60 shadow-sm sticky top-28">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Filters</h2>
        <Button variant="ghost" className="text-sm">
          Clear
        </Button>
      </div>
      <Separator />

      {/* Popular Filters */}
      <div className="mt-6">
        <h3 className="font-semibold mb-3">Popular filters</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="single-bed" />
            <Label htmlFor="single-bed">Single Bed</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="double-bed" />
            <Label htmlFor="double-bed">Double Bed</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="luxury-room" />
            <Label htmlFor="luxury-room">Luxury Room</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="family-suite" />
            <Label htmlFor="family-suite">Family Suite</Label>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Price Range */}
      <div className="mt-6">
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="price-1" />
            <Label htmlFor="price-1">$0 to $500</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="price-2" />
            <Label htmlFor="price-2">$500 to $1000</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="price-3" />
            <Label htmlFor="price-3">$1000 to $2000</Label>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Sort By */}
      <div className="mt-6">
        <h3 className="font-semibold mb-3">Sort By</h3>
        <RadioGroup defaultValue="low-to-high">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="low-to-high" id="sort-1" />
            <Label htmlFor="sort-1">Price Low to High</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="high-to-low" id="sort-2" />
            <Label htmlFor="sort-2">Price High to Low</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="newest" id="sort-3" />
            <Label htmlFor="sort-3">Newest First</Label>
          </div>
        </RadioGroup>
      </div>
    </aside>
  );
};

export default FilterSidebar;
