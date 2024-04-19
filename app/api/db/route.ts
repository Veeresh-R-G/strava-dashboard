import prisma from "@/db";

export async function GET(){
    const resp = await prisma.runner.findMany()
    return Response.json({
        "data": resp
    })
}