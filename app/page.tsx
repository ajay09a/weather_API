"use client";
import { useState } from "react";
import { getWeather } from "./lib/weather";

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
  return (
    <main className="main">
      <h1 className="title">Weather App</h1>
      <div className="searchbar">
        <input className="input-box" placeholder="Enter City" value={city} onKeyDown={(e)=>{if(e.key === "Enter"){handleSearch()}}} onChange={(e)=>setCity(e.target.value)}></input>
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      {loading && <p className="loading">loading...</p>}
      {err && <p className="error">{err}</p>}
      {data && <h3>City: {data.address}</h3>}

      {data?.days?.map((day: any) => (
          <div key={day.datetime} className="result">
            <h3>{day.datetime}</h3>
            <p><b>Temperature: </b>{day.temp}°C</p>
            <p><b>Wind Speed: </b>{day.windspeed}</p>
            <p><b>Condition: </b>{day.conditions}</p>
            <p><b>Description: </b>{day.description}</p>
          </div>
        ))}
    </main>
  );
}
