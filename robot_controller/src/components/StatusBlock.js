import React, { useState, useEffect } from "react";

//TO-DO Formatting
const Status = ({name, socket, socketEvent}) => {

    const [status, setStatus] = useState('')
    
    useEffect(() => {
        socket.on(socketEvent, (responseJSON) => {
            setStatus(responseJSON.status)
        })

        return () => {
            socket.off(socketEvent)
        }
    }, [])

    return (
        <div className="bg-info-white bg-opacity-30 border-info-white border-2 border-opacity-100 m-2 px-2">
            {/* <div className="bg-error-red"> */}
                <h3 className="w-fit float-left">{ name }</h3>
                <h3 className="w-fit float-right">{ "test" }</h3>
            {/* </div> */}
        </div>
    )

}

const StatusBlock = ({socket}) => {

    return (
        <div className='bg-medium-purple col-span-2 row-span-2 rounded-3xl shadow-2xl grid grid-cols-1 grid-rows-5'>
            <Status name={"Robot Status"} socket={socket} socketEvent='robot-status'/>
            <Status name={"Robot Status"} socket={socket} socketEvent='robot-status'/>
            <Status name={"Robot Status"} socket={socket} socketEvent='robot-status'/>
            <Status name={"Robot Status"} socket={socket} socketEvent='robot-status'/>
            <Status name={"Robot Status"} socket={socket} socketEvent='robot-status'/>
        </div>
    )

}

export default StatusBlock