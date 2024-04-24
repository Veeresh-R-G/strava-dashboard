import axios, {AxiosResponse} from 'axios';
import getAccessToken from "@/util/access_token"
import prisma from '@/db';

const fetchData = async (access_token: string) => {
    let aggregatedData: { [key: string]: number } = {}; // Object to aggregate distances by athlete name
    let totalDistance = 0;
    let page = 1;
    let currentActivities = 0

  try {
    while (true) {
        const response: AxiosResponse = await axios.get(
            `https://www.strava.com/api/v3/clubs/1235636/activities?page=${page}&per_page=100`,
            {
              headers: {
                'Authorization': `Bearer ${access_token}`
              }
            }
          );

    console.log("im here")  
    const newData: { athlete: { firstname: string; lastname: string }; distance: number }[] = response.data;
    // console.log(newData)
    currentActivities += newData.length
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
    const formattedData = Object.entries(aggregatedData).map(([name, totalAthleteDistance]) => ({
        name,
        totalAthleteDistance
      }));
    // Set the combined data in state
    return {formattedData, currentActivities, totalDistance};
    
  } catch (error: any) {
    console.log('Error fetching data:', error);
    // Handle error, e.g., set loading to false or show an error message
  }
};

export async function PUT() {
  try {
    const accessToken = await getAccessToken();
    // console.log(accessToken);

    const resp: { formattedData: { name: string; totalAthleteDistance: number }[], currentActivities: number, totalDistance: number } | undefined = await fetchData(accessToken);
    const data = resp?.formattedData ?? [];
    const currentActivities = resp?.currentActivities;
    let totalDistance = resp?.totalDistance;
    // console.log(data);
    for (const { name, totalAthleteDistance } of data) {      
      const runner = await prisma.runner.findFirst({
        where: {
          athelete_name: name,
        },
      });
      // console.log(runner?.id);
      await prisma.runner.update({
        where: { id: runner?.id},
        data: { total_kilometers: totalAthleteDistance },
      });
    
    }
    
    //console.log("updatedRunners", updatedRunners);
    
    // Return a successful response with the updated runners
    return Response.json("hello");
  } catch (error) {
    console.error('Error updating runners:', error);

    // Return an error response
    return Response.error();
  }
};

  