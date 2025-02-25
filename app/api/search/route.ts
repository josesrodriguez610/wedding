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

    const nameParts = fullName.trim().split(/\s+/); // Split name into words

    if (nameParts.length < 2) {
      return NextResponse.json(
        { message: "Please enter both first and last name." },
        { status: 400 }
      );
    }

    const possibleNames = [];

    // Case 1: First word as first name, rest as last name
    possibleNames.push({
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(" "),
    });

    // Case 2: First two words as first name, rest as last name (if enough words exist)
    if (nameParts.length > 2) {
      possibleNames.push({
        firstName: nameParts.slice(0, 2).join(" "), // e.g., "Laura Lee"
        lastName: nameParts.slice(2).join(" "), // e.g., "Tharp"
      });
    }

    // Case 3: First name is everything except the last word, last name is the last word
    if (nameParts.length > 2) {
      possibleNames.push({
        firstName: nameParts.slice(0, -1).join(" "), // e.g., "Laura Lee"
        lastName: nameParts[nameParts.length - 1], // e.g., "Tharp"
      });
    }

    // Search for any of these possible name combinations in a case-insensitive way
    const rsvp = await prisma.rSVP.findFirst({
      where: {
        OR: possibleNames.map(({ firstName, lastName }) => ({
          AND: [
            { firstName: { equals: firstName, mode: "insensitive" } },
            { lastName: { equals: lastName, mode: "insensitive" } },
          ],
        })),
      },
    });

    if (!rsvp) {
      return NextResponse.json({ message: "RSVP not found." }, { status: 404 });
    }

    return NextResponse.json(rsvp, { status: 200 });
  } catch (error: unknown) {
    console.error("Error retrieving RSVP:", error);

    let errorMessage = "Internal server error.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
