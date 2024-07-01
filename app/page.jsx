"use client"
import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react';

function Home() {
  return (
    <>
    <h1>Home</h1>
    <Link href="/api/auth/signout" className='text-white' onClick={(e)=>{
      e.preventDefault();
      signOut();
    }}>SignOut</Link>
    </>
  )
}

export default Home