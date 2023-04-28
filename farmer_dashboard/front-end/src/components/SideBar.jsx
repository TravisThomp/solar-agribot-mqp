import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { GiTrackedRobot } from "react-icons/gi";
import { AiOutlineDashboard, AiOutlinePieChart, AiOutlineInfoCircle } from 'react-icons/ai'
import { BiLogOut} from 'react-icons/bi'
import axios from 'axios';


const SideBarIcon = ({route}) => {
    const [isHovering, setIsHovering] = useState(false)

    //Checking if icon is for the current page open
    let isLocation = useLocation().pathname == route.to

    return (<li className='py-8' key={route.displayName}>
                <NavLink className="grid grid-cols2 " to={route.to} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                    <span className={'mx-auto w-16 p-2.5 rounded-lg' + ((isLocation) ? ' bg-light-green' : '') + (!isLocation && isHovering ? ' bg-light-gray' : '')}>
                        {route.icon}
                    </span>
                    <span className='text-center text-xs font-semibold'>{route.displayName}</span>
                </NavLink>
            </li>)
}

const LogoutButton = ({setLoggedIn}) => {
    const [isHovering, setIsHovering] = useState(false)

    const onButtonClick = async (event) => {
        
        try {
            const res = await axios.post('/logout', {})
            setLoggedIn(false)
    
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <li className='py-8' key='logout'>
            <button className='grid grid-cols2 mx-auto ' onClick={onButtonClick} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>

                <span className={'mx-auto w-16 p-2.5 rounded-lg' + (isHovering ? ' bg-light-gray' : '')}>
                    <BiLogOut className="mx-auto text-4xl"/>
                </span>
                <span className="text-center text-xs font-semibold">{"Logout"}</span>

            </button>
        </li>
        
    )
}

export const SideBar = ({setLoggedIn}) => {

    //List of pages to load
    const routes = [
        {
            displayName: 'Dashboard',
            to: '/',
            icon: <AiOutlineDashboard className="mx-auto text-4xl"/>
        },
        {
            displayName: 'Statistics',
            to: '/statistics',            icon: <AiOutlinePieChart className="mx-auto text-4xl"/>
        },
        {
            displayName: 'About',
            to: '/about',
            icon: <AiOutlineInfoCircle className="mx-auto text-4xl"/>
        },
    ]

    return (
    <nav className="bg-white h-screen w-20">
        <ul className='align-middle'>
            {/* Website Icon */}
            <li className='mt-5 mb-24 '>
                <GiTrackedRobot className='mx-auto text-4xl'/>
            </li>
            
            {/* Creating icon for each page */}
            {routes.map((route) => (
              <SideBarIcon key={route.displayName} route={route}/>
            ))} 

            <LogoutButton setLoggedIn={setLoggedIn}/>
        </ul>
    </nav>
    )
  }
  
  export default SideBar