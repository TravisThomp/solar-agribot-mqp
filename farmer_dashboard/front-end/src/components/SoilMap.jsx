import React, { useCallback, useMemo, useState } from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

function SoilMap({samples, selectedSample, setSelectedSample}) {
    if(samples.length < 1)
        return <></>

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBUmsDcwEOCaVZ6jjGOqXKk9lzxBu00Zvo"
    })

    //stops map from recentering itself
    //Generating center at average of point locations
    const center = useMemo(() => ({ 
        lat: samples.map(sample => sample.longitude).reduce((a, b) => a + b, 0)/samples.length,
        lng: samples.map(sample => sample.latitude).reduce((a, b) => a + b, 0)/samples.length}), [samples])

    const defaultMapOptions = {
        fullscreenControl: false,
        streetViewControl: false,
        mapTypeControl: false,
      };
      
    const renderMap = () => {

        return (<GoogleMap
            zoom={18}
            center={center}
            mapContainerClassName='map'
            clickableIcons={false}
            options={defaultMapOptions}
        >   
        {/* To-Do find better loading method */}
            {samples.map(sample => (
                <Marker 
                    key={sample.id}
                    icon={(sample.id == selectedSample.id) ? 
                        {url : 'http://localhost:3000/map_icon_selected.svg',
                        scaledSize: new window.google.maps.Size(35, 35)} 
                        : 
                        {url : 'http://localhost:3000/map_icon.svg',
                        scaledSize: new window.google.maps.Size(30, 30)}}
                    position={{ lat: sample.longitude, lng:sample.latitude }}
                    title={`Sample - ${sample.id}`}
                    onClick={() => {setSelectedSample(sample)}}
                />
            ))}

        </GoogleMap>)
    }

    return isLoaded ? renderMap() : <h1>Loading...</h1>
}


export default SoilMap