import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(request: Request) {
  try {
    // Get session
    const session = await getServerSession(authOptions);

    // Check if email exist
    if (!session?.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Retrieve data based on the users email
    const result = await prisma.company.findMany({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        CompanyOverview: true,
        CompanySocialMedia: true,
        CompanyTeam: true,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch companies" },
      { status: 500 },
    );
  }
}
