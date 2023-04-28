import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './style.css'

/**
 * Render the base application
 */
ReactDOM.render(
    //Strictmode helps highlight potential problems - remove for release build
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
    , 
    document.getElementById('root')
)