import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  context: { params: { partyId: string } }
) {
  try {
    // Await the resolution of params
    const params = await context.params;
    const partyId = params.partyId;

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
