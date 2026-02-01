import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

export const Login = () => {

    const navigate = useNavigate()

    const {backendUrl, setIsLoggedin, getUserData} = useContext(AppContext)

    const [state, setState] = useState('Sign Up')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onsubmitHandler = async (e) => {
        e.preventDefault()
        axios.defaults.withCredentials = true

        try {
            if (state === 'Sign Up') {
                const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password })
                if (!data.success) {
                    toast.error(data.message)
                    return
                }

                // sends otp
                const otpRes = await axios.post(backendUrl + '/api/auth/send-verify-otp')
                if (otpRes.data.success) {
                    toast.success("OTP sent to your email")
                    navigate('/email-verify') 
                } else {
                    toast.error("Failed to send OTP")
                }

            } else if (state === 'Login') {
                const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password })
                if (data.success) {
                    setIsLoggedin(true)
                    getUserData()
                    navigate('/')
                } else {
                    toast.error(data.message)
                }
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br">
        <img 
        onClick={()=> navigate('/')} 
        src={assets.VDS_logo} alt='' className='absolute top-1 left-5 w-55 sm:w-60 cursor-pointer'/>

        <div className="bg-[#161B22]/80 backdrop-blur-xl border-slate-800 border mb-20 p-10 rounded-2xl w-full sm:w-96 text-white z-10 shadow-2xl">
            
            <h2 className='text-3xl font-semibold text-white text-center mb-3'>
                {state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>


            <p className='text-center text-sm mb-6 text-white'>{state === 'Sign Up' ? 'Create your account' : 'Login to your account!'}</p>

            <form onSubmit={onsubmitHandler}>
                {state === 'Sign Up' && (<div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                    <img src={assets.person_icon} alt='' />
                    <input 
                    onChange={e => setName(e.target.value)} value={name} 
                    className='bg-transparent outline-none text-white' type='text' placeholder='Full Name' required />
                </div>)}
                
                
                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                    <img src={assets.mail_icon} alt='' />
                    <input 
                    onChange={e => setEmail(e.target.value)} value={email}
                    className='bg-transparent outline-none text-white' type='email' placeholder='Email ID' required title="Enter a correct Email address" />
                </div>

                <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
                    <img src={assets.lock_icon} alt='' />
                    <input 
                    onChange={e => setPassword(e.target.value)} value={password}
                    className='bg-transparent outline-none text-white' type='password' placeholder='Password' required
                    pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$"
                    title="Password must contain at least 8 characters, 1 uppercase letter, 1 number and 1 special character" />
                </div>

               {state === 'Login' && (<p onClick={()=>navigate('/reset-password')} 
               className='cursor-pointer text-white mb-4'>Forgot Password</p>)}

                {state === 'Sign Up' ? (<button className=' cursor-pointer text-white w-full py-2.5 rounded-full bg-gradient-to-r 
                from-green-600 to-green-700 font-bold text-base'>Sign Up</button>) : 
                (<button  
                className=' cursor-pointer text-white w-full py-2.5 rounded-full bg-gradient-to-r 
                from-green-600 to-green-600 font-bold text-base'>Login</button>)}
            </form>

            {state === 'Sign Up' ? (<p className='text-white text-center text-xs mt-4'>Already have an account?{' '}
                <span onClick={()=> setState('Login')} className='text-blue-400 cursor-pointer underline'>Login here</span>
            </p>) 
            : (<p className='text-white text-center text-xs mt-4'>Don't have an account?{' '}
                <span onClick={()=> setState('Sign Up')} className='text-blue-400 cursor-pointer underline'>Sign Up</span>
            </p>) }

            
        </div>
    </div>
  )
}
