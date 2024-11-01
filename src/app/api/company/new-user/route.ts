import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { hashPassword } from "@/lib/utils";

// create user company
export async function POST(request: Request) {
  const data = await request.json();

  // check if password and confirm password match
  if (data.password !== data.confirmPassword) {
    return NextResponse.json({ error: "Password and confirm password do not match" }, { status: 400 });
  }

  // check if email already exists
  const checkEmail = await prisma.company.findUnique({
    where: { email: data.email },
  });

  if (checkEmail) {
    return NextResponse.json({ error: "Email already exists" }, { status: 400 });
  }

  // hash password
  const hashedPassword = await hashPassword(data.password);

  try {
    const result = await prisma.company.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "please try again" }, { status: 500 });
  }
}