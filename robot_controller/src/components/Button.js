import React from "react";

const Button = ({title, socket, socketEvent}) => {
    const onButtonClick = () => {
        socket.emit(socketEvent)
    }

    return (
        <div className="h-full text-center">
            <button className="card aspect-square h-full mx-auto font-regular text-white p-4" 
                    onClick={onButtonClick}>
                { title }
            </button>
        </div>
    )
}

export default Button