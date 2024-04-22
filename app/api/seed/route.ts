import prisma from "@/db";
import data from "@/data/club_member.json"

export function GET(){
    
 
    try{
    
     data.map(async (item, index) => {
         await prisma.runner.create({
             data:{
                 athelete_id: 1,
                 athelete_name: item.firstname + " " + item.lastname,
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