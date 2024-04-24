/* eslint-disable react-hooks/exhaustive-deps */
// Leaderboard.tsx
'use client'
import Navbar from '@/components/navbar'; // Import the Navbar component
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface MyObject {
  name: string;
  value: number;
}



const Leaderboard: React.FC = () => {
  const [data, setData] = useState<MyObject[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/get_stuff")
      .then((res) => {
        let temp: MyObject[] = [];
        for (const [name, value] of Object.entries(res.data?.data)) {

          // Create an object with keys "name" and "value"
          let tempVal: number = 0
          if (value as number > 1) {
            tempVal = value as number
          }
          const obj = {
            name: name,
            // Type assertion to specify 'value' as number
            value: tempVal / 1000
          };
          temp.push(obj)
        }
        temp.sort((a: MyObject, b: MyObject) => {
          return b.value - a.value
        })

        setData(temp)
      })
      .catch((err) => {
        console.log("Error Fetching the data : ", err);

      })
  }, []);

  return (
    <div>
      <Navbar />
      {data.length === 0 ?
        <div className='flex items-center justify-center'>
          <div className=''>
            {/* Table Headers */}
            <div className='flex'>
              <div className='py-5 bg-gray-100/60 p-2 pl-10 text-xs md:text-base border border-t-0 border-r-0 border-l-0 border-gray-300'>#</div>
              <div className='py-5 bg-gray-100/60 w-20 text-xs md:text-base md:pl-10 md:w-48 border border-t-0 border-r-0 border-l-0 border-gray-300'>Name</div>
              <div className='py-5 bg-gray-100/60 w-20 text-xs text-center md:text-base md:pl-10 md:w-48 border border-t-0 border-r-0 border-l-0 border-gray-300'>Distance</div>
            </div>

            {/* Table content */}
            <div className=''>
              {data?.map((item: any, index: any) => {
                return (

                  <div key={index} className='flex'>
                    {/* {JSON.stringify(item)} */}
                    <div className='bg-gray-100/60 p-2 pl-10 border text-xs md:text-base border-t-0 border-r-0 border-l-0 border-gray-300'>{index + 1}.</div>
                    <div className='bg-gray-100/60 w-20 text-xs md:text-base md:pl-10 md:w-48 border border-t-0 border-r-0 border-l-0 border-gray-300'>{item.name}</div>
                    <div className='bg-gray-100/60 w-20 text-xs text-center md:text-base md:pl-10 md:w-48 border border-t-0 border-r-0 border-l-0 border-gray-300'>{String(item.value).slice(0, 5)}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div> : <div>
          Loading
        </div>}
    </div>
  );
};

export default Leaderboard;
