import React from 'react'
import { HiOutlineClipboardList} from 'react-icons/hi'
import { formatTime } from '../util/StringFormat'

const DataEntry = ({name, value, desiredValue, unit}) => {
    let valueDiff = value - desiredValue
    return (
        <div className='bg-data-gray card grid grid-cols-2 grid-rows-3 text-center mx-4 my-4 font-bold p-0'>
            {/* Card Title */}
            <h3 className='text-xl text-dark-gray col-span-2'>{name}</h3>

            {/* Card Value */}
            <h2 className='text-2xl text-green col-span-2'>{value + '' + unit}</h2>

            {/* Desired Value */}
            <h4 className='text-lg text-blue'>{desiredValue}</h4>
            
            {/* Difference of card value and desired value */}
            <h4 className='text-lg text-red'>{valueDiff}</h4>
        </div>
    )
}

const SoilSampleData = ({soilSample}) => {

    //Empty value if no value is given
    if(!soilSample)
    {
        soilSample = {
            id: '--',
            longitude: '--',
            latitude: '--',
            time: '0:00:00',
            soilData: {
                conductivity: '',
                humidity: '',
                nitrogen: '',
                ph: '',
                phosphorous: '',
                potassium: '',
                temperature: ''
            }
        }
    }
    
    return (
    <>
        {/* Card Header */}
        <div className='h-full grid grid-cols-4 grid-rows-3'>
            <div className='relative col-span-2 row-span-1 text-left pl-24 pt-4'>
                {/* Icon */}
                <HiOutlineClipboardList className='text-6xl m-3 absolute top-2 left-2'/>
                
                {/* Sample ID */}
                <h1 className='text-3xl'>{'Sample - ' + soilSample.id}</h1>
                {/* Sample Longitude and Latitude */}
                <h3 className='text-dark-gray'>{soilSample.longitude + '°N ' + soilSample.latitude + '°E'}</h3>
                {/* Sample Time */}
                <h3 className='text-dark-gray'>{formatTime(soilSample.time)}</h3>
            </div>

            {/* Nitrogen Card */}
            <DataEntry name='Nitrogen(N)' value={soilSample.soilData.nitrogen} desiredValue={1000} unit='mg/kg'/>
            
            {/* Graph */}
            <div className='bg-slate-200 col-span-1 row-span-3 col-start-4'>
                <h1>Graph</h1>
            </div>

            {/* Temperature Card */}
            <DataEntry name='Temperature' value={soilSample.soilData.temperature} desiredValue={60} unit='°F'/>

            {/* Humidity Card */}
            <DataEntry name='Humidity' value={soilSample.soilData.humidity} desiredValue={40} unit='%'/>

            {/* Potassium Card */}
            <DataEntry name='Potassium(K)' value={soilSample.soilData.potassium} desiredValue={1000} unit='mg/kg'/>

            {/* Conductivity Card */}
            <DataEntry name='Conductivity' value={soilSample.soilData.conductivity} desiredValue={10000} unit='u/cm'/>

            {/* pH Card */}
            <DataEntry name='pH' value={soilSample.soilData.ph} desiredValue={7} unit=''/>

            {/* Phosphorous Card */}
            <DataEntry name='Phosphorous(P)' value={soilSample.soilData.phosphorous} desiredValue={1000} unit='mg/kg'/>
        </div>

    </>
    )
}


export default SoilSampleData