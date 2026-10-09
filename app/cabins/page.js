import Counter from "@/app/_components/Counter";
import CabinCard from "@/app/_components/CabinCard";

export const metadata = {
  title: "Cabins",
};

export default function Page() {
  // CHANGE
  const cabins = [];

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

      {cabins.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {cabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </div>
  );
}
