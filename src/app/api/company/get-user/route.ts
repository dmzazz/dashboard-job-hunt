import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

// get user
export async function GET() {
  const result = await prisma.company.findMany();
  return NextResponse.json(result);
}