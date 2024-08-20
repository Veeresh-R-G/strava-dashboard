'use client';
import React from 'react';
import { Users } from 'lucide-react';
import NavbarComponent from '@/components/Navbar';


const AboutUs = () => {
  return (
    
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <NavbarComponent />
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl flex items-center mb-8">
          <Users className="mr-4 text-gray-700" />
          About Us
        </h2>
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="relative mb-8 lg:mb-0">
            <div className="aspect-w-16 aspect-h-9 lg:aspect-none">
              <img
                className="rounded-lg shadow-lg object-cover object-center"
                src="https://i.ibb.co/L6KQxNG/runclub.jpg"
                alt="Run Club Group Photo"
              />
            </div>
            <div className="absolute inset-0 bg-gray-900 bg-opacity-20 rounded-lg"></div>
          </div>
          <div className="prose prose-lg text-gray-500 lg:max-w-none">
            <p>
              Welcome to our vibrant community of runners! Our club is dedicated to fostering a love for running,
              promoting health and fitness, and building lasting friendships and not to forget, satisfying your dosa cravings. Whether you're a seasoned marathoner
              or just starting your running journey, you'll find a supportive and encouraging environment here.
            </p>
            <p>
              We organize weekly group runs, training sessions for various skill levels, and participate in local
              and regional running events. Our diverse routes cater to all preferences, from scenic trails to
              challenging urban landscapes.
            </p>
            <p>
              Join us in our mission to inspire, motivate, and celebrate the joy of running together!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
