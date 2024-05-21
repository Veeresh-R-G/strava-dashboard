'use client'
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import useAuth from "../util/useAuth"
import axios, { AxiosResponse } from 'axios';

export default function Home({authCode}: {authCode: string}){
  let distance : number = 0
  const authInfo: any = useAuth(authCode) as unknown as any
  console.log(authInfo)
  let name : string = authInfo?.athlete.firstname + " " + authInfo?.athlete.lastname[0] + "."
  console.log(name)

  const accessToken: string = authInfo?.access_token
  console.log(accessToken)
  // const [athleteData, setAtheleteData] = useState()

  useEffect(() => {
      if (!accessToken) return
      const fetchAthleteActivities = async () => {
        let page = 1
        let date = new Date()

        // Cannot be exact current timestamp
        let after: number = (Math.trunc(new Date(date.getFullYear(), date.getMonth() , 1).getTime() / 1000)) - 60 // one min before
        //let after: number = new Date(date.getFullYear(), date.getMonth() - 1, 1).getTime()/1000
        let before: number = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime()/1000
        console.log(after, before)
        try{
          const res = await axios.get(`https://www.strava.com/api/v3/athlete/activities?before=${before}&after=${after}&page=${page}&per_page=100`,
            {
              headers: {'Authorization': `Bearer ${accessToken}`}
            }
          ).then(res => { 
              console.log(res.data)
              const activities = res.data;
              let totalDistance = 0;

              activities.forEach((activity: any) => {
                if (activity.type === 'Run' || activity.type === 'Walk' || activity.type === 'Hike') {
                  totalDistance += activity.distance;
                }
              });
              console.log('Total Distance:', totalDistance);

              const res1  = axios.put("http://localhost:3000/api/cron", {
                    name: name,
                    distance: totalDistance
                  }).then((res) => {
                    console.log(res)
                  }).catch((err) => {
                    console.error("Error updating distance", err.re)
                  })

              
              
              //TODO: Update DB with aggregated data
          })
        }catch(error){
          console.error("Error fetching athlete data", error)
        }
        }

      const data = fetchAthleteActivities()
      console.log(data)
  }, [accessToken])

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      {name}
      {accessToken}
      <button onClick={() => window.location.href = '/leaderboard'}>Group Leaderboard</button>
    </div>
  );
}

