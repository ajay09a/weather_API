export async function getWeather(city: string){
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const res = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=metric&contentType=json&key=${apiKey}`,
        { cache: "no-store" }
    );
    if(!res.ok){
        throw new Error("Failed to fetch weather");
    }
    return res.json();
}