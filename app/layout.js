import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

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
      <body className="bg-primary-950 text-primary-100 min-h-screen">
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>Copyright by Nomad Lounge</footer>
      </body>
    </html>
  );
}
