import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

export const ResetPassword = () => {
  const {backendUrl} = useContext(AppContext)
  axios.defaults.withCredentials = true

  const navigate = useNavigate()
  const [email, setEmail] = useState('') 
  const [newpassword, setnewPassword] = useState('') 
  const [isEmailSent, setisEmailSent] = useState('')
  const [otp, setotp] = useState(0)
  const [isotpSubmitted, setisotpSubmitted] = useState(false)

  const inputRefs = React.useRef([])
    const handleInput = (e, index) =>{
      if(e.target.value.length> 0 && index < inputRefs.current.length -1){
        inputRefs.current[index + 1].focus();
      }
    }
    const handleKeyDown = (e, index) =>{
      if(e.key === 'Backspace' && e.target.value === '' && index > 0){
        inputRefs.current[index - 1].focus();
      }
    }
    const handlePaste = (e) =>{
      const paste = e.clipboardData.getData('text')
      const pasteArray = paste.split('');
      pasteArray.forEach((char, index)=>{
        if(inputRefs.current[index]){
          inputRefs.current[index].value = char;
        }
      })
    }

    const onSubmitEmail = async (e)=>{
      e.preventDefault();
      try{
        const {data} = await axios.post(backendUrl + '/api/auth/send-reset-otp', {email})
        data.success ? toast.success(data.message) : toast.error(data.message)
        data.success && setisEmailSent(true)
      }
      catch(error){
        toast.error(error.message)

      }
    }

    const onSubmitOtp = async (e)=>{
      e.preventDefault();
      const otpValue = inputRefs.current.map(e => e.value).join('')
      setotp(otpValue)
      setisotpSubmitted(true)
    }

    const onSubmitNewPassword = async(e)=>{
      e.preventDefault();
      try{
        const {data} = await axios.post(backendUrl + '/api/auth/reset-password', {email, otp, newpassword})
        data.success ? toast.success(data.message) : toast.error(data.message)
        data.success && navigate('/login')
      }
      catch(error){
        toast.error(error.message)

      }

    }
  return (
  <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br'>
      <img onClick={()=> navigate('/')} src={assets.VDS_logo} alt='' className='absolute top-1 left-5 w-55 sm:w-60 cursor-pointer'/>
      <div className='z-0'>

{!isEmailSent && (
  
      <form onSubmit={onSubmitEmail}className='bg-[#161B22]/80 backdrop-blur-xl border-slate-800 border mb-20 p-10 rounded-2xl w-full sm:w-96 text-white z-10 shadow-2xl'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password</h1>
        <p className='text-center mb-4 text-white' >Enter your registered email address</p>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <img src= {assets.mail_icon} alt='' className='w-3 h-3' />
          <input type='email' placeholder='Email id' className='bg-transparent outline-none text-white'
          value={email} onChange={e => setEmail(e.target.value)} required/> 
        </div>
        <button className='w-full py-2 bg-green-600 border-black border-1 
        from-white to-white text-white rounded-full mt-3 cursor-pointer shadow-md'>Submit</button>
      </form>
  )}


{!isotpSubmitted && isEmailSent && (

      <form onSubmit={onSubmitOtp} className='bg-[#161B22]/80 backdrop-blur-xl border-slate-800 border mb-20 p-10 rounded-2xl w-full sm:w-96 text-white z-10 shadow-2xl'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset Password OTP</h1>
        <p className='text-center mb-6 text-white' >Enter the 6-digit code sent to your mail.</p>
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index)=>(
            <input type="text" maxLength='1'key={index} required 
            className='w-12 h-12 bg-[#333A5C] text-white border-1 border-white text-center text-xl rounded-md'
            ref={e => inputRefs.current[index] = e}
            onInput={(e)=> handleInput(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)} />
          ))}
        </div>
        <button className='w-full py-2 bg-green-600 border-black border-1 
        from-white to-white text-white rounded-full mt-3 cursor-pointer shadow-md'>Verify OTP</button>
      </form>
)}


{isotpSubmitted && isEmailSent && (
      <form onSubmit={onSubmitNewPassword} className='bg-[#161B22]/80 backdrop-blur-xl border-slate-800 border mb-20 p-10 rounded-2xl w-full sm:w-96 text-white z-10 shadow-2xl'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>New Password</h1>
        <p className='text-center mb-6 text-white' >Enter the new password below</p>
        <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
          <img src= {assets.lock_icon} alt='' className='w-3 h-3' />
          <input type='password' placeholder='password' className='bg-transparent outline-none text-white'
          value={newpassword} onChange={e => setnewPassword(e.target.value)} required/> 
        </div>
        <button className='w-full py-2 bg-green-600 border-black border-1 
        from-white to-white text-white rounded-full mt-3 cursor-pointer shadow-md'>Reset Password</button>
      </form>
      )}
      </div>
    </div>
  )
}
