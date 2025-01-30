import prisma from "@/app/lib/db/db";
import { NextRequest, NextResponse } from "next/server";

// Update a user in a party (PUT /api/rsvp/:id)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function PUT(req: NextRequest, context: { params: any }) {
  const { id } = await context.params; // Get user ID from URL
  const {
    firstName,
    lastName,
    email,
    address,
    city,
    state,
    zipcode,
    phone,
    notes,
    going,
  } = await req.json();

  try {
    const updatedUser = await prisma.rSVP.update({
      where: { id: Number(id) }, // Ensure ID is a number
      data: {
        firstName,
        lastName,
        email,
        address,
        city,
        state,
        zipcode,
        phone,
        notes,
        going,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error); // ✅ Log the error for debugging

    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}

// Delete a user (DELETE /api/rsvp/:id)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function DELETE(req: NextRequest, context: { params: any }) {
  const { id } = await context.params; // Get user ID from URL

  try {
    await prisma.rSVP.delete({ where: { id: Number(id) } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error); // ✅ Log the error for debugging
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}
