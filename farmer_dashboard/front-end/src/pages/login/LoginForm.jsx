import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginForm = ({isLoggedIn, setLoggedIn}) =>
{
        
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState(null)


    useEffect(() => {
        if(isLoggedIn) {
            return <Navigate to='/dashboard' replace={true} />
        }
    }, [isLoggedIn])

    const onSubmit = async (event) => {
        console.debug('submit')
        event.preventDefault()
        try {
            const res = await axios.post('/login', { email, password })
            setLoggedIn(true)

        } catch (err) {
            setLoggedIn(false)
        }
    }

    return (


        <div className='bg-white align-center m-auto p-4 rounded-2xl'>
            {isLoggedIn && <Navigate to='/dashboard' replace={true} /> }
            <h1>Login Page</h1>
            <form onSubmit={onSubmit}>
                <label>
                    <p className='mt-4'>Email:</p>
                    <input className="bg-light-gray w-full" type="email" value={email} onChange={ (event) => { setEmail(event.target.value)} }/>
                </label>
                <label >
                    <p className="mt-4">Password</p>
                    <input className="bg-light-gray w-full" type="password" value={password} onChange={ (event) => { setPassword(event.target.value)} }/>
                </label>
                <button className='bg-light-green p-2 mt-4 rounded-md mx-auto text-center hover:bg-darker-green' type="submit">Login</button>
            </form>
        </div>
    )
}

export default LoginForm