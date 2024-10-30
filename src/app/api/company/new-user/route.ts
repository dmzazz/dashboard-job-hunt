import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { hashPassword } from "@/lib/utils";

// create user company
export async function POST(request: Request, response: Response) {
  const data = await request.json();

  const hashedPassword = await hashPassword(data.password);

  const result = await prisma.company.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  return NextResponse.json(result);
}
