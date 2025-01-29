import prisma from "@/app/lib/db/db";
import { NextResponse } from "next/server";

// Update a user in a party (PUT /api/rsvp/:id)
export async function PUT(req, { params }) {
  const { id } = await params; // Get user ID from URL
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
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}

// Delete a user (DELETE /api/rsvp/:id)
export async function DELETE(req, { params }) {
  const { id } = await params; // Get user ID from URL

  try {
    await prisma.rSVP.delete({ where: { id: Number(id) } });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
}
