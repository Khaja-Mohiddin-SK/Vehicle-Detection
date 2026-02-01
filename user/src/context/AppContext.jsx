import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext()

export const AppContextProvider = (props) =>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [userData, setUserData] = useState(null)
    const [isVehicleexists, setisVehicleexists] = useState(false)
    const [trackedPlate, setTrackedPlate] = useState(null)

    axios.defaults.withCredentials = true;

    const getAuthState = async () =>{

        try{
            const {data} = await axios.get(backendUrl + '/api/auth/is-auth')
            if(data.success)
            {
                setIsLoggedin(true)
                getUserData()
            }
        }
        catch(error)
        {
            toast.error(error.message)
        }
    }

    const getUserData = async () =>{
        try{
            const {data} = await axios.get(backendUrl + '/api/user/data')
            if (data.success) {
                setUserData(data.userData); 
            } else {
                toast.error(data.message);
            }
        }
        catch(error)
        {
            toast.error(error.message)
        }
    }
    const getUserVehicleData = async () =>{
        try{
            const {data} = await axios.get(backendUrl + '/api/vehicle/data')
            if(data.success){
                setUserData(data.userData);
            }else{
                toast.error(data.message)
            }
        }
        catch(error){
            toast.error(error.message)
        }
    }

useEffect(() =>{ getAuthState() }, [])
    
    const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        isVehicleexists, setisVehicleexists,
        trackedPlate, setTrackedPlate,
        getUserData,
        getUserVehicleData,


    }

    return(
        <AppContext.Provider value={value}>

            {props.children}

        </AppContext.Provider>
    )
}