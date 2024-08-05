/* eslint-disable react-hooks/exhaustive-deps */
// Leaderboard.tsx
'use client'
import Navbar from '@/components/navbar'; // Import the Navbar component
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface MyObject {
  name: string;
  value: number;
  photo: string;
}

interface ResponseObject {

  id: number,
  athelete_id: number,
  athelete_name: string,
  strava_profile: string,
  total_kilometers: string,
  photoUrl: string

}


const Leaderboard: React.FC = () => {
  const [data, setData] = useState<MyObject[]>([]);

  useEffect(() => {
    axios.get("/api/get_stuff/", {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
      .then((res) => {

        res.status === 200 && toast.success("Data Fetched Successfully 🎉");

        let temp: MyObject[] = [];

        res?.data?.data.forEach((element: ResponseObject) => {
          // console.log(element.athelete_name, element.total_kilometers);
          temp.push({ name: element.athelete_name, value: Number(element.total_kilometers) / 1000, photo: element.photoUrl });
        });



        temp.sort((a: MyObject, b: MyObject) => {
          return b.value - a.value
        })

        setData(temp)
      })
      .catch((err) => {
        console.log("Error Fetching the data : ", err);
      })
  }, []);


  // console.log(data);

  return (
    <div className='' suppressHydrationWarning={true}>
      <Navbar />
      {/* {JSON.stringify(data)} */}
      {data.length !== 0 ?

        <div className='mt-4 flex items-center justify-center'>

          <div className=''>
            {/* Table Headers */}
            <div className='flex'>
              <div className='py-5 bg-gray-100/60 p-2 pl-10 text-xs md:text-base border border-t-0 border-r-0 border-l-0 border-gray-300'>#</div>
              <div className='py-5 bg-gray-100/60 w-20 text-xs md:text-base md:pl-10 md:w-48 border border-t-0 border-r-0 border-l-0 border-gray-300'>Name</div>
              <div className='py-5 bg-gray-100/60 w-20 text-xs md:text-base md:pl-10 md:w-48 border border-t-0 border-r-0 border-l-0 border-gray-300'></div>
              <div className='py-5 bg-gray-100/60 w-20 text-xs text-center md:text-base md:pl-10 md:w-48 border border-t-0 border-r-0 border-l-0 border-gray-300'>Distance</div>
            </div>

            {/* Table content */}
            <div className=''>
              {data?.map((item: MyObject, index: any) => {
                return (

                  <div key={index} className='flex'>
                    {/* {JSON.stringify(item)} */}
                    <div className='bg-gray-100/60 p-2 pl-10 border text-xs md:text-base border-t-0 border-r-0 border-l-0 border-gray-300'>{index + 1}.</div>
                    <div className='bg-gray-100/60 w-20 text-xs md:text-base md:pl-10 md:w-48 border border-t-0 border-r-0 border-l-0 border-gray-300 py-2'>{item.name}</div>
                    <div className='bg-gray-100/60 w-20 text-xs md:text-base md:pl-10 md:w-48 border border-t-0 border-r-0 border-l-0 border-gray-300 py-2 flex justify-center'>
                      <Image src={item.photo} alt="photo" width={40} height={40} className='rounded-full' />
                    </div>
                    <div className='bg-gray-100/60 w-20 text-xs text-center md:text-base md:pl-10 md:w-48 border border-t-0 border-r-0 border-l-0 border-gray-300 py-2'>{String(item.value).slice(0, 5)}</div>
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
