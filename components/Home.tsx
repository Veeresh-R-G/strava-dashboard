'use client'
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/navbar';
import useAuth from "../util/useAuth"
import axios, { AxiosResponse } from 'axios';

export default function Home({authCode}: {authCode: string}){
  const authInfo: any = useAuth(authCode) as unknown as any
  console.log(authInfo)

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
      {accessToken}
    </div>
  );
}

