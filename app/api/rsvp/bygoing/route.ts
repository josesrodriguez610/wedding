import prisma from "@/app/lib/db/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const goingParam = url.searchParams.get("going");

    // Convert query param to boolean or null test
    let goingFilter: boolean | null = null;
    if (goingParam === "true") goingFilter = true;
    if (goingParam === "false") goingFilter = false;

    // Fetch RSVP records based on the filter
    const rsvpList = await prisma.rSVP.findMany({
      where: {
        going: goingFilter, // Filter by `true`, `false`, or `null`
      },
    });

    // Format response

    return NextResponse.json(rsvpList);
  } catch (error) {
    console.error("Error fetching RSVP data:", error);
    return NextResponse.json(
      { error: "Failed to fetch RSVP data" },
      { status: 500 }
    );
  }
}
