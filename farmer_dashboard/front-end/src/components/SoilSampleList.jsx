import React, { useEffect, useState, useRef } from 'react'
import { MdExpandMore } from 'react-icons/md'
import { BiCabinet } from 'react-icons/bi'
import { formatTime } from '../util/StringFormat'

const SoilSampleDateDropdownItem = ({date, setSelectedDate, setDropdown}) => {
    const [isHovering, setHovering] = useState(false)

    return (
        <li 
            className={(isHovering ? 'bg-light-gray ' : '') + 'px-16 w-full cursor-pointer'}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onClick={() => {
                setSelectedDate(date)
                setDropdown(false)}}>
                {date}
        </li>
    )
}

const SoilSampleDatesDropdown = ({selectedDate, setSelectedDate, datesList}) => {
    const [isDropdown, setDropdown] = useState(false)
    console.log(datesList)
    // Closing dropdown if user clicks off
    // Creating a reference for our dropdown
    const ref = useRef()
    useEffect(() => {
        // Checking if the user's click was off of the dropdown
        const checkOutsideClick = (e) => {
            if(isDropdown && ref.current && !ref.current.contains(e.target))
                setDropdown(false)
        }
        
        // Creating event listener
        document.addEventListener('mousedown', checkOutsideClick)
    
        // Cleaning event listener on component dismount
        return () => {
            document.removeEventListener('mousedown', checkOutsideClick)
        }
    }, [isDropdown])

    return (
        <div className='relative flex justify-center items-center'>
            {/* Display Date */}
            <div className='w-32 relative cursor-pointer flex justify-center'
                 onClick={() => {setDropdown(!isDropdown)}}>
                {/* Current selected date display */}
                <h3 >{selectedDate}</h3>
                {/* Icon */}
                <MdExpandMore className='absolute text-2xl -right-2 top-1'/>
            </div>

            {/* Dropdown list */}
            {isDropdown  &&
                <div ref={ref} className='bg-white absolute py-2 top-6 left-1/2 transform -translate-x-1/2'>
                    <ul className=''>
                        {/* Adding each date to the dropdown list */}
                        {(datesList.map(date => 
                            <SoilSampleDateDropdownItem
                                date={date}
                                setSelectedDate={setSelectedDate}
                                setDropdown={setDropdown}
                                key={date}/>
                        ))}
     
                    </ul>
                </div>
            }
        </div>
    )
}

const SoilEntry = ({soilSample, selectedSample, setSelectedSample}) => {
    // Hovering element change color
    const [isHovering, setIsHovering] = useState(false)

    // Checking if current sample is the selected sample
    let isSelected = selectedSample.id && (selectedSample.id == soilSample.id);
    
    return (
        // Creating a new table row
        <tr className={(isSelected ? 'bg-light-green' : (isHovering ? 'bg-light-gray' : 'bg-data-gray')) + ' cursor-pointer'}
            onClick={() => setSelectedSample(soilSample)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}>
            
            {/* Sample ID */}
            <td className='[ border-top-left-radius: 10px;]'>{soilSample.id}</td>

            {/* Longitude and latitude */}
            <td>{soilSample.longitude + '°N ' + soilSample.latitude + '°E'}</td>

            {/* Time */}
            <td>{formatTime(soilSample.time)}</td>
        </tr>
    )
}


export const SoiLSampleList = ({selectedSample, setSelectedSample, selectedDate, setSelectedDate, datesList, samples}) => {

  if(samples.length < 1)
    return <></>
console.log(samples)
  return (
    <>
        {/* Card Header */}
        <div className='text-center relative my-3'>
            {/* Icon */}
            <BiCabinet className='text-6xl m-3 absolute -top-2 left-4'/>
            
            {/* Title */}
            <h1 className='text-3xl'>Soil Samples</h1>

            {/* Dropdown list */}
            <SoilSampleDatesDropdown
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                datesList={datesList}/>
        </div>

        {/* Table */}
        <div className='[height:75vh] p-4 overflow-y-scroll'>
            <table className='text-dark-gray w-full text-center text-lg border-separate [border-spacing:0rem_0.75rem]'>
                {/* Table Header */}
                <thead className='bg-data-gray'>
                    <tr className=''>
                        <th>ID</th>
                        <th>Location</th>
                        <th>Time</th>
                    </tr>
                </thead> 

                {/* Table body */}
                <tbody>
                    {/* Loading every sample into the table */}
                    {samples.map((sample) => (
                        <SoilEntry
                            key={sample.id}
                            soilSample={sample}
                            selectedSample={selectedSample}
                            setSelectedSample={setSelectedSample}/>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  )
}

export default SoiLSampleList