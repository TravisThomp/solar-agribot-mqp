import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import Button from './components/Button'
import Stick from './components/Joystick'

const socket = io()
import toast, { Toaster, resolveValue } from 'react-hot-toast';
import ValueAdjustmentBar from './components/ValueAdjustmentBar'

const BlankCard = () => {
    return (
        <div className='col-span-1 row-span-1'>
            <div className='aspect-square card w-5/6 mx-auto  my-auto '>
            </div>
        </div>
    )
}

const ToastBar = () => {
    return (
        <div className='col-span-2 row-span-1 w-full h-full'>
            {/* <Log /> */}
            <Toaster>
                {(t) => {
                    switch(t.type) {
                        case("error") :
                            return (
                            <div className='w-5/12 bg-transparent-red p-2 border-error-red border-opacity-100 border-2 text-error-red shadow-lg rounded-md'>
    
                            {resolveValue("❌ " + t.message, t)}
                            </div>)
                        default:
                            return (
                                <div className='w-5/12 bg-transparent-white p-2 border-info-white border-opacity-100 border-2 text-info-white shadow-lg rounded-md'>
        
                                {resolveValue("🦤 " + t.message, t)}
                                </div>
                            )
                    }

                }}
            </Toaster>;
        </div>
    )
}

const JoystickCard = ({isX}) => {
    return (
        <div className='col-span-1 row-span-1 '>
            <div className='aspect-square card w-5/6 mx-auto  my-auto'>
                {
                    isX ? 
                        <Stick socket={socket} socketEvent="rotational_velocity_update" isX={isX} />
                        :
                        <Stick socket={socket} socketEvent="forward_velocity_update" isX={isX} />
                }
            </div>
    </div>
    )
}

const ButtonPanel = ({buttons}) => {
    const MAX_BUTTONS = 8
    const num_buttons = buttons.length

    if(num_buttons> MAX_BUTTONS) {
        console.warn("TOO Many button attributes passed to the button panel!")
        buttons = buttons.slice(0, MAX_BUTTONS)
    }
    else if(num_buttons< MAX_BUTTONS) {
        for(let i = 0; i < MAX_BUTTONS - num_buttons; i++) {
            buttons.push({
                title: `Unassigned: ${i}`,
                socketEvent: "start_unassigned"
            })
        }
    }

    return (
    <div className='col-span-2 row-span-1'>
        <div className='grid grid-rows-2 grid-cols-4 h-full gap-2'>
            {buttons.map(button => <Button title={button.title} socketEvent={button.socketEvent} socket={socket} />)}

        </div>

    </div>
    )
}

const Logo = () => {
    return (
        <div className='col-span-4  text-center align-middle flex'>
            <div className='m-auto'>
                <h1 className='font-ohm text-dark-gray m-12'>Solar</h1>
                <h1 className='font-ohm text-dark-gray m-12'>Agribot</h1>
            </div>
    </div>
    )
}

const ButtonPanelSelector = ({isForwards, buttonPanelIndex, setButtonPanelIndex, max}) => {
    const updateIndex = () => {
        if(isForwards)
            if(buttonPanelIndex < max)
                setButtonPanelIndex(buttonPanelIndex + 1)
        else
            if(buttonPanelIndex > 0)
                setButtonPanelIndex(buttonPanelIndex - 1)
                
    }

    return (
        <div className="card bg-medium-purple w-[50px] h-[50px] flex justify-center ">
            {
                isForwards ?
                <h1 className="text-info-white" onClick={updateIndex}>{">"}</h1>
                :
                <h1 onClick={updateIndex}>{"<"}</h1>
            }
        </div>
    )
}

const buttonPanelArray = [[
    {
        title: 'Enable Pump',
        socketEvent: "enable_fertilization_pump"
    },
    {
        title: "Take Soil Sample",
        socketEvent: "start_soil_sample"            
    },
    {
        title: "",
        socketEvent: "none"            
    },
    {
        title: "Enable Drive",
        socketEvent: "enable_drive"            
    },
    {
        title: "Disable Pump",
        socketEvent: "disable_fertilization_pump"            
    },
    {
        title: "Test Radio",
        socketEvent: "test_radio"            
    },
    {
        title: "",
        socketEvent: "none"            
    },
    {
        title: "Disable Drive",
        socketEvent: "disable_drive"            
    },
],
[
    {
        title: 'Rotate +90',
        socketEvent: "rotate_+90"
    },
    {
        title: "1 Rotation Forward",
        socketEvent: "start_mm_f"            
    },
    {
        title: "3 Rotation Forward",
        socketEvent: "start_mm_f_3"            
    },
    {
        title: "Enable Drive",
        socketEvent: "enable_drive"            
    },
    {
        title: "Rotate -90",
        socketEvent: "rotate_-90"            
    },
    {
        title: "1 Rotation Backwards",
        socketEvent: "start_mm_b"            
    },
    {
        title: "3 Rotation Backwards",
        socketEvent: "start_mm_b_3"            
    },
    {
        title: "Disable Drive",
        socketEvent: "disable_drive"            
    },
]
]

const App = () => {
    
    const [isConnected, setIsConnected] = useState(socket.connected)
    
    const [fpid, setFpid] = useState([.3, 0, 0 ,0])

    const [buttonPanelIndex, setButtonPanelIndex] = useState(0)
    
    let buttons = buttonPanelArray[buttonPanelIndex]

    useEffect(() => {

        socket.on('connect', () => {
            setIsConnected(true)
            toast.success("Connected to Robot")
        })

        socket.on('disconnect', () => {
            setIsConnected(false)
            toast.error("Disconnected from Robot")
        })

        socket.on('set_controller_fpid', () => {
            


        })


        socket.on("message", (json) => {

            switch(json.type) {
                case("success"):
                    toast.success(json.message)
                    return
                case("error"):
                    toast.error(json.message)
                    return
            }
        })

        return () => {
            socket.off('connect')
            socket.off('disconnect') 
            socket.off("set_controller_fpid")
            socket.off('message') 
        }
    }, [])



    return (

        <div className='grow w-screen h-screen grid gap-4 p-4 grid-cols-4 grid-rows-3 max-w-screen-2xl mx-auto'>
            <div className='mx-auto'>
                <ValueAdjustmentBar name="kF" min={0} max={1} step={.01} defaultValue={fpid[0]} socket={socket} socketEvent={"set_kf"} />
                <ValueAdjustmentBar name="kP" min={0} max={1} step={.0001} defaultValue={fpid[1]}  socket={socket} socketEvent={"set_kp"} />
            </div>

            <ToastBar />
   
            <div className='mx-auto'>
                <ValueAdjustmentBar name="kI" min={0} max={1} step={.0001} defaultValue={fpid[2]} socket={socket} socketEvent={"set_ki"} />
                <ValueAdjustmentBar name="kD" min={0} max={1} step={.0001} defaultValue={fpid[3]} socket={socket} socketEvent={"set_kd"} />
            </div>

            <JoystickCard isX={false} />

            <ButtonPanel buttons={buttons} />
            
            
            <JoystickCard isX={true} />
            <Logo/>
            <ButtonPanelSelector isForwards={true} buttonPanelIndex={buttonPanelIndex} setButtonPanelIndex={setButtonPanelIndex} max={buttonPanelArray.length - 1}/>

        </div>
    )
}

export default App