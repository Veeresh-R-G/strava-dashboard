import axios, {AxiosResponse} from 'axios';
import getAccessToken from "@/util/access_token"
import prisma from '@/db';

const fetchData = async (access_token: string) => {
    let aggregatedData: { [key: string]: number } = {}; // Object to aggregate distances by athlete name
    let totalDistance = 0;
    let page = 1;
    let currentActitivities = 0

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
    console.log(newData)
    currentActitivities += newData.length
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
    return {formattedData, currentActitivities};
    
  } catch (error: any) {
    console.log('Error fetching data:', error);
    // Handle error, e.g., set loading to false or show an error message
  }
};

export async function GET() {
    const accessToken = await getAccessToken();
    console.log(accessToken);
    
    const resp = await fetchData(accessToken)
    const data = resp?.formattedData
    const currentActitivities = resp?.currentActitivities
    const metaData = await prisma.metadata.findFirst()
    const prev_activities = metaData?.previous_activities
    const total_distance = metaData?.total_distance
    const diff = (currentActitivities || 0) - (prev_activities || 0)
    const slicedData = data?.slice(0, diff)
    
    



    return Response.json({"Hello" : "World"})
}