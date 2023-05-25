import { type Campsite } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

interface Props {
  camp: Campsite;
}

export default function Camp({ camp }: Props) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Image
        className="w-full"
        src={camp.photo}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{camp.name}</div>
        <p className="text-gray-700 text-base">{camp.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <Link
          href={`/camps/${camp.id}`}
          className="inline-block bg-gray-200 hover:bg-gray-300 transition ease-in rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          View More
        </Link>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
    </div>
  );
}
