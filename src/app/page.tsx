import { type Campsite } from "@prisma/client";
import Camp from "./Camp";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "YelpCamp - Home",
  description:
    "Browse your favourite campsites around the world with YelpCamp!",
};

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/camps");
  const camps: Campsite[] = await res.json();

  return (
    <div>
      {camps.map((camp) => (
        <Camp key={camp.id} camp={camp} />
      ))}
    </div>
  );
}
