import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

export const Navbar = () => {

    const navigate = useNavigate()
    const {userData, backendUrl, setUserData, setIsLoggedin} = useContext(AppContext)


    const logout = async () =>{

      try{
        axios.defaults.withCredentials = true
        const {data} = await axios.post(backendUrl + '/api/auth/logout')
        data.success && setIsLoggedin(false)
        data.success && setUserData(false)
        navigate('/')
      }
      catch(error){
        toast.error(error.message)
      }
    }
  
    return (
    <div className='w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0'>

    <img src={assets.VDS_logo} alt='' className="absolute top-1 left-5 w-55 sm:w-60" />
    
    {userData ? <div className='cursor-pointer absolute top-5 right-10 w-10 h-10 flex justify-center items-center 
    rounded-full bg-green-600 shadow-md border-2 border-white text-black font-bold group'>
      {userData.name[0].toUpperCase()}
      <div className='absolute hidden right-1 group-hover:block top-0 z-10 text-black rounded pt-12'>
        <ul className='list-none m-1 p-0 bg-gray-100 border rounded border-black text-sm'>
          <li onClick={logout} className='py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10'>Logout</li>
        </ul>

        </div>
    
    </div>: <button
      onClick={() => navigate('/login')}
      className='cursor-pointer flex items-center gap-2 border-2 border-black bg-blue-600 rounded-full px-8 py-3
                 text-white hover:bg-blue-300 transition-all absolute top-5 right-10 font-semibold'>Login</button>}
</div>

  )
}

export default Navbar
