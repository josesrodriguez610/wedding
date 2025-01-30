import prisma from "@/app/lib/db/db";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// Fetch all RSVP groups
export async function GET() {
  const users = await prisma.rSVP.findMany({
    orderBy: { lastName: "asc" },
  });

  // Define the correct type for the accumulator
  const groupedParties = users.reduce<Record<string, (typeof users)[number][]>>(
    (acc, user) => {
      const partyKey = user.partyId ?? "unknown"; // Ensure it's always a string

      if (!acc[partyKey]) acc[partyKey] = [];
      acc[partyKey].push(user);
      return acc;
    },
    {}
  );

  return NextResponse.json(groupedParties);
}

// Create a new party or add a user to an existing party
export async function POST(req: NextRequest) {
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
    partyId,
  } = await req.json();

  // If no partyId is provided, create a new party
  const newPartyId = partyId || uuidv4();

  const newUser = await prisma.rSVP.create({
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
      partyId: newPartyId,
    },
  });

  return NextResponse.json(newUser);
}

// Update a user in a party
export async function PUT(req: NextRequest) {
  const { id, firstName, lastName, email, address, notes, going } =
    await req.json();
  const updatedUser = await prisma.rSVP.update({
    where: { id },
    data: { firstName, lastName, email, address, notes, going },
  });

  return NextResponse.json(updatedUser);
}

// Delete a user
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  await prisma.rSVP.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
