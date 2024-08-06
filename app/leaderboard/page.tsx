/* eslint-disable react-hooks/exhaustive-deps */
// Leaderboard.tsx
'use client'
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import toast from 'react-hot-toast';
import Image from 'next/image';

import Navbar from '@/components/navbar';

import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { Pagination } from "@nextui-org/react";
import { FaTrophy } from "react-icons/fa";

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
  const [per_page, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

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


  // console.log(data.length);

  return (
    <div className='' suppressHydrationWarning={true}>
      <Navbar />
      {/* {JSON.stringify(data)} */}

      <div className='flex justify-center'>
        <Pagination total={Math.ceil(data?.length / per_page)} initialPage={currentPage} onChange={(page) => {
          setCurrentPage(page)
        }} />

      </div>

      {data.length !== 0 ?

        <div className='mt-4 flex items-center justify-center'>

          {
            new Date().getDate() === new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() ? <Fireworks autorun={{ speed: 3 }} /> : ""
          }

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
              {data?.slice((currentPage - 1) * (per_page), ((currentPage - 1) * (per_page)) + per_page).map((item: MyObject, index: number) => {
                return (

                  <div key={index} className='flex'>
                    <div className='bg-gray-100/60 p-2 pl-10 border text-xs md:text-base border-t-0 border-r-0 border-l-0 border-gray-300'>{((currentPage - 1) * (per_page)) + index + 1}.</div>
                    <div className='bg-gray-100/60 w-20 text-xs md:text-base md:pl-10 md:w-48 border border-t-0 border-r-0 border-l-0 border-gray-300 py-2'>
                      {currentPage === 1 ? index == 0 ? <FaTrophy className='text-amber-400 inline mr-2' /> : index == 1 ?
                        <FaTrophy className='text-neutral-700 inline mr-2' /> : index === 2 ?
                          <FaTrophy className='text-yellow-900 inline mr-2' /> : "" : ""}
                      {item.name}
                    </div>
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
        </div>
      }
    </div>
  );
};

export default Leaderboard;
