
import prisma from '@/db';


export async function GET(){
    try{
      const resp = await prisma.runner.findMany()
      
      console.log(resp);
      
      return Response.json({"data" : resp})
  }
  catch (error: any) {
      console.log('Error fetching data:', error);
    }
}

