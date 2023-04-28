import React, { useEffect, useState } from "react";
import { getWeatherReport } from "../util/MongoRequests";
import { TiWeatherCloudy, TiWeatherPartlySunny, TiWeatherShower, TiWeatherSnow, TiWeatherStormy, TiWeatherSunny, TiWeatherWindyCloudy } from 'react-icons/ti'

/**
 * Retrieves the appropriate icon for the weather condition
 * @param {the weather condition} condition 
 * @returns The icon for the weather condition
 */
const getIcon = (condition) => {

    const icon_classes = "mx-auto text-5xl"
    switch(condition)
    {
        case ("sunny"):
            return <TiWeatherSunny className={icon_classes}/>

        case ("partly-sunny"):
            return <TiWeatherPartlySunny className={icon_classes}/>

        case ("cloudy"):
            return <TiWeatherCloudy className={icon_classes}/>

        case ("shower"):
            return <TiWeatherShower className={icon_classes}/>

        case ("snow"):
            return <TiWeatherSnow className={icon_classes}/>

        case ("stormy"):
            return <TiWeatherStormy className={icon_classes}/>

        case ("windy"):
            return <TiWeatherWindyCloudy className={icon_classes}/>
    }
    return <></>
}

const WeatherReport = () => {
    const [report, setReport] = useState(0)

    // Loading Report Data
    useEffect(() => {
        getWeatherReport()
        .then(result => {

            setReport({
                today: {
                    temperature: result.today.temperature,
                    icon: getIcon(result.today.condition)
                },
                tomorrow : {
                    temperature: result.tomorrow.temperature,
                    icon: getIcon(result.tomorrow.condition)
                }
            })
        })
    }, [])

    // Check if report has loaded
    if(!report) {
        return <></>
    }

    return (
        <div className="text-center grid grid-cols-1 grid-rows-2 h-full py-11">
            
            {/* Todays Weather */}
            <div className="my-auto">
                {/* Title */}
                <h1 className="text-3xl">Today</h1>
                {/* Icon */}
                {report.today.icon}
                {/* Temperature */}
                <h2>{report.today.temperature + '°F'}</h2>
            </div>
            
            {/* Tomorrows Weather */}
            <div className="my-auto">
                {/* Title */}
                <h1 className="text-3xl">Tomorrow</h1>
                {/* Icon */}
                {report.tomorrow.icon}
                {/* Temperature */}
                <h2>{report.tomorrow.temperature + '°F'}</h2>
            </div>
        </div>
    )
}

export default WeatherReport