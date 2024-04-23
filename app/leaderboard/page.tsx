/* eslint-disable react-hooks/exhaustive-deps */
// Leaderboard.tsx
'use client'
import Navbar from '@/components/navbar'; // Import the Navbar component
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

const Leaderboard: React.FC = () => {
  const [data, setData] = useState<any>([])

  useEffect(() => {
    axios.get("http://localhost:3000/api/get_stuff")
      .then((res) => {
        let temp: any = []
        for (const [name, value] of Object.entries(res.data?.data)) {

          // Create an object with keys "name" and "value"
          let tempVal: number = 0
          if (value as number > 1) {
            tempVal = value as number
          }
          const obj = {
            name: name,
            // Type assertion to specify 'value' as number
            value: tempVal
          };
          temp.push(obj)
        }

        setData(temp)
      })
      .catch((err) => {
        console.log("Error Fetching the data : ", err);

      })
  }, []);


  data.sort((a: any, b: any) => {
    b["value"] - a["value"]
  })

  console.log(data);

  return (
    <div>
      <Navbar />
      {data ?
        <div className=''>
          <div className='grid grid-cols-2'>
            <div>Name</div>
            <div>Distance</div>
          </div>
          <div className=''>
            {data?.sort((a: any, b: any) => {
              b["value"] - a["value"]
            }).map((item: any, index: any) => {
              return (

                <div key={index} className='grid grid-cols-2'>
                  {/* {JSON.stringify(item)} */}
                  <div>{item.name}</div>
                  <div>{item.value}</div>
                </div>
              )
            })}
          </div>
          {/* {JSON.stringify(data)} */}
        </div> : <div>
          Loading
        </div>}
    </div>
  );
};

export default Leaderboard;
