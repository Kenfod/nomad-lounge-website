import Link from "next/link";
import Navigation from "./components/Navigation";

export default function Page() {
  return (
    <div>
      <Navigation />

      <h1>Nomad Lounge. Welcome to Nirvana!</h1>

      <Link href="/cabins">Explore deluxe cabins</Link>
    </div>
  );
}
