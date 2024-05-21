import axios, {AxiosResponse} from 'axios';
import getAccessToken from "@/util/access_token"
import prisma from '@/db';
import { Request, Response } from 'express';


export async function PUT(req : Request , resp : Response) { // Add the 'Request' type as a parameter
  try {
    
    // console.log(accessToken);
    const data :any = req.body;
    console.log(data);
    const updatedRunner = await prisma.runner.update({
      where: { athelete_name: data.name },
      data: { total_kilometers : data.distance },
    });
    return resp.json("hello");
  } catch (err : any) {
    console.error('Error updating runners:', err.response.data);

    // Return an error response
    return Response.error();
  }
};

  