
import prisma from '@/db';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req : NextRequest, res : NextResponse){
    try{

      console.log("/get_stuff");
      
      const resp = await prisma.runner.findMany()
      
      console.log(resp);
      
      return NextResponse.json({"data" : resp ,"message":"All Runners data seeded ✅"}, {status:200})
  }
  catch (error: any) {
      console.log('Error fetching data:', error);
    }
}

