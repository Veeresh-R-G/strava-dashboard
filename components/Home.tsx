import React from 'react';
import Navbar from '@/components/navbar';
import useAuth from "../util/useAuth"

export default function Home({authCode}: {authCode: string}){
  const accessToken = useAuth(authCode)

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      {accessToken}
    </div>
  );
}

