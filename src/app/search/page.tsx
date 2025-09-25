// src/app/search/page.tsx
import {
  FilterSidebar,
  SearchResults,
  TopSearchBar,
} from "@/components/search";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

// Using Suspense is a good practice for pages that depend on search params
const SearchPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
};

// We create a separate component to easily use searchParams
const SearchPageContent = () => {
  return (
    <main className="pb-8 pt-[130px]">
      <div className="xl:px-48 lg:px-20 sm:px-10 px-5">
        <div className="mb-10">
          <TopSearchBar />
        </div>
        <Separator className="mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <FilterSidebar />
          </div>
          <div className="lg:col-span-2">
            <SearchResults />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
