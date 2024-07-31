import prisma from '@/db';
import { NextRequest, NextResponse } from 'next/server';


export async function PUT(req : NextRequest) { // Add the 'Request' type as a parameter
  try {
  
    const d = await req.json();
    console.log(d);
    
    const updatedRunner = await prisma.runner.update({
      where: { athelete_name: d?.name },
      data: { total_kilometers : d?.distance },
    });
    // console.log(updatedRunner);
    
    return NextResponse.json({ 'message' : "Runner Updated Successfully !!!!", 'updated_runner' : updatedRunner });


  } catch (err : any) {
    console.error('Error updating runners:', err.response.data);
    return NextResponse.json({ 'message' : "Error updating runner !!!!", 'error' : err.response.data });
  }
};

  