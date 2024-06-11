import React, { useEffect, useState } from "react";
import axios from "axios";

export default function useAuth(code) {
  const [authInfo, setAuthInfo] = useState();

  //Send post request to server endpoint with auth code to get short-lived access token
  useEffect(() => {
    axios
      .post("https://microservice-strava-dashboard.vercel.app/login", {
        code,
      })
      .then((res) => {
        setAuthInfo(res.data);
        window.history.pushState({}, null, "/");
      })
      .catch((error) => {
        console.error(error);
        //On error redirect back to Login
        window.location = "/";
      });
  }, [code]);

  return authInfo;
}
