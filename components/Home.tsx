'use client'

import React, { useEffect } from 'react';

import axios from 'axios';
import toast from "react-hot-toast";
import { CircularProgress } from "@nextui-org/progress";
import { Spinner } from '@nextui-org/react';

import Navbar from '@/components/navbar';
import useAuth from "../util/useAuth"

import 'react-circular-progressbar/dist/styles.css';

export default function Home({ authCode }: { authCode: string }) {

  const [distance, setDistance] = React.useState(-1)
  const spinnerColors: string[] = ["primary", "secondary", "success", "warning"];

  //Get Auth Info
  const authInfo: any = useAuth(authCode)


  //Setting the Name
  // console.log("authinfo :", authInfo)
  const firstName: string = authInfo?.athlete?.firstname ? authInfo?.athlete?.firstname : "<FirstName>"
  const lastName: string = authInfo?.athlete?.lastname ? authInfo?.athlete?.lastname : "<LastName>"
  const name: string = firstName + " " + lastName


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
        // console.log(authInfo.refresh_token, authInfo.expires_at, authInfo.access_token)
        axios.get(`https://www.strava.com/api/v3/athlete/activities?before=${before}&after=${after}&page=${page}&per_page=100`,
          {
            headers: { 'Authorization': `Bearer ${accessToken}` }
          }
        ).then(res => {

          res.status === 200 && toast.success("Data fetched 🎉");
          const activities = res.data;
          let totalDistance = 0;

          activities.forEach((activity: any) => {
            if (activity.type === 'Run' || activity.type === 'Walk' || activity.type === 'Hike') {
              totalDistance += activity.distance;
            }
          });
          // console.log('Total Distance:', totalDistance);
          setDistance(totalDistance / 1000)

          localStorage.setItem("bel_bullets_name", name);
          axios.put("/api/update", {

            athelete_id: Number(authInfo?.athlete?.id),
            name: name,
            distance: totalDistance,
            photoURL: authInfo?.athlete?.profile ?? 'https://i.ibb.co/dbfxqvY/png-transparent-computer-icons-running-avatar-heroes-text-sport-removebg-preview.png',
            bio: authInfo?.athlete?.bio ?? "No bio available",
            accessToken: authInfo?.access_token,
            refreshToken: authInfo?.refresh_token,
            expiresAt: authInfo?.expires_at,
            phNumber: ""
          }).then((res) => {
            toast.success("Distance Updated")
          }).catch((err) => {
            console.error("Error updating distance", err.re)
          })
        })
      } catch (error) {
        console.error("Error fetching athlete data", error)
      }
    }

    fetchAthleteActivities()


  }, [accessToken, authInfo?.access_token, authInfo?.athlete?.bio, authInfo?.athlete?.id, authInfo?.athlete?.profile, authInfo?.expires_at, authInfo?.refresh_token, firstName, lastName, name])

  return (
    <div suppressHydrationWarning={true} className="min-h-screen bg-gray-100">
      <Navbar />


      <div className="flex items-center justify-center">
        {distance === -1 ?
          <div>
            <Spinner size='lg' label='Loading...' color={spinnerColors[Math.floor(Math.random() * spinnerColors.length)] as "primary" | "secondary" | "success" | "warning" | "current" | "white" | "default" | "danger" | undefined} />
          </div> :
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
              <div>{localStorage.getItem("bel_bullets_name")} </div>
              <div>
                Distance Convered : {distance} kms (approx)
              </div>
            </div>
            <div>
              <button className='p-2 text-sm md:text-md border-2 hover:bg-white hover:border-2 hover:border-orange-600 hover:text-orange-600 bg-orange-600 text-white rounded-xl' onClick={() => window.location.href = '/leaderboard'}>Group Leaderboard</button>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

