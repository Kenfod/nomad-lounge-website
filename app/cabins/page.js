import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";

export const metadata = {
  title: "Cabins",
};

export default function Page() {
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
      <Suspense fallback={<Spinner />}>
        <CabinList />
      </Suspense>
    </div>
  );
}
