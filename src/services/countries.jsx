import axios from "axios";

const getEach = (name) => {
    const promise = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
    return promise.then(response => response.data)
}

const getAll = () => {
    const promise = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    return promise.then(response => response.data)
}

// const getAllSim = () => {
//     const promise = Promise.all([
//         axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`),
//         axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Finland&APPID=cde7801aba475d0bf67f925c38b27c81`)
//     ])

//     // return an array of two objects, each being the result of the two res data
//     return promise.then(res => res.map(res => res.data))

// }

export default { getEach, getAll }