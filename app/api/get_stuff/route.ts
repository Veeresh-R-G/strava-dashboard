
import prisma from '@/db';


export async function GET(){
    try{

      console.log("/get_stuff");
      
      const resp = await prisma.runner.findMany()
      
      console.log(resp);
      
      return Response.json({"data" : resp, "message":"All Runners data fetched ✅"})
  }
  catch (error: any) {
      console.log('Error fetching data:', error);
    }
}

