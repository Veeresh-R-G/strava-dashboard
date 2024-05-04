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
            `https://www.strava.com/api/v3/clubs/1235636/activities?page=${page}&per_page=80`,
            {
              headers: {
                'Authorization': `Bearer ${access_token}`
              }
            }
          );

    // console.log("im here")  
    const newData: { athlete: { firstname: string; lastname: string }; distance: number }[] = response.data;
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

      // console.log("DEBUG: Aggregated Data")
      // console.log(formattedData)
    return {aggregatedData, currentActivities, totalDistance};
    
  } catch (error: any) {
    console.log('Error fetching data:', error);
  }
};


const fetchCurrentAuthAthlete = async (accessToken: string) => {
  try{
    const res = await axios.get(`https://www.strava.com/api/v3/athlete`,
      {
        headers: {'Authorization': `Bearer ${accessToken}`}
      }
    )
    return res.data
  }catch(error){
    console.error("Error fetching athlete", error)
  }
}

// const fetchAthleteActivities = async (accessToken: string) => {
//   let page = 1
//   let date = new Date()
//   let after = new Date(date.getFullYear(), date.getMonth(), 1).getTime()
//   let before = new Date(date.getFullYear(), date.getMonth() + 1, 0).getTime()
//   try{
//     const res = await axios.get(`https://www.strava.com/api/v3/athlete/activities`,
//       {
//         headers: {'Authorization': `Bearer ${accessToken}`}
//       }
//     )
//     return res.data
//   }catch(error){
//     console.error("Error fetching athlete data", error)
//   }

// }

export async function GET(){
    try{
        const accessToken = await getAccessToken();
        // console.log("DEBUG")
        // console.log(accessToken);
        console.log(accessToken)
        const athlete = await fetchCurrentAuthAthlete(accessToken)
        // const athleteData = await fetchAthleteActivities(accessToken)

        // console.log("ATHLETE DATA")
        // console.log(athlete)
        // console.log(athleteData)

        // const resp: { aggregatedData:{ [key: string]: number } , currentActivities: number, totalDistance: number } | undefined = await fetchData(accessToken);
        // const data = resp?.aggregatedData ?? {};
      
        // const totalDistance = resp?.totalDistance;
        // // console.log("DEBUG: Before")
        // // console.log(data)
        
        // const table = await prisma.runner.findMany({})
        // table.forEach((table: { athelete_name: string | number; total_kilometers: any; }) => {
        //   // console.log(table.athelete_name,data[table.athelete_name] , table.total_kilometers, data[table.athelete_name], (table.total_kilometers),Number(data[table.athelete_name]))
        //   // console.log(table.athelete_name, data[table.athelete_name], Number(table.total_kilometers))
        //   data[table.athelete_name] = (Number(data[table.athelete_name]) - Number(table.total_kilometers)) || 0
        // })
        // // console.log("DEBUG: After")
        // // console.log(data)
        return Response.json({"data" : athlete})
      }
        catch (error: any) {
            console.log('Error fetching data:', error);
          }
        }

