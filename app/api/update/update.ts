import prisma from "@/db";

export async function PUT(req:[{athelete_name:string,total_kilometers:number}],resp:any){
        
    let formattedData : { athelete_name: string; total_kilometers: number }[] = req;
    try {
     
        const updateOperations = formattedData.map(({ athelete_name  , total_kilometers }) => ({
          where: { athlete_name: athelete_name }, 
          data: { total_kilometers: total_kilometers }, 
        }));
    
        // Use Prisma client to update multiple runners' total distances
        const updatedRunners = await prisma.runner.updateMany({
          data: updateOperations,
        });
    
        resp.json(updatedRunners);
      } catch (error) {
        console.error('Error updating runners:', error);
        resp.status(500).json({ error: 'Internal server error' });
      }
    }

