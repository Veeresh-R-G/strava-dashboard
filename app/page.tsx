'use client'
import React from 'react';
import Login from '@/components/Login';
import Home from '@/components/Home';
// import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

//On auth user redirected back to index url with code as query paramater in URL




const App = () => {
  // const code = new URLSearchParams(window.location.search).get("code")
  // const router = useRouter();
  // const [query, setQuery] = useState<any | null>(null);

  // useEffect(() => {
  //   if (router.isReady) {
  //     setQuery(router.query);
  //   }
  // }, [router.isReady, router.query]);

  const [code, setCode] = useState<string | null>("")

  useEffect(() => {
    if (typeof window === "object") {

      // console.log(new URLSearchParams(window.location.search).get("code"))

      setCode(new URLSearchParams(window?.location?.search).get("code"))
    }
  }, [code])

  console.log(code);


  return (
    <div>
      {
        code ? <Home authCode={code} /> : <Login />

      }
    </div>
    // <div>
    //   hola {""}
    // </div>
  );
}

export default App
