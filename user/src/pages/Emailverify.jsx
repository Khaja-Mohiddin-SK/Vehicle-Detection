import React, { useContext, useEffect } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export const Emailverify = () => {

  axios.defaults.withCredentials = true;
  const {backendUrl, isLoggedin, userData, getUserData} = useContext(AppContext)
  const navigate = useNavigate()

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

  const onsubmitHandler = async(e) =>{
    try{
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value)
      const otp = otpArray.join('') 
      const {data} = await axios.post(backendUrl + '/api/auth/verify-account', {otp})

      if(data.success){
          toast.success(data.message)
          getUserData()
          navigate('/login')
        }else{
          toast.error(data.message)
        }
        }
    catch(error){
      toast.error(error.message)
    }
  }

  useEffect(() => {
    isLoggedin && userData && userData.isAccountverified && navigate('/')  
  }, [isLoggedin, userData])

  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br'>
      <img onClick={()=> navigate('/')} 
      src={assets.VDS_logo} alt='' className='absolute top-1 left-5 w-55 sm:w-60 cursor-pointer'/>

      <form onSubmit={onsubmitHandler} className='bg-[#161B22]/80 backdrop-blur-xl border-slate-800 border mb-20 p-10 rounded-2xl w-full sm:w-96 text-white z-10 shadow-2xl'>
        <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
        <p className='text-center mb-6 text-white' >Enter the 6-digit code sent to your mail.</p>
        <div className='flex justify-between mb-8' onPaste={handlePaste}>
          {Array(6).fill(0).map((_, index)=>(
            <input type="text" maxLength='1'key={index} required 
            className='w-12 h-12 bg-[#333A5C] text-white border-1 border-white-600 text-center text-xl rounded-md'
            ref={e => inputRefs.current[index] = e}
            onInput={(e)=> handleInput(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)} />
          )
          
          )}

        </div>
        
        <button className='w-full py-3 bg-green-600 from-white to-white rounded-md cursor-pointer text-white'>Verify Email</button>
      </form>
       
    </div>
  )
}
