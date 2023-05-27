import { type Campsite } from "@prisma/client";
import { notFound } from "next/navigation";
import { type Metadata } from "next";

interface IParams {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
  const res = await fetch(`http://localhost:3000/api/camps/${params.id}`);
  const camp: Campsite = await res.json();

  return {
    title: `YelpCamp - ${camp.name}`,
    description: camp.description,
  };
}

export default async function CampPage({ params }: IParams) {
  const res = await fetch(`http://localhost:3000/api/camps/${params.id}`);
  const camp: Campsite = await res.json();
  console.log("THE JSON HAS BEEN HIT");

  if (!camp) {
    return notFound();
  }

  return (
    <div>
      <p>{camp.name}</p>
    </div>
  );
}
