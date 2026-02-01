import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

export const Vehicle = () => {

  const navigate = useNavigate()
  
  const {backendUrl, setisVehicleexists, getUserData, setTrackedPlate} = useContext(AppContext)

  const [state, setState] = useState('Register Vehicle')
  const [fullName, setfullName] = useState('')
  const [licenseNumber, setlicenseNumber] = useState('')
  const [numberPlate, setnumberPlate] = useState('')

  const onsubmit = async (e) =>{
    try{

      e.preventDefault()

      if(state === 'Register Vehicle'){

        const {data} = await axios.post(backendUrl + '/api/vehicle/register-vehicle', {fullName, licenseNumber, numberPlate})
        if(data.success){
          setnumberPlate('')
          setState('Track Your Vehicle')
          toast.success('Vehicle Registered Successfully')
        }else{
          toast.error(data.message)
        }
      }else if (state === 'Track Your Vehicle'){
          const {data} = await axios.post(backendUrl + '/api/vehicle/check-number-plate', {numberPlate})
          if(data.success){
            setnumberPlate('')
            setisVehicleexists(true),
            getUserData()
            setTrackedPlate(numberPlate)
            navigate('/vehicle-map');
          }
          else{
            toast.error(data.message)

          }
        }
    }
    catch(error){
      toast.error(error .message)
    }
  }
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br'>
      <img onClick={()=> navigate('/')} src={assets.VDS_logo} alt='' 
      className='absolute top-1 left-5 w-55 sm:w-60 cursor-pointer'/>

      <div className='bg-[#161B22]/80 backdrop-blur-xl border-slate-800 border mb-20 p-10 rounded-2xl w-full sm:w-96 text-white z-10 shadow-2xl'>
        <h1 className='text-white text-3xl font-semibold text-center mb-8'>
          {state === 'Register Vehicle' ? 'Enter Vehicle Details' : 'Track Your Vehicle'}
        </h1>
        <form onSubmit={onsubmit}>
          {state === 'Register Vehicle' && (<div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <input 
          onChange={e => setfullName(e.target.value)} value={fullName} 
          className='bg-transparent outline-none text-white' type='text' placeholder='Full Name' required />
          </div>)}

          {state === 'Register Vehicle' && (<div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <input 
          onChange={e => setlicenseNumber(e.target.value)} value={licenseNumber} 
          className='bg-transparent outline-none text-white' type='text' placeholder='License Number' required />
          </div>)}

          {state === 'Register Vehicle' && (<div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <input 
          onChange={e => setnumberPlate(e.target.value)} value={numberPlate} 
          className='bg-transparent outline-none text-white' type='text' placeholder='Number Plate' required />
          </div>)}

          {state === 'Track Your Vehicle' && (<div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <input 
          onChange={e => setnumberPlate(e.target.value)} value={numberPlate} 
          className='bg-transparent outline-none text-white' type='text' placeholder='Number Plate' required />
          </div>)}

          {state === 'Register Vehicle' ? (<button className=' cursor-pointer text-white w-full py-2.5 rounded-full bg-gradient-to-r 
                from-green-600 to-green-600 font-bold text-base mt-2'>Register</button>)
            : (<button className=' cursor-pointer text-white w-full py-2.5 rounded-full bg-gradient-to-r 
                from-green-600 to-green-600 font-bold text-base mt-2'>Track</button>)
              }

        </form>

        {state === 'Register Vehicle' ? (<p className='text-white text-center text-s mt-4'>Vehicle Already Registered?{' '}
                <span onClick={()=> setState('Track Your Vehicle')} className='text-blue-400 cursor-pointer underline'>Track it</span></p>) 
            : (<p className='text-white text-center text-xs mt-4'>Is Vehicle Registered?{' '}
                <span onClick={()=> setState('Register Vehicle')} className='text-blue-400 cursor-pointer underline'>Register</span>
            </p>) }
      </div>
    </div>
  )
  }
