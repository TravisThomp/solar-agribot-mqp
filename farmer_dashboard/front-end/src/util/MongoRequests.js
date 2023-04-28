const isDevServer = false;

const HOST_URL = 'YOUR_URL';

export const getAllSampleDates = async (robotName) => {
    return fetch(HOST_URL + `/samples/${robotName}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'applications/json'
        }
    })
    .then((res) => res.json())
}

export const getAllSamplesOn = async (robotName, date) => {
    return fetch(HOST_URL + `/samples/${robotName}/${date}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'applications/json'
        }
    })
    .then((res) => res.json())
    
}

export const getWeatherReport = async () => {
    return fetch(HOST_URL + '/weather-report', {
        method: 'GET',
        headers: {
            'Content-Type': 'applications/json'
        }
    })
    .then((res) => res.json())
}

export const login = async () => {
    return fetch(HOST_URL + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": "tnthompson@wpi.edu",
            "password": 'ILikeFish23!'
        })
    })
    .then((res) => res.json())
}