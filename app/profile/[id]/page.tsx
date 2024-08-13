

import Button from "@/components/Button"
import db from "@/db"

async function getRunnerById(id: number) {
    const response = db.runner.findUnique({
        where: { athelete_id: id }
    })

    return response
}

export default async function Page({ params }: { params: { id: number } }) {

    localStorage.setItem("bel_bullets_athelete_id", params.id.toString())
    const athlete: any = await getRunnerById(Number(params.id))

    return (
        <div>
            <h1>Runner Profile</h1>
            <p>{athlete?.athelete_name}</p>
            <p>{athlete?.total_kilometers}</p>

            <Button />
        </div>
    )
}