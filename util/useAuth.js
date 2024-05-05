import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function useAuth(code){
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    //Send post request to server endpoint with auth code to get short-lived access token
    useEffect(() =>{
      axios.post("http://localhost:3001/login", {
        code
      }).then(res => {
        setAccessToken(res.data.access_token)
        setRefreshToken(res.data.refresh_token)
        setExpiresIn(res.data.expires_in)
        window.history.pushState({}, null, "/")
      }).catch(error => {
        console.error(error)
        //On error redirect back to Login
        window.location = "/"
      })
    }, [code])

    return accessToken
}