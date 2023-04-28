import React, { useEffect, useState } from "react";
import {Navigate, NavLink, Route, Routes, useLocation } from "react-router-dom";

import About from "./pages/dashboard/About";
import Dashboard from "./pages/dashboard/Dashboard";
import Statistics from "./pages/dashboard/Statistics";

import SideBar from "./components/SideBar";
import LoginForm from "./pages/login/LoginForm";
import axios from "axios";

const ProtectedRoute = ({isLoggedIn, setLoggedIn, children}) => {
    if(!isLoggedIn)
        return <Navigate to='/login' isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
    
    return children
}

function App()
{
    const [isLoggedIn, setLoggedIn] = useState(false)

    //checking login state of user
    useEffect(async () => {
        try {
            const res = await axios.get('/check-logged-in', {})
            setLoggedIn(true)
        } catch (err) {
            setLoggedIn(false)
        }
    }, [isLoggedIn])

    return (
        <div className='flex select-none h-screen'>
            {/* TO-DO: Move sidebar to top on smaller screens */}
        

         {isLoggedIn &&
            (<>
                <SideBar setLoggedIn={setLoggedIn}/>
            </>) 
        }
            <Routes>
                <Route path='/' element={
                    <ProtectedRoute isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} >
                        <Dashboard/>
                    </ProtectedRoute>
                    }
                />
                <Route path='/dashboard' element={
                    <ProtectedRoute isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} >
                        <Dashboard/>
                    </ProtectedRoute>
                    }
                />
                <Route path='/statistics' element={
                    <ProtectedRoute isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} >
                        <Statistics/>
                    </ProtectedRoute>
                    }
                />
                <Route path='/about' element={
                    <ProtectedRoute isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} >
                        <About/>
                    </ProtectedRoute>
                    }
                />
                <Route path='/login' element={<LoginForm  isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>} />
            </Routes> 

        </div>
    )
}

export default App