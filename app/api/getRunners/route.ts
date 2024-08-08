import prisma from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import {Twilio} from 'twilio';



const client = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


export async function PUT(req : NextRequest, res : NextResponse) { // Add the 'Request' type as a parameter
  try {
   
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

    const prev_leaderboard = await prisma.runner.findMany({
      orderBy:{
        total_kilometers : 'desc'
      }
    });

    const athlete = prev_leaderboard.find((runner) => runner.athelete_id === athelete_id);
 

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

    console.log("Runner updated successfully 🎆");
    

    const new_leaderboard = await prisma.runner.findMany({
      orderBy:{
        total_kilometers: 'desc'
      }
    })
   
    const new_athlete = new_leaderboard.find((runner) => runner.athelete_id === athelete_id);
   
    const oldRank = athlete ? prev_leaderboard.indexOf(athlete) : -1;
    const newRank =  new_athlete ? new_leaderboard.indexOf(new_athlete) : -1;
    
    console.log("Old Rank: ", oldRank);
    console.log("New Rank: ", newRank);
    

    if(oldRank !== -1 && newRank !== -1 && oldRank !== newRank && newRank < oldRank){

      for (let index = newRank + 1; index <= oldRank ; index++) {
        
        const phone = new_leaderboard[index].phNumber;

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

  