"use client";
import { useState } from "react";
import { getWeather } from "./lib/weather";

export default function Home() {
  const [city, setCity] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");

  const handleSearch = async()=>{
    try{
      setLoading(true);
      setError("");
      const result = await getWeather(city);
      console.log(result);
      setData(result);
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
        <input className="input-box" placeholder="Enter City" value={city} onChange={(e)=>setCity(e.target.value)}></input>
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
      {loading && <p className="loading">loading...</p>}
      {err && <p className="error">{err}</p>}

      {data && (
        <div className="result">
          <h3>City: {data.address}</h3>
          <p><b>Temperature: </b>{data.currentConditions.temp}°C</p>
          <p><b>Wind Speed: </b>{data.currentConditions.windspeed}</p>
          <p><b>Condition: </b>{data.currentConditions.conditions}</p>
          <p><b>Description: </b>{data.description}</p>

          <div className="not-current">
            <div className="yesterday">
              <p><b>Temperature: </b>{data.days[0].temp}°C</p>
              <p><b>Wind Speed: </b>{data.days[0].windspeed}</p>
              <p><b>Condition: </b>{data.days[0].conditions}</p>
              <p><b>Description: </b>{data.days[0].description}</p>
            </div>
            <div className="tomorrow">
              <p><b>Temperature: </b>{data.days[2].temp}°C</p>
              <p><b>Wind Speed: </b>{data.days[2].windspeed}</p>
              <p><b>Condition: </b>{data.days[2].conditions}</p>
              <p><b>Description: </b>{data.days[2].description}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
