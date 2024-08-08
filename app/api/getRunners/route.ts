import prisma from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import {Twilio} from "twilio"

interface Runner {
  athelete_id: number,
  name: string,
  distance: number,
  photoURL: string,
  bio: string
}


const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


export async function PUT(req : NextRequest, res : NextResponse) { // Add the 'Request' type as a parameter
  try {
  
    const {
      athelete_id,
      name,
      distance,
      photoURL,
      bio,
      phone
    } = await req.json();

    try{
    
      const runner = await prisma.runner_dev.findFirst({
              where: {
          athelete_id: athelete_id}
        });     

    if(!runner){
        const resp = await prisma.runner_dev.create({
          data: {
            athelete_id: athelete_id,
            athelete_name: name,
            total_kilometers: distance,
            photoUrl: photoURL,
            bio: bio,
            phone: phone
          }
        })
        return Response.json({ 'message' : "Runner created successfully", 'runner' : resp, status: 204 });
    }

    const prev_leaderboard = await prisma.runner_dev.findMany({
      orderBy:{
        total_kilometers : 'desc'
      }
    });

    const athlete = prev_leaderboard.find((runner) => runner.athelete_id === athelete_id);
    console.log("Athlete: ", athlete);
    

    const resp = await prisma.runner_dev.update({
      where: {
        athelete_id: athelete_id
      },
      data:{
        total_kilometers: distance,
      }
    })

    console.log("Runner updated successfully 🎆");
    

    const new_leaderboard = await prisma.runner_dev.findMany({
      orderBy:{
        total_kilometers: 'desc'
      }
    })
   
    const new_athlete = new_leaderboard.find((runner) => runner.athelete_id === athelete_id);
   
    const oldRank = athlete ? prev_leaderboard.indexOf(athlete) : -1;
    const newRank =  new_athlete ? new_leaderboard.indexOf(new_athlete) : -1;
   
    if(oldRank !== -1 && newRank !== -1 && oldRank !== newRank && newRank < oldRank){

      for (let index = newRank + 1; index <= oldRank ; index++) {
        
        const phone = new_leaderboard[index].phone;

        if(phone === "" || phone === null || phone === undefined){
          continue;
        }

        client.messages
          .create({
            body: `You have been overtaken by ${name} in the leaderboard. Keep running 🏃‍♂️🏃‍♂️🏃‍♂️`,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:+91${phone}`
            })
            .then(message => console.log(message.sid))
            .catch(err => console.log(err));
          
        console.log(`Message sent to ${phone}`);
      }
    }
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

  