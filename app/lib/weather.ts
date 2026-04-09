export async function getWeather(city: string){
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate()-1);
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1);

    const formatDate = (date: Date) =>
    date.toISOString().split("T")[0];

    const start = formatDate(yesterday);
    const end = formatDate(tomorrow);

    const res = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}/${start}/${end}?unitGroup=metric&contentType=json&key=${apiKey}`,
        { cache: "no-store" }
    );
    if(!res.ok){
        throw new Error("Failed to fetch weather");
    }
    return res.json();
}