import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AdPlaceholder } from "./AdPlaceholder";

type Props = {
  children: ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <AdPlaceholder label="Top horizontal ad space" />
      <main className="mx-auto flex w-full max-w-6xl justify-center px-4">
        {/* Left & right gutters are intentionally empty on desktop */}
        <div className="hidden w-40 lg:block" aria-hidden="true" />
        <div className="w-full max-w-3xl pb-12 pt-4">{children}</div>
        <div className="hidden w-40 lg:block" aria-hidden="true" />
      </main>
      <Footer />
    </div>
  );
}
