import { useEffect, useState } from "react";

const Slider = ({value, setValue, min, max, step}) => {

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return (
        <div className="flex justify-center pb-2">
            <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={handleChange}
            className="appearance-none w-64 h-3 bg-medium-purple rounded-full outline-none"
            />
        </div>
    )
}

const Counter = ({value}) => {
    return (
        <div className='text-center w-[90px]'>
            <h4 className='font-regular text-white'>{value}</h4>
        </div>
    )
}

const ValueAugmentButton = ({value, setValue, step, increase}) => {
    const onClick = (event) => {
        setValue(increase ? (Number(value) + step).toFixed(4) : (Number(value) - step).toFixed(4))
    }

    return (
        <button className="card w-[45px] h-[45px] mx-auto font-regular text-white p-6 flex items-center justify-center" 
        onClick={onClick}>
            { increase ? "+" : "-" }
        </button>
    )

}

const ValueAdjustmentBar = ({name, min, max, step, defaultValue, socket, socketEvent}) => {

    const [value, setValue] = useState(defaultValue)
    const [socketTimeout, setSocketTimeout] = useState(0)


    useEffect(() => {
        //Value boundary check
        if(value > max)
            setValue(max)
        else if(value < min)
            setValue(min)
        
        //Limits sending unnecessary data to robot
        clearTimeout(socketTimeout)
        setSocketTimeout(setTimeout(() => {
            socket.emit(socketEvent, {value: value})
        }, 150))
        

    }, [value])

    
    return (
        <div className='mx-auto'>
            <div className='text-center'>
                <h4 className='font-regular text-white pb-2'>{name}</h4>

            </div>
            <Slider value={value} setValue={setValue} min={min} max={max} step={step}/>
            <div className='flex items-center'>
                <ValueAugmentButton value={value} setValue={setValue} step={step} increase={false}/>
                <Counter value={value}/>
                <ValueAugmentButton value={value} setValue={setValue} step={step} increase={true}/>
            </div>
             


        </div>
    )
}

export default ValueAdjustmentBar