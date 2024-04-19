// Home.tsx
import React from 'react';
import Navbar from '@/components/navbar'; // Import the Navbar component

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Include the Navbar component */}
      <Navbar />

      {/* Main content */}
      <main className="p-4">
        April CHALLENGE WOOHOOO FILL SOME SHIT UP HERE
      </main>
    </div>
  );
}

export default Home;
