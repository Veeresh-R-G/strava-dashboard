
import Link from "next/link";
import React from "react";

const auth_url = "http://www.strava.com/oauth/authorize?client_id=125102&response_type=code&redirect_uri=https://www.google.com&approval_prompt=force&scope=activity:read"

export default function Login() {
    return (
        <div className="login-container min-h-screen bg-gray-100">
            <Link className="bg-orange-600 text-white p-4 border border-black rounded-2xl" href={auth_url}>LOGIN WITH STRAVA</Link>
        </div>
    )
}
