
import Link from "next/link";
import React from "react";

const redirect_prod = "https://strava-dashboard-veereshs-projects-a621c1ca.vercel.app/"
const redirect_local = "http://localhost:3000/"

const redirect_uri = process.env.NODE_ENV === 'production' ? redirect_prod : redirect_local

const auth_url = `http://www.strava.com/oauth/authorize?client_id=125102&response_type=code&redirect_uri=${redirect_uri}&approval_prompt=force&scope=activity:read`

export default function Login() {
    return (
        <div className="login-container min-h-screen bg-gray-100">
            <Link className="bg-orange-600 text-white p-4 border border-black rounded-2xl" href={auth_url}>LOGIN WITH STRAVA</Link>
        </div>
    )
}
