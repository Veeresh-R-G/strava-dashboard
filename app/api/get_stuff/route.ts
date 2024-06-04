import axios, {AxiosResponse} from 'axios';
import getAccessToken from "@/util/access_token"
import prisma from '@/db';


export async function GET(){
    try{
        // console.log("DEBUG")
        // console.log(accessToken);
        let data1 : { [key: string]: number } = {}
        // console.log("DEBUG: Before")
        // console.log(data)
        
        const table = await prisma.runner.findMany({})
        table.forEach((table: { athelete_name: string | number; total_kilometers: any; }) => {
          // console.log(table.athelete_name,data[table.athelete_name] , table.total_kilometers, data[table.athelete_name], (table.total_kilometers),Number(data[table.athelete_name]))
          // console.log(table.athelete_name, data[table.athelete_name], Number(table.total_kilometers))
          data1[table.athelete_name] = table.total_kilometers
        })
        // console.log("DEBUG: After")
        // console.log(data)
        return Response.json({"data" : data1})
      }
        catch (error: any) {
            console.log('Error fetching data:', error);
          }
        }

