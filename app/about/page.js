import Image from "next/image";
import image1 from "@/public/about-1.png";
import image2 from "@/public/about-2.png";

export const metadata = {
  title: "About",
};
export default function Page() {
  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Welcome to Nomad Lounge
        </h1>

        <div className="space-y-8">
          <p>
            Welcome to Nomad Lounge, a luxury sanctuary where nature&apos;s raw
            beauty meets refined comfort. Nestled deep within the heart of
            exclusive, peaceful woodlands, our deluxe cabins offer a rare
            opportunity to disconnect from the chaos of everyday life and step
            into a slower, more intentional rhythm. Whether you are looking to
            watch the morning mist rise over the tree line or sink into a
            private hot tub under a canopy of stars, we invite you to experience
            a tranquil haven designed to soothe the soul..
          </p>
          <p>
            Every element of your stay has been carefully crafted to serve as
            your personal slice of nirvana. Our accommodations blend rustic,
            natural charm with premium, state-of-the-art amenities, ensuring
            that your escape into the wild never compromises on style or
            convenience. From spacious, sun-drenched living areas to panoramic
            windows that frame breathtaking mountain landscapes, each hideaway
            is a masterpiece of comfort, privacy, and understated elegance.
          </p>
          <p>
            We understand that true luxury lies in total peace of mind, which is
            why our dedicated staff stands ready to ensure your retreat is
            seamless from the moment you arrive. Whether you are planning a solo
            wellness journey, a romantic interlude, or a peaceful family
            gathering, Nomad Lounge is more than just a destination—it is a
            rejuvenating experience that stays with you long after you leave.
            Step across our threshold, leave the world behind, and let your
            unforgettable mountain story begin.
          </p>
        </div>
      </div>

      <div className="col-span-2">
        {/* statically imported image accept placeholder & quality properties */}
        <Image
          src={image1}
          placeholder="blur"
          quality={80}
          alt="Family sitting around a fire pit in front of cabin"
        />
      </div>

      {/* For images with URL's */}
      <div className="relative aspect-square col-span-2">
        <Image
          src="/about-2.png"
          fill
          className="object-cover"
          alt="Friends that manage Nomad Lounge"
        />
      </div>

      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          The Nomad Lounge Journey
        </h1>

        <div className="space-y-8">
          <p>
            The story of Nomad Lounge began with a simple, powerful vision: to
            create an uncompromised escape where the boundaries between high-end
            luxury and raw, untouched nature seamlessly dissolve. Founded in the
            rugged alpine wilderness, the retreat was born from the passion of a
            group of travelers and architects who sought refuge from the rapid
            acceleration of modern city life. They discovered a hidden pocket of
            ancient, serene forest framed by dramatic mountain peaks and
            resolved to build a sanctuary that would honor the surrounding
            landscape while offering world-class comfort.
          </p>
          <p>
            What started as a single, hand-crafted timber lodge has blossomed
            over the years into an exclusive, highly sought-after collection of
            deluxe cabins. Throughout its evolution, Nomad Lounge has remained
            fiercely committed to architectural preservation and environmental
            integration, ensuring that each new structure blends harmoniously
            into the tree line. Today, the lounge stands as a celebrated haven
            for wellness seekers and intentional travelers from around the
            globe, preserving its foundational legacy of privacy, tranquility,
            and understated elegance.
          </p>

          <div>
            <a
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Explore our luxury cabins
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
