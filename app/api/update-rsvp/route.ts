import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const updatedRSVPs = await req.json(); // Parse the JSON body

    // Ensure the request body is an array
    if (!Array.isArray(updatedRSVPs)) {
      return NextResponse.json(
        { error: "Request body must be an array of RSVP data." },
        { status: 400 }
      );
    }

    // Update each RSVP in the database
    const updatePromises = updatedRSVPs.map((rsvp) =>
      prisma.rSVP.update({
        where: { id: rsvp.id },
        data: {
          firstName: rsvp.firstName,
          lastName: rsvp.lastName,
          email: rsvp.email,
          going: rsvp.going,
          notes: rsvp.notes,
        },
      })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ message: "RSVPs updated successfully!" });
  } catch (error) {
    console.error("Error updating RSVPs:", error);
    return NextResponse.json(
      { error: "Failed to update RSVPs." },
      { status: 500 }
    );
  }
}
