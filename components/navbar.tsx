// Navbar.tsx
import React from 'react';
import Image from 'next/image'; // Import the Image component

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            {/* Load the logo image using the Image component */}
            <Image src="/1.png" alt="Logo" width={50} height={50} />
          </div>
          <div className="hidden md:block">
            <ul className="flex space-x-4">
              <li><a href="#" className="text-white hover:text-gray-300 text-lg ">Home</a></li>
              <li><a href="#" className="text-white hover:text-gray-300">Leaderboard</a></li>
              <li><a href="#" className="text-white hover:text-gray-300">About us</a></li>
              <li><a href="#" className="text-white hover:text-gray-300">Contact</a></li>
              {/* Add Strava icon linking to the club's Strava page */}
              <li>
                <a href="https://www.strava.com/clubs/belbullets" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" id="strava">
                    <path fill="#F04F28" d="M15 30C6.717 30 0 23.283 0 15S6.717 0 15 0s15 6.717 15 15-6.717 15-15 15Z"></path>
                    <path fill="#fff" d="M13.585 13.88l2.011 3.964h2.954L13.585 7.44l-4.97 9.404h2.953l2.017-3.964Z"></path>
                    <path fill="#FFA780" d="M18.975 20.462l-1.496-2.95h-2.197l3.678 7.285 3.676-7.285h-2.195l-1.466 2.95Z"></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
