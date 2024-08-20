'use client';
import React from 'react';
import { Calendar, Users, Award, MapPin } from 'lucide-react';
import NavbarComponent from '@/components/Navbar';
import Link from 'next/link';



const RunClubHomepage = () => {
    const routes = [
        { name: 'Cubbon Park', slug: 'riverside-trail', link:'https://www.google.com/maps/place/Cubbon+Park/@12.9779291,77.5951549,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae1673e7d0672f:0xc62ca5a6e943dfb8!8m2!3d12.9779291!4d77.5951549!16zL20vMGJtN2Q1?entry=ttu' },
        { name: 'Lal Bagh', slug: 'city-park-loop', link: 'https://www.google.com/maps/place/Lalbagh+Botanical+Garden/@12.949421,77.5821002,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae15c191f2d31d:0x8e110b99df2fbe22!8m2!3d12.9494158!4d77.5846805!16zL20vMDUxd3A0?entry=ttu' },
        { name: 'Dollars Colony Park', slug: 'mountain-challenge' , link: 'https://www.google.com/maps/place/Dollars+Colony,+R.M.V.+2nd+Stage,+Bengaluru,+Karnataka+560094/@13.0418049,77.5624528,16z/data=!3m1!4b1!4m6!3m5!1s0x3bae17e18bc3c469:0xbc0025be09b4dcb!8m2!3d13.041526!4d77.5683899!16s%2Fg%2F11f57gt4ll?entry=ttu' },
      ];

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-screen-xl">
      <NavbarComponent />

      <header className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2"> bbrc.</h1>
        <p className="text-lg sm:text-xl text-gray-600">Running . Breakfast . Community stuff 🏃‍♂️🍳🌍</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center">
            <Calendar className="mr-2 text-gray-700 w-5 h-5 sm:w-6 sm:h-6" /> Upcoming Club Events
          </h2>
          <ul className="space-y-2 text-sm sm:text-base text-gray-600">
            <li>Saturday Morning Run - 6:30 AM </li>
            <li>Wednesday Intervals - 6:30 AM</li>
          </ul>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center">
            <Users className="mr-2 text-gray-700 w-5 h-5 sm:w-6 sm:h-6" /> Upcoming Races
          </h2>
          <ol className="list-decimal list-inside text-sm sm:text-base text-gray-600">
            <li>Wipro Full Marathon </li>
            <li>Spartan Race</li>
            <li>Emily Chen - 108 miles</li>
            <li>Shubham - 100 miles</li>
          </ol>
        </div>
      </section>

      <section className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center">
          <Award className="mr-2 text-gray-700 w-5 h-5 sm:w-6 sm:h-6" /> Club Achievements
        </h2>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200">
          <ul className="space-y-2 text-sm sm:text-base text-gray-600">
            <li>60+ Total Club Runs</li>
            <li>900 + Community members</li>
            <li>1 Million + Dosas Decimated</li>
          </ul>
        </div>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center">
          <MapPin className="mr-2 text-gray-700 w-5 h-5 sm:w-6 sm:h-6" /> Our Favorite Routes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {routes.map((route) => (
            <Link href={route.link} key={route.slug} className="block">
              <div className="bg-white p-4 rounded-lg shadow-md text-center border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{route.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600 underline">Click for details</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RunClubHomepage;