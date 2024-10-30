import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

// delete user
export async function DELETE(request: Request) {
  const data = await request.json();

  const result = await prisma.company.delete({
    where: {
      id: data.id,
    },
  });

  return NextResponse.json(result);
}
