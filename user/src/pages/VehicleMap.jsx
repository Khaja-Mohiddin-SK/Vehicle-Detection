import React, { useContext,useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Polyline, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { AppContext } from '../context/AppContext';
import { assets} from '../assets/assets';
import { useNavigate } from 'react-router-dom';


export const VehicleMap = () => {
  const location = useLocation();
  const { trackedPlate } = useContext(AppContext);
  const navigate = useNavigate()

  const [speed, setSpeed] = useState(0);

  const [path, setPath] = useState([[51.7189, 8.7575], ]);

  useEffect(() => {const speedInterval = setInterval(() => {setSpeed(Math.floor(Math.random() * 150) + 1);}, 1000);

    const pathInterval = setInterval(() => {
      setPath((prev) => {
        const last = prev[prev.length - 1];
        const next = [last[0] + (Math.random() - 0.5) * 0.01, last[1] + (Math.random() - 0.5) * 0.01];
        return [...prev, next];
      });
    }, 1000);

    return () => {clearInterval(speedInterval);clearInterval(pathInterval);};
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <img onClick={()=> navigate('/')} src={assets.VDS_logo} alt='' 
            className='absolute top-1 left-5 w-55 sm:w-60 cursor-pointer'/>
      <h1 className="text-3xl font-bold mb-4">Tracking Vehicle: {trackedPlate}</h1>
      <div className="mb-8 text-center">
        <h2 className="text-xl mb-2">Speed</h2>
        <div className="text-4xl font-bold">{speed} km/h</div>
      </div>
      <div className="w-full h-96">
        <MapContainer center={path[0]} zoom={13} className="w-full h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Polyline positions={path} color="green" />
          <Marker position={path[path.length - 1]} />
        </MapContainer>
      </div>
    </div>
  );
};