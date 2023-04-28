import React, { useRef } from "react";
import { Joystick, JoystickShape } from 'react-joystick-component';

function Stick({socket, socketEvent, isX}) {
    const lastMessageTime = useRef(0)

    function handleMove(event) {
        const TIMEOUT_MS = 30;
        const timeMs = Date.now();
        if(timeMs - lastMessageTime.current >= TIMEOUT_MS) {
            const scalar = isX ? event.x.toFixed(2) : event.y.toFixed(2)

            socket.emit(socketEvent, {scalar: scalar})
            lastMessageTime.current = timeMs;
        }
    }

    function handleStop() {
        socket.emit(socketEvent, {scalar: 0})
    }

    return (
        <div className="my-auto h-full w-full flex">
            <div className="m-auto">
                <Joystick  stop={handleStop}
                            move={handleMove}
                            size={250}
                            stickSize={225}
                            sticky={false}
                            baseColor="#1C1C27"
                            stickColor="#3F4060"
                            baseShape={JoystickShape.Square}
                            stickShape={JoystickShape.Square}>

                </Joystick>
            </div>
        </div>
    )
}

export default Stick

