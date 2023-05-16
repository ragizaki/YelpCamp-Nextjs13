import { type Campsite } from "@prisma/client";
import { notFound } from "next/navigation";

export default async function CampPage({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/api/camps/${params.id}`);
  const camp: Campsite = await res.json();

  if (!camp) {
    return notFound();
  }

  return <div>{camp.name}</div>;
}
