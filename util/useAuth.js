import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function useAuth(code){
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()
    console.log(accessToken)

    useEffect(() =>{
      axios.post("http://localhost:3001/login", {
        code
      }).then(res => {
        console.log(res.data)
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)
        window.history.pushState({}, null, "/")
      }).catch(error => {
        console.error(error)
        window.location = "/"
      })
    }, [code])

    return accessToken
}