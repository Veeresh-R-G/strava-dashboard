/* eslint-disable react-hooks/exhaustive-deps */

'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import axios from 'axios';
import toast from 'react-hot-toast';
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { FaTrophy } from "react-icons/fa";
import { Pagination } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";

import Navbar from '@/components/navbar';

interface MyObject {
  athelete_name: string;
  total_kilometers: number;
  photoUrl: string;
}


const Leaderboard = () => {
  const [data, setData] = useState<MyObject[]>([]);
  const [per_page,] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const spinnerColors: string[] = ["primary", "secondary", "success", "warning"];

  useEffect(() => {
    axios.get("/api/get_runners/", {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
      .then((res) => {
        res.status === 200 && toast.success("Data Fetched Successfully 🎉");
        setData(res?.data?.data)

      })
      .catch((err) => {
        console.log("Error Fetching the data : ", err);
      })
  }, []);


  return (
    <div className='min-w-max' suppressHydrationWarning={true}>

      {/* Navbar */}
      <Navbar />

      {/* {JSON.stringify(data)} */}

      {/* Pagination Component */}
      <div className='flex justify-center'>
        <Pagination total={Math.ceil(data?.length / per_page)} initialPage={1} onChange={(page) => {
          setCurrentPage(page)
        }} />

      </div>

      {data.length !== 0 ?

        <div className='mt-4 flex items-center justify-center'>

          {
            new Date().getDate() === new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() && <Fireworks autorun={{ speed: 3 }} />
          }

          <div className='leaderboard-table'>



            <Table aria-label="" className=''>
              <TableHeader>
                <TableColumn>#</TableColumn>
                <TableColumn>Name</TableColumn>
                <TableColumn>{""}</TableColumn>
                <TableColumn>Distance</TableColumn>
              </TableHeader>
              <TableBody>
                {data?.slice((currentPage - 1) * (per_page), ((currentPage - 1) * (per_page)) + per_page).map((item: any, index: number) => {
                  return (
                    <TableRow key={index}>
                      <TableCell className=''>{((currentPage - 1) * (per_page)) + index + 1}.</TableCell>
                      <TableCell className='text-wrap'> {currentPage === 1 ? index == 0 ? <FaTrophy className='text-amber-400 inline mr-2' /> : index == 1 ?
                        <FaTrophy className='text-neutral-700 inline mr-2' /> : index === 2 ?
                          <FaTrophy className='text-yellow-900 inline mr-2' /> : "" : ""}
                        {item.athelete_name}
                      </TableCell>
                      <TableCell className=''>
                        <Image src={item.photoUrl} alt="photo" width={40} height={40} className='rounded-full' />
                      </TableCell>
                      <TableCell className=''>
                        {(String(Number(item.total_kilometers) / 1000)).slice(0, 5)}
                      </TableCell>
                    </TableRow>
                  )
                })}

              </TableBody>
            </Table>

            {/* Table content */}
            <div className='hidden'>
              {data?.slice((currentPage - 1) * (per_page), ((currentPage - 1) * (per_page)) + per_page).map((item: MyObject, index: number) => {
                return (

                  <div key={index} className='flex'>
                    <div className='bg-gray-100/60 p-2 pl-10 border text-xs md:text-base border-t-0 border-r-0 border-l-0 border-gray-300'>{((currentPage - 1) * (per_page)) + index + 1}.</div>
                    <div className='bg-gray-100/60 w-20 text-xs md:text-base md:pl-10 md:w-48 border border-t-0 border-r-0 border-l-0 border-gray-300 py-2'>
                      {currentPage === 1 ? index == 0 ? <FaTrophy className='text-amber-400 inline mr-2' /> : index == 1 ?
                        <FaTrophy className='text-neutral-700 inline mr-2' /> : index === 2 ?
                          <FaTrophy className='text-yellow-900 inline mr-2' /> : "" : ""}
                      {item.athelete_name}
                    </div>
                    <div className='bg-gray-100/60 w-20 text-xs md:text-base md:pl-10 md:w-48 border border-t-0 border-r-0 border-l-0 border-gray-300 py-2 flex justify-center'>
                      <Image src={item.photoUrl} alt="photo" width={40} height={40} className='rounded-full' />
                    </div>
                    <div className='bg-gray-100/60 w-20 text-xs text-center md:text-base md:pl-10 md:w-48 border border-t-0 border-r-0 border-l-0 border-gray-300 py-2'>{(String(Number(item.total_kilometers) / 1000)).slice(0, 5)}</div>
                  </div>
                )
              })}
            </div>

          </div>


        </div>
        :
        <div>
          <Spinner size='lg' label='Loading...' color={spinnerColors[Math.floor(Math.random() * spinnerColors.length)] as "primary" | "secondary" | "success" | "warning" | "current" | "white" | "default" | "danger" | undefined} />
        </div>
      }
    </div>
  );
};

export default Leaderboard;
