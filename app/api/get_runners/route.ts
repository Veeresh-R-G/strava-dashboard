
import prisma from '@/db';
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";
export async function GET(){
    try{

      const resp = await prisma.runner.findMany({
        orderBy:{
          total_kilometers: 'desc'
        },
        //BFF - Backend for Frontend - Only send the required data to the client
        select:{
          athelete_name: true,
          total_kilometers: true,
          photoUrl: true
        }
      })
      
      return NextResponse.json({"data" : resp ,"message":"All Runners data fetched ✅"}, {status:200})
  }
  catch (error: any) {
      console.log('Error fetching data:', error);
    }
}

