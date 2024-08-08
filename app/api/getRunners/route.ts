import prisma from '@/db';
import { NextRequest, NextResponse } from 'next/server';


interface Runner {
  athelete_id: number,
  name: string,
  distance: number,
  photoURL: string,
  bio: string,
  accessToken: string,
  refreshToken: string,
  expiresAt: number,
  phNumber: string
}

export async function PUT(req : NextRequest, res : NextResponse) { // Add the 'Request' type as a parameter
  try {
    console.log("entering")
    const {
      athelete_id,
      name,
      distance,
      photoURL,
      bio,
      accessToken,
      refreshToken,
      expiresAt,
      phNumber
    } = await req.json();

    console.log("hi")
    try{
      const runner = await prisma.runner.findFirst({
              where: {
          athelete_id: athelete_id}
        });     

    if(!runner){
        console.log("Creating new runner");
        const resp = await prisma.runner.create({
          data: {
            athelete_id: athelete_id,
            athelete_name: name,
            total_kilometers: distance,
            photoUrl: photoURL,
            bio: bio,
            accessToken: accessToken,
            refreshToken: refreshToken,
            expiresAt: expiresAt,
            phNumber: phNumber
          }
        })
        return Response.json({ 'message' : "Runner created successfully", 'runner' : resp, status: 204 });
    }

    

    const resp = await prisma.runner.update({
      where: {
        athelete_id: athelete_id
      },
      data:{
        total_kilometers: distance,
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresAt: expiresAt
      }
    })

    return Response.json({ 'message' : "Runner updated successfully", 'runner' : resp, status: 204 });
    
     
    } catch (err : any) {
      console.error('Error updating runners:', err.response.data);
      return NextResponse.json({ 'message' : "Error updating runner !!!!", 'error' : err.response.data });
    }
  } catch (err : any) {
    console.error('Error updating runners:', err.response.data);
    return NextResponse.json({ 'message' : "Error updating runner !!!!", 'error' : err.response.data });
  }
};

  