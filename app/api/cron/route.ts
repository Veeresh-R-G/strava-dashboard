import axios, {AxiosResponse} from 'axios';
import getAccessToken from "@/util/access_token"
import prisma from '@/db';
import { NextRequest, NextResponse } from 'next/server';


export async function PUT(req : NextRequest) { // Add the 'Request' type as a parameter
  try {
    
    // console.log(accessToken);
    const d = await req.json();
    console.log(d);
    
    const updatedRunner = await prisma.runner.update({
      where: { athelete_name: d?.name },
      data: { total_kilometers : d?.distance },
    });

    console.log('Updated runner:', updatedRunner);
    
  
    return NextResponse.json({ 'request' : d, 'response' : updatedRunner });


  } catch (err : any) {
    console.error('Error updating runners:', err.response.data);

    // Return an error response
    return Response.error();
  }
};

  