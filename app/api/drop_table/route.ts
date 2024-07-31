
import prisma from '@/db';
import { NextRequest } from 'next/server';

export async function GET(req : NextRequest){

    const {token} = await req.json();

    if (token !== process.env.NEXT_PUBLIC_DROP_TABLE_TOKEN){
        return Response.json({message: "Not Authorized, macha, have some shame !!!!"})
    }
     
    prisma.$queryRaw`DROP TABLE "Runner"`;

    return Response.json({message: "Table Dropped Successfully"})
}