import { useState, useEffect, useRef } from 'react'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import humidity_icon from '../Assets/humidity.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import '../weather.css'


const Weather = () => {

  const inputRef = useRef()
  const [weatherData, setweatherData] = useState(false)

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04n": drizzle_icon,
    "04d": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon
  }

  const search = async (city) => {
    if (city === "") {
      alert("Pls Enter City Name")
      return
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
      const res = await fetch(url)
      const data = await res.json()

      if(!res.ok){
        alert("Pls enter a valid city")
        return
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon
      setweatherData({
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // m/s → km/h
        tempearture: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      })
      
    } catch (error) {
      setweatherData(false)
      console.error("Error in fecthing weather data")
    }
  }

  useEffect(() =>{
    search("")
  }, [])




  return (

        <div className='weather'>
            <div className='search-bar'>
                <input ref={inputRef} type="text" placeholder="Search" />
                <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)} />
            </div>
            <img src={weatherData.icon} alt="" className='weather-icon'/>
            <p className='temperature'>{weatherData.tempearture}°C</p>
            <p className='location'>{weatherData.location}</p>

            <div className="weather-data">

              <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                  <p>{weatherData.humidity} %</p>
                  <span>Humidity</span>
                </div>
              </div>

              <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                  <p>{weatherData.windSpeed} Km/h</p>
                  <span>Wind Speed</span>
                </div>
              </div>

            </div>
      </div>

  )
}

export default Weather