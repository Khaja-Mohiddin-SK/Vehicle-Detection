import React from 'react'
import { Navbar } from '../components/Navbar'
import { Header } from '../components/Header'
import { SplineScene } from '../components/spline'

export const Home = () => {
  return (
    <>
    <SplineScene></SplineScene>
    <div className= 'flex flex-col items-center justify-center min-h-screen bg-black'>
        <Navbar/>
        <div className='z-10'>
        <Header/>
        </div>
    </div>
    </>
  )
}
