import prisma from "@/app/lib/db/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch RSVP counts by going status
    const rsvpCounts = await prisma.rSVP.groupBy({
      by: ["going"],
      _count: {
        going: true,
      },
    });

    // Get total number of users
    const totalUsers = await prisma.rSVP.count();

    // Ensure default values
    let goingCount = 0;
    let notGoingCount = 0;
    let noResponseCount = 0;

    rsvpCounts.forEach((r) => {
      if (r.going === true) goingCount = r._count.going;
      if (r.going === false) notGoingCount = r._count.going;
      if (r.going === null) noResponseCount = r._count.going;
    });

    // If Prisma does not return a `NULL` group, we set it manually
    noResponseCount = totalUsers - (goingCount + notGoingCount);

    // Format the response
    const formattedCounts = {
      Going: goingCount,
      "Not Going": notGoingCount,
      "No Response": noResponseCount,
      Total: totalUsers,
    };

    return NextResponse.json(formattedCounts);
  } catch (error) {
    console.error("Error fetching RSVP counts:", error);
    return NextResponse.json(
      { error: "Failed to fetch RSVP data" },
      { status: 500 }
    );
  }
}
