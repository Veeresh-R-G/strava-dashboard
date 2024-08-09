
import prisma from "@/db";
import axios from "axios";


import TwilioService from "@/util/twilio";
const twilioService = new TwilioService();



interface RUNNER{
    athlete_id: number,
    athlete_name: string,
    total_kilometers: number,
    photoUrl: string,
    bio: string,
    accessToken: string,
    refreshToken: string,
    expiresAt: number,
    phNumber: string
}

const fetchAthleteActivities = async (
    runner : any,
    accessToken : string,
    before: Number,
    after: Number,
    page: Number
  ) => {
    try {
      const response = await axios.get(
        `https://www.strava.com/api/v3/athlete/activities?before=${before}&after=${after}&page=${page}&per_page=200`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
  
      if (response.status === 200) {
        console.log("Fetched athlete activities:", response.data);
  
        let totalDistance = 0;
        let activities = response.data;
        activities.forEach((activity : any) => {
          if (
            activity.type === "Run" ||
            activity.type === "Walk" ||
            activity.type === "Hike"
          ) {
            totalDistance += activity.distance;
          }
        });
        
        const prev_leaderboard = await prisma.runner.findMany({
          orderBy:{
            total_kilometers : 'desc'
          }
        });
    
        const athlete = prev_leaderboard.find((runner) => runner.athelete_id === runner.athelete_id);
     
        await prisma.runner.update({
          where: { id: runner.athlete_id },
          data: {
            total_kilometers : totalDistance,
          },
        });
    
        console.log("Runner updated successfully 🎆");
        
    
        const new_leaderboard = await prisma.runner.findMany({
          orderBy:{
            total_kilometers: 'desc'
          }
        })
       
        const new_athlete = new_leaderboard.find((runner) => runner.athelete_id === runner.athelete_id);
       
        const oldRank = athlete ? prev_leaderboard.indexOf(athlete) : -1;
        const newRank =  new_athlete ? new_leaderboard.indexOf(new_athlete) : -1;
        
    
        if(oldRank !== -1 && newRank !== -1 && oldRank !== newRank && newRank < oldRank){
    
          for (let index = newRank + 1; index <= oldRank ; index++) {
            
            const phone = new_leaderboard[index].phNumber;
    
            if(phone === "" || phone === null || phone === undefined){
              continue;
            }
    
              twilioService.sendWhatsappMessage(runner.athlete_name, phone)
            console.log(`Message sent to ${phone}`);
          }
        }

        

        console.log("ACTIVITIES UPDATING");
      }
    } catch (error) {
      console.error(
        "Error fetching athlete activities:");
    }
  };


const refreshToken = async (runner : any) => {
    try {
      const response = await axios.post(
        "https://www.strava.com/oauth/token",
        null,
        {
          params: {
            client_id: "125102",
            client_secret: "baf7f62b9ccc8636309d04404f9673f3c8bc9f95",
            grant_type: "refresh_token",
            refresh_token: runner.refreshToken,
          },
        }
      );
  
      if (response.status === 200) {
        const { access_token, refresh_token, expires_at } = response.data;
        console.log(
          `New access token for runner ${runner.athlete_id}: ${access_token}`
        );
  
        await prisma.runner.update({
          where: { id: runner.athlete_id },
          data: {
            accessToken: access_token,
            refreshToken: refresh_token,
            expiresAt: expires_at,
          },
        });
        
        console.log("ACCESS TOKEN RETURNING");
        
        return access_token;
      }
    } catch (error) {
      console.error(
        `Error refreshing token for runner ${runner.athlete_id}:`);
    }
  };


export const dynamic = "force-dynamic";
export async function GET(){
    const runners = await prisma.runner.findMany();
  const now = Math.floor(Date.now() / 1000);
    const date = new Date();
  const before =
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime() / 1000;
  const after =
    Math.trunc(
      new Date(date.getFullYear(), date.getMonth(), 1).getTime() / 1000
    ) - 60;
  const page = 1;

  for (const runner of runners) {
    if (runner.expiresAt <= now) {
      const newAccessToken = await refreshToken(runner);
      if (newAccessToken) {
        await fetchAthleteActivities(
          runner,
          newAccessToken,
          before,
          after,
          page
        );
      }
    } else {
      await fetchAthleteActivities(
        runner,
        runner.accessToken,
        before,
        after,
        page
      );
    }
  }


  return Response.json({ 'message' : "Runner updated successfully", status: 200 });
}