import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { fullName } = await req.json();

    if (!fullName || typeof fullName !== "string") {
      return NextResponse.json(
        { message: "Invalid full name provided." },
        { status: 400 }
      );
    }

    const [firstName, ...lastNameParts] = fullName.trim().split(" ");
    const lastName = lastNameParts.join(" ");

    if (!firstName || !lastName) {
      return NextResponse.json(
        { message: "Please enter both first and last name." },
        { status: 400 }
      );
    }

    // Case-insensitive search using Prisma
    const rsvp = await prisma.RSVP.findFirst({
      where: {
        AND: [
          { firstName: { equals: firstName, mode: "insensitive" } },
          { lastName: { equals: lastName, mode: "insensitive" } },
        ],
      },
    });

    if (!rsvp) {
      return NextResponse.json({ message: "RSVP not found." }, { status: 404 });
    }

    return NextResponse.json(rsvp, { status: 200 });
  } catch (error) {
    console.error("Error retrieving RSVP:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
