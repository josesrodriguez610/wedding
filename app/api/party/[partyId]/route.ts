import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: NextRequest, context: { params: any }) {
  try {
    const { partyId } = context.params; // Access the dynamic route parameter

    if (!partyId) {
      return NextResponse.json(
        { error: "Missing partyId in the request." },
        { status: 400 }
      );
    }

    const partyMembers = await prisma.rSVP.findMany({
      where: { partyId },
    });

    return NextResponse.json(partyMembers, { status: 200 });
  } catch (error) {
    console.error("Error fetching party members:", error);
    return NextResponse.json(
      { error: "Failed to fetch party members." },
      { status: 500 }
    );
  }
}
