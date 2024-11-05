import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

// create company team
export async function POST(request: Request) {
  const data = await request.json();

  try {
    const result = await prisma.companyTeam.create({
      data,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "please try again" }, { status: 500 });
  }
}
