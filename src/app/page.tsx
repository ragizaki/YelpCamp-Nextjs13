import { type Campsite } from "@prisma/client";
import Camp from "./Camp";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "YelpCamp - Home",
  description:
    "Browse your favourite campsites around the world with YelpCamp!",
};

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/camps", {
    cache: "no-store",
  });
  const camps: Campsite[] = await res.json();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {camps.map((camp) => (
        <Camp key={camp.id} camp={camp} />
      ))}
    </div>
  );
}
