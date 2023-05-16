import { getServerSession } from "next-auth";
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
        <div key={camp.id}>{camp.name}</div>
      ))}
    </div>
  );
}
