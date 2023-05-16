import { Campsite } from "@prisma/client";
import Link from "next/link";

interface Props {
  camp: Campsite;
}

export default function Camp({ camp }: Props) {
  return (
    <div>
      <h2>{camp.name}</h2>
      <p>{camp.description}</p>
      <p>
        Location: {camp.city}, {camp.country}
      </p>
      <p>Price: ${camp.price}/night</p>
      <Link href={`/camps/${camp.id}`}>View More</Link>
    </div>
  );
}
