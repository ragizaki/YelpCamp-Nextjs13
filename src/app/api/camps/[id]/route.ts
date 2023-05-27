import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

interface RouteConfig {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params }: RouteConfig) {
  const { id } = params;
  try {
    const camp = await prisma.campsite.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!camp) {
      return NextResponse.json({ error: "Camp not found" }, { status: 404 });
    }
    return NextResponse.json(camp, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: RouteConfig) {
  const { id } = params;
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const camp = await prisma.campsite.findUnique({
      where: {
        id,
      },
      include: {
        author: {
          select: {
            email: true,
          },
        },
      },
    });

    if (session.user?.email !== camp?.author.email) {
      return NextResponse.json(
        { error: "You do not own this campsite" },
        { status: 401 }
      );
    }

    await prisma.campsite.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
