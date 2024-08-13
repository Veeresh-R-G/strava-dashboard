'use client'

import { useRouter } from "next/navigation"


function Button() {

    const router = useRouter();
    return (
        <div>
            <button className='p-2 text-sm md:text-md border-2 hover:bg-white hover:border-2 hover:border-orange-600 hover:text-orange-600 bg-orange-600 text-white rounded-xl' onClick={() => {
                router.push('/leaderboard')
            }}>Group Leaderboard</button>
        </div>
    )
}

export default Button