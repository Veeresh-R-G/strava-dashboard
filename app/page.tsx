'use client'
import React from 'react';
import { ReactDOM } from 'react';
import Login from '@/components/Login';
import Home from '@/components/Home';

//On auth user redirected back to index url with code as query paramater in URL
const code = new URLSearchParams(window.location.search).get("code")

const App: React.FC = () => {
  return (
    code ? <Home authCode={code}/> : <Login/>
  );
}

export default App
