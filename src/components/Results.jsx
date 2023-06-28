import axios from "axios";
import { useState } from "react";
import countryService from "../services/countries";

const Results = ({ countryList, curResult }) => {

    const apiKey = import.meta.env.VITE_API_KEY
    const [draw, setDraw] = useState('')
    const [weather, setWeather] = useState('')
  
    if (countryList.length > 10) return <p>Too many matches, specify another filter</p>
  
    if (countryList.length === 0 && curResult) return <p>Nothing matches your search try again</p>
  
    if (countryList.length < 2 && curResult) {
      //destructuring countryList to make it more elegant
      const [ country ] = countryList;
      const getWeatherRes = async () => {
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.name.common}&APPID=${apiKey}`)
          setWeather(response.data);
      }

      getWeatherRes()

      const obj = Object.values(country.languages)
      if(weather) {
        //return country with weather details once its been set - retrieved from req to open weather api
          return (
              <>
                  <h1>{country.name.common}</h1>
                  <p>Capital:{"  "}{country.capital[0]}</p>
                  <p>Area:{"  "}{country.area}</p>
                  {obj.map((each, index) => <p key={index}>{each}</p>)}
                  <p>Flag:{country.flag} </p>
      
                  <h2>Weather data</h2>
                  <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="" />
                  <p>Temperature ~ {Math.round((weather.main.temp - 32) * 5/9)} °Celsius</p>
                  <p>Wind: {weather.wind.speed} m/s</p>
              </>
          )
      }else{
          return <div>Getting weather data....</div>
      }

    } else {

      return (
        <>
          {countryList.map((each, index) => {
            return (
              <div key={index} className='card'>
                <span>{each.name.common}</span>
                <button onClick={() => countryService.getEach(each.name.common).then(response => setDraw(response))}>Show</button>
              </div>
            )
            }
          )}
          
          {draw ? <Result each={draw} /> : ""}
        </>
      )
    }
    
  }
  
  const Result = ({ each }) => {
    const langs = Object.values(each.languages)
    return (
      <>
      <hr/>
        <div>
          <p>{each.name.common}</p>
          <p>Capital: {each.capital[0]}</p>
          <p>Area: {each.area}</p>
          <p>Languages:</p>
          {langs.map((lang, index) => <p key={index}>{lang}</p>)}
          <p>Flag: {each.flag}</p>
        </div>
      </>
    )
  }
  

export default Results