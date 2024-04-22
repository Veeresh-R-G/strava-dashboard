// Leaderboard.tsx
'use client'
import Navbar from '@/components/navbar'; // Import the Navbar component
import React, { useEffect, useState } from 'react';
import axios, {AxiosResponse} from 'axios';

const Leaderboard: React.FC = () => {
    const [leaderboardData, setLeaderboardData] = useState<{ name: string; totalDistance: number }[]>([]);
    const [totals, setTotals] = useState<{distance : number; activities : number }>({ distance: 0, activities: 0 });
    const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
        let allData: { name: string; distance: number }[] = [];
        let aggregatedData: { [key: string]: number } = {}; // Object to aggregate distances by athlete name
        let totalDistance = 0;
        let noAct = 0
      const accessToken = 'ddacb08be54b556c8eb66a71e01b5c8bfbd1bf0f';
      let page = 1;

      try {
        while (true) {
            const response: AxiosResponse = await axios.get(
                `https://www.strava.com/api/v3/clubs/1235636/activities?page=${page}&per_page=100`,
                {
                  headers: {
                    'Authorization': `Bearer ${accessToken}`
                  }
                }
              );
        
        console.log("im here")  
        const newData: { athlete: { firstname: string; lastname: string }; distance: number }[] = response.data;
        console.log(newData)
        if (newData.length === 0) {
            // No more data available, exit the loop
            break;
          }

          // Aggregate distances by athlete name
          newData.forEach(({ athlete, distance }) => {
            const name = `${athlete.firstname} ${athlete.lastname}`;
            aggregatedData[name] = (aggregatedData[name] || 0) + distance;
            totalDistance += distance; 
          });

          page++;
        }
        const formattedData = Object.entries(aggregatedData).map(([name, totalDistance]) => ({
            name,
            totalDistance,
          }));
        // Set the combined data in state
        setLeaderboardData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error, e.g., set loading to false or show an error message
      }
    };

    fetchData();
  }, []);

  return (
    <div>
        <Navbar />
        <ul>
          {leaderboardData.map(({ name, totalDistance }, index) => (
            <li key={index}>
              Athlete: {name}, Distance: {totalDistance/1000} meters
            </li>
          ))}
        </ul>
    </div>
  );
};

export default Leaderboard;
