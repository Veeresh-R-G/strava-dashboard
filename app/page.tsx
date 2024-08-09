'use client'
import { useState, useEffect } from 'react';


import Login from '@/components/Login';
import Home from '@/components/Home';



const App = () => {

  const [code, setCode] = useState<string | null>("")

  useEffect(() => {
    if (typeof window === "object") {

      // console.log(new URLSearchParams(window.location.search).get("code"))

      setCode(new URLSearchParams(window?.location?.search).get("code"))
    }
  }, [code])

  // console.log(code);


  return (
    <div suppressHydrationWarning={true}>
      {
        code ? <Home authCode={code} /> : <Login />

      }
    </div>
  );
}

export default App
