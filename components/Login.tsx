import React from "react";

const auth_url= "http://www.strava.com/oauth/authorize?client_id=126068&response_type=code&redirect_uri=http://localhost:3000&approval_prompt=force&scope=read"

export default function Login(){
    return (
        <div className="login-container min-h-screen bg-gray-100">
            <a className="bttn-login" href={auth_url}>LOGIN WITH STRAVA</a>
        </div>
    )
}
