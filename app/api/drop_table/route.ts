
import prisma from '@/db';
import { NextRequest } from 'next/server';

export const dynamic = "force-dynamic";
export async function GET(req : NextRequest){

    const {token, tableName} = await req.json();

    if (token !== process.env.NEXT_PUBLIC_DROP_TABLE_TOKEN){
        return Response.json({message: "Not Authorized, macha, have some shame !!!!"})
    }
     
   await prisma.$queryRaw`DROP TABLE ${tableName} IF EXISTS`;

    return Response.json({message: `${tableName} Table Dropped Successfully`}, {status: 200})
}