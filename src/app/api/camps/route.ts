import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const camps = await prisma.campsite.findMany({
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json(camps, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const camp = await prisma.campsite.create({
      data: {
        ...body,
        author: { connect: { email: session?.user?.email } },
      },
    });

    return NextResponse.json(camp, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
