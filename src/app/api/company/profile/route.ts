import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET() {
  try {
    const result = await prisma.company.findMany({
      include: {
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
