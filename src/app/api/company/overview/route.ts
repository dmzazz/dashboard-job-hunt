import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(request: Request) {
  // Get session
  const session = await getServerSession(authOptions);
  if (!session?.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const companies = await prisma.companyOverview.findMany({
    where: {
      Company: {
        email: session.user.email,
      },
    },
    select: {
      id: true,
      name: true,
      image: true,
      website: true,
      location: true,
      employee: true,
      industry: true,
      dateFounded: true,
      techStack: true,
      description: true,
      companyId: true,
    },
  });

  return NextResponse.json(companies, { status: 200 });
}

export async function POST(request: Request) {
  const data = await request.json();

  const profile = await prisma.companyOverview.findFirst({
    where: {
      companyId: data.companyId,
    },
  });

  const result = await prisma.companyOverview.upsert({
    where: {
      companyId: data.companyId,
      id: profile?.id || "",
    },
    update: data,
    create: data,
  });

  return NextResponse.json(result);
}
