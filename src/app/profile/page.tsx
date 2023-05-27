import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "YelpCamp - Profile",
  description: "Your YelpCamp profile.",
};

export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  const camps = await prisma.campsite.findMany({
    where: {
      author: {
        email: session.user?.email,
      },
    },
  });

  if (!camps) {
    return <div>No camps found.</div>;
  }

  return (
    <div>
      {camps.map((camp) => (
        <div key={camp.id}>
          <p>{camp.name}</p>
          <button className="px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-red-600 border border-red-700 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
