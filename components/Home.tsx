'use client'

import { CircularProgress } from "@nextui-org/progress";
import 'react-circular-progressbar/dist/styles.css';

import React, { useEffect } from 'react';
import Navbar from '@/components/navbar';
import useAuth from "../util/useAuth"
import axios from 'axios';


export default function Home({ authCode }: { authCode: string }) {

  const [distance, setDistance] = React.useState(20)

  //Get Auth Info
  console.log(authCode);

  const authInfo: any = useAuth(authCode)
  console.log(authInfo)

  //Setting the Name
  const firstName = authInfo?.athlete?.firstname ? authInfo?.athlete?.firstname : "<FirstName>"
  const lastName = authInfo?.athlete?.lastname ? authInfo?.athlete?.lastname : "<LastName>"
  let name: string = firstName + " " + lastName


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
          setDistance(totalDistance / 1000)

          localStorage.setItem("bel_bullets_name", name);
          axios.put("/api/cron", {

            athelete_id: Number(authInfo?.athlete?.id),
            name: name,
            distance: totalDistance,
            photoURL: authInfo?.athlete?.profile,
            bio: authInfo?.athlete?.bio
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

  }, [accessToken, authInfo?.athlete?.bio, authInfo?.athlete?.id, authInfo?.athlete?.profile, firstName, lastName, name])

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center">
        <div>
          <div className="font-semibold text-xl">
            Welcome to your Profile
          </div>
          <br />
          <div className="flex justify-center items-center">
            <CircularProgress
              classNames={{
                svg: "w-36 h-36",
                indicator: "bg-blue-700",
                track: "bg-blue-200",
                value: "text-2xl font-semibold text-blue-700",
              }}
              value={distance}
              strokeWidth={4}
              showValueLabel={true}
            />
          </div>
          <div>
            <div>--- {localStorage.getItem("bel_bullets_name")} ---</div>
            <div>
              Distance Convered : {distance} kms (approx)
            </div>
          </div>
          <div>
            <button className='p-3 bg-black text-white rounded-xl' onClick={() => window.location.href = '/leaderboard'}>Group Leaderboard</button>
          </div>
        </div>
      </div>
    </div>
  );
}

