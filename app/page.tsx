"use client";
import { useState } from "react";
import { getWeather } from "./lib/weather";
import "./globals.css"

export default function Home() {
  const [city, setCity] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");

  const handleSearch = async()=>{
    if(!city.trim()){
      setData(null);
      setError("Please enter a city");
      return;
    }
    try{
      setLoading(true);
      setError("");
      const result = await getWeather(city);
      console.log(result);
      setData(result);
      setCity("");
    }
    catch(err){
      setError("city not found");
    }
    finally{
      setLoading(false);
    }
  }

  const today = new Date().toISOString().split("T")[0];
  const todayData = data?.days?.find((d: any) => d.datetime === today);
  const otherDays = data?.days?.filter((d: any) => d.datetime !== today);

  
  return (
    <main className="main">
      <h1 className="title">Weather App</h1>
      <div className="searchbar">
        <input className="input-box" placeholder="Enter City" value={city} onKeyDown={(e)=>{if(e.key === "Enter"){handleSearch()}}} onChange={(e)=>setCity(e.target.value)}></input>
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      {loading && <p className="loading">loading...</p>}
      {err && <p className="error">{err}</p>}
      
      {data && (
        <div className="weather-container">
          <h2 className="city-name">{data.address}</h2>

          {todayData && (
            <div className="today-card">
              <h3>Today</h3>
              <p className="temp">{todayData.temp}°C</p>
              <p>{todayData.conditions}</p>
              <p>💨 {todayData.windspeed} km/h</p>
            </div>
          )}

          <div className="other-days">
            {otherDays?.map((day: any) => (
              <div key={day.datetime} className="day-card">
                <h4>{day.datetime}</h4>
                <p>{day.temp}°C</p>
                <p>{day.conditions}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
