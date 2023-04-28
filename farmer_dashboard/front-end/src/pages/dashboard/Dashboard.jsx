import React, { useEffect, useState } from 'react';
import SoilSampleData from '../../components/SoilData';
import SoilMap from '../../components/SoilMap';
import SoiLSampleList from '../../components/SoilSampleList';
import WeatherReport from '../../components/WeatherReport';
import { getAllSampleDates, getAllSamplesOn, login } from '../../util/MongoRequests';

const Dashboard = () => 
{
    //Selected soil sample
    const [selectedSample, setSelectedSample] = useState(false)
    const [selectedDate, setSelectedDate] = useState(false)

    const [sampleDates, setSampleDates] = useState([])
    const [samples, setSamples] = useState([])

    const robotName = 'reginald'

    //Load the list of sample dates
    useEffect(() => {

        getAllSampleDates(robotName)
            .then(result => {
                setSampleDates(result.dates)
                setSelectedDate(result.dates[0])
                return result[0]
            })
    }, [])

    //Load the list of samples on the date selected
    useEffect(() => {
        if(selectedDate)
        {
            getAllSamplesOn(robotName, selectedDate)
            .then((response) => {
                setSamples(response.samples)
            }) 
            .then(setSelectedSample(false))
        }

    }, [selectedDate])

    return (
    <div className='bg-light-gray grow grid lg:grid-cols-7 lg:grid-rows-6 sm:grid-cols-1 sm:grid-rows-5 gap-6 p-10 sm:overflow-auto'>
        
        {/* Rover Widget */}
        <div className='card col-span-1 row-span-3'>

        </div>

        {/* Weather Widget */}
        <div className='card col-span-1 row-span-3 row-start-4'>
            {/* <WeatherReport /> */}
        </div>

        {/* Samples List widget */}
        <div className='card lg:col-span-2 row-span-6'>
            <SoiLSampleList selectedSample={selectedSample}
                            setSelectedSample={setSelectedSample}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            datesList={sampleDates}
                            samples={samples}/>
        </div>
        

        {/* Samples Map Widget */}
        <div className='card lg:col-span-4 row-span-3'>
            <SoilMap samples={samples} selectedSample={selectedSample} setSelectedSample={setSelectedSample}/>
        </div>

        {/* Sample Info Widget */}
        <div className='card lg:col-span-4 row-span-3'>
            <SoilSampleData soilSample={selectedSample}/>
        </div>

    </div>
    )
}

export default Dashboard

