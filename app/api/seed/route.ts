import prisma from "@/db";
import data from "@/data/club_member.json"

interface DataSchema {

    resource_state : number,
    firstname: string,
    lastname: string,
    membership:string
    admin:boolean,
    owner:boolean
}

export function GET(){
    
    
   
    try{
    
     data.map( async (item : DataSchema) => {
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

        return Response.json({"message":"All Runners data seeded ✅"})
    
    } catch(err){
        return Response.json({"Message": "Error while seeding"})
    }
}