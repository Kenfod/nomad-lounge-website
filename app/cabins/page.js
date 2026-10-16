import { Suspense } from "react";
import CabinList from "@/app/_components/CabinList";
import Spinner from "@/app/_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

// export const revalidate = 0;
// export const revalidate = 86400;

export const metadata = {
  title: "Cabins",
};

export default function Page({ searchParams }) {
  // console.log(searchParams);

  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Deluxe Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Nestled in the heart of exclusive, serene woodlands, the Nomad Lounge
        cabins offer the ultimate luxury mountain escape. Designed for
        relaxation and rejuvenation, these deluxe sanctuaries feature private
        hot tubs, spacious elegant interiors, and breathtaking panoramic views
        of the surrounding forest and peaks. Each cabin combines rustic natural
        charm with modern premium amenities, making it a perfect, tranquil haven
        for guests seeking a peaceful slice of nirvana.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
