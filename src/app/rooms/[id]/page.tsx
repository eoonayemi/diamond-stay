// src/app/rooms/[id]/page.tsx
import { notFound } from "next/navigation";
import { hotels } from "@/lib/constants"; // We'll use this as our data source for now
import {
  HostInfo,
  RoomAvailability,
  RoomDetails,
  RoomHeader,
  RoomImageGallery,
  RoomInfo,
} from "@/components/rooms";

interface RoomPageProps {
  params: {
    id: string;
  };
}

const RoomPage = ({ params }: RoomPageProps) => {
  // In a real app, you would fetch this data from a database.
  // For now, we'll find the hotel/room by ID from our constants file.
  const hotel = hotels.find((h) => h.id === parseInt(params.id));

  // If no hotel is found with that ID, show a 404 page.
  if (!hotel) {
    notFound();
  }

  return (
    <main className="pb-12 pt-[130px]">
      <div className="xl:px-48 lg:px-20 sm:px-10 px-5 flex flex-col gap-10">
        {/* We will build these two components next */}
        <RoomHeader hotel={hotel} />
        <RoomImageGallery images={hotel.images} />
        <RoomInfo hotel={hotel} />
        <RoomAvailability />
        <RoomDetails hotel={hotel} />
        <HostInfo hotel={hotel} />
      </div>
    </main>
  );
};

export default RoomPage;
