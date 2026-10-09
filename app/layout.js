import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import Header from "./_components/Header";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

console.log(josefin);

import "@/app/_styles/globals.css";

export const metadata = {
  // title: "Nomad Lounge Website",
  title: {
    template: "%s / Nomad Lounge",
    default: "Welcome / Nomad Lounge",
  },
  description:
    "Book your exclusive woodland escape. Explore our deluxe cabins featuring private hot tubs and breathtaking mountain views.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col antialiased`}
      >
        <Header />

        <div className="flex-1 px-8 py-12">
          <main className="max-w-7xl mx-auto">{children}</main>
        </div>
        <footer className="max-w-7xl mx-auto">Copyright by Nomad Lounge</footer>
      </body>
    </html>
  );
}
