'use client'
import React from 'react';
import { ReactDOM } from 'react';
import Login from '@/components/Login';
import Home from '@/components/Home';


const code = new URLSearchParams(window.location.search).get("code")

const App: React.FC = () => {
  return (
    code ? <Home authCode={code}/> : <Login/>
  );
}

export default App
