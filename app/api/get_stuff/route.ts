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
    console.log(newData)
    currentActivities += newData.length
    if (newData.length === 0) {
        break;
      }

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
    return {aggregatedData, currentActivities, totalDistance};
    
  } catch (error: any) {
    console.log('Error fetching data:', error);
  }
};

export async function GET(){
    try{
        const accessToken = await getAccessToken();
        console.log(accessToken);
        
        const resp: { aggregatedData:{ [key: string]: number } , currentActivities: number, totalDistance: number } | undefined = await fetchData(accessToken);
        const data = resp?.aggregatedData ?? {};
      
        const totalDistance = resp?.totalDistance;

        const table = await prisma.runner.findMany({})
        table.forEach(table => {
            console.log(table.athelete_name,data[table.athelete_name] , table.total_kilometers, data[table.athelete_name], (table.total_kilometers),Number(data[table.athelete_name]))
            data[table.athelete_name] = (Number(data[table.athelete_name]) - Number(table.total_kilometers)) || 0
        })
        console.log(data)
        return Response.json({"data" : data})
      }
        catch (error: any) {
            console.log('Error fetching data:', error);
          }
        }

