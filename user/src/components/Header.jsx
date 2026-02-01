import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'


export const Header = () => {

  const {userData} = useContext(AppContext)
  const navigate = useNavigate()

  const afterlogin = async (e)=>{

  }

  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-white'>

        <h1 className='flex items-center gap-2 text-3xl sm:text-5xl font-semibold mb-4'>Welcome to VDS</h1>

        <h2 className='text-xl sm:text-3xl font-medium mb-4'>Let's start tracking. You can track your vehicle and speed</h2>
{!userData ? (<button onClick={() => navigate('/login')} className='cursor-pointer border-2 border-black 
rounded-full px-8 py-2.5 bg-blue-600 shadow-lg text-white hover:bg-blue-300 transition all'>Get Started</button>):
          <button onClick={() => navigate('/vehicle-details')}
          className='cursor-pointer border-2 bg-green-600 border-black-500 shadow-lg rounded-full px-8 py-2.5 hover:bg-green-300 transition'>
          Track Your Vehicle </button>}

    </div>
    
  )
}
