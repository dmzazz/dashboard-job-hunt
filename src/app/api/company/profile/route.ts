import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET() {
    const result = await prisma.company.findMany({
        include: {
            CompanyOverview: {
                select: {
                    website: true
                }
            }
        }
    })
    
    return NextResponse.json(result)
}