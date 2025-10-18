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
    <main className="pb-32 pt-[80px]">
      <div className="xl:px-48 lg:px-20 sm:px-10 px-5">
        <div className="gap-5 xl:px-48 lg:px-20 sm:px-10 px-5 fixed z-30 flex flex-col bg-background pt-5 w-full inset-x-0">
          <TopSearchBar />
          <Separator />
        </div>

        <div className="pt-32">
          {/* <div className="lg:col-span-1">
            <FilterSidebar />
          </div> */}
          {/* <div className=""> */}
          <SearchResults />
          {/* </div> */}
        </div>
      </div>
    </main>
  );
};

export default SearchPage;
