'use client'
import React, { useEffect } from 'react';
import Navbar from '@/components/navbar';
import useAuth from "../util/useAuth"
import axios from 'axios';

export default function Home({ authCode }: { authCode: string }) {
  console.log("Auth Code: ", authCode);

  const authInfo: any = useAuth(authCode)
  console.log("Auth Info : ", authInfo)
  let name: string = authInfo?.athlete.firstname + " " + authInfo?.athlete.lastname[0] + "."


  const accessToken: string = authInfo?.access_token

  useEffect(() => {
    if (!accessToken) return
    const fetchAthleteActivities = async () => {
      let page = 1
      let date = new Date()

      // Cannot be exact current timestamp
      let after: number = (Math.trunc(new Date(date.getFullYear(), date.getMonth(), 1).getTime() / 1000)) - 60 // one min before

      let before: number = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime() / 1000

      try {
        axios.get(`https://www.strava.com/api/v3/athlete/activities?before=${before}&after=${after}&page=${page}&per_page=100`,
          {
            headers: { 'Authorization': `Bearer ${accessToken}` }
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

          axios.put("/api/cron", {
            name: name,
            distance: totalDistance
          }).then((res) => {
            console.log(res.data)
          }).catch((err) => {
            console.error("Error updating distance", err.re)
          })
        })
      } catch (error) {
        console.error("Error fetching athlete data", error)
      }
    }

    const data = fetchAthleteActivities()
    console.log(data)
  }, [accessToken, name])

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div>
        Welcome to your profile Page

      </div>
      {name}
      {accessToken}
      <button className='p-3 bg-black text-white rounded-xl' onClick={() => window.location.href = '/leaderboard'}>Group Leaderboard</button>
    </div>
  );
}

