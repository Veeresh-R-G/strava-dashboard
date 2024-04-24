import prisma from "@/db";

export async function GET(){
    const resp = await prisma.metadata.create({
        data:{
            "previous_activities": 100,
            "total_distance": 345.97
        }
    })

    // console.log(resp);
    return Response.json({"message": "Inserted Properly"})
    
}