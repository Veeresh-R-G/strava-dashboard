import prisma from "@/db";
import data from "@/data/club_member.json"
import { randomUUID } from "crypto";

export function GET(){
    
    
    let c = 1
    try{
    
     data.map(async (item, index) => {
         await prisma.runner.create({
             data:{
                 athelete_id: c++,
                 athelete_name: item.firstname + " " + item.lastname + crypto.randomUUID().slice(0,11),
                 strava_profile: "hola",
                 total_kilometers: 0,
                 photoUrl: "pikachu"     
                }
            })
        })
    } catch(err){
        return Response.json({"Message": "Error while seeding"})
    }

    return Response.json({"message":"All Runners data seeded ✅"})
        
}