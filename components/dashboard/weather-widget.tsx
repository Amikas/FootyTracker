import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WeatherData {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  precipitation: number;
}

function getAdvice({ temperature, windspeed, precipitation }: WeatherData) {
  if (precipitation > 2) return { text: "Heavy rain – not ideal for football. Consider indoor training.", color: "text-red-400" };
  if (windspeed > 30) return { text: "Very windy – ball control will be difficult. Not a good time for technical drills.", color: "text-red-400" };
  if (windspeed > 15) return { text: "Windy – expect unpredictable ball movement.", color: "text-orange-400" };
  if (temperature < 5) return { text: "Very cold – warm up thoroughly and dress appropriately.", color: "text-orange-400" };
  if (temperature > 32) return { text: "Very hot – hydrate well and avoid peak sun hours.", color: "text-orange-400" };
  if (precipitation > 0.2) return { text: "Light rain – pitch may be slippery, adjust your footwear.", color: "text-orange-400" };
  return { text: "Conditions look good for football!", color: "text-green-400" };
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      () => {
        setError("Unable to retrieve your location.");
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    if (!location) return;
    setLoading(true);
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true&hourly=precipitation`
    )
      .then((res) => res.json())
      .then((data) => {
        const w = data.current_weather;
        // Precipitation: take the next hour's value if available
        let precipitation = 0;
        if (data.hourly && data.hourly.precipitation && data.hourly.precipitation.length > 0) {
          precipitation = data.hourly.precipitation[0];
        }
        setWeather({
          temperature: w.temperature,
          windspeed: w.windspeed,
          winddirection: w.winddirection,
          weathercode: w.weathercode,
          precipitation,
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch weather data.");
        setLoading(false);
      });
  }, [location]);

  return (
    <div className="">
      <Card className="shadow-lg border-blue-400">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2 text-foreground">
            <span role="img" aria-label="Weather">🌤️</span> Football Weather
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 flex flex-col gap-2">
          {loading ? (
            <div className="italic text-muted-foreground">Loading weather...</div>
          ) : error ? (
            <div className="italic text-destructive">{error}</div>
          ) : weather ? (
            <>
              <div className="font-semibold text-foreground">
                {weather.temperature}°C and Wind {weather.windspeed} km/h
              </div>
              <div className="text-sm text-foreground">
                {weather.precipitation > 0 ? `Rain: ${weather.precipitation} mm` : "No rain"}
              </div>
              <div className={`mt-2 font-bold ${getAdvice(weather).color} dark:${getAdvice(weather).color.replace("-400", "-300")}`}>
                {/* Ensures color is visible in both themes */}
                {getAdvice(weather).text}
              </div>
            </>
          ) : null}
          <Button
            size="sm"
            variant="outline"
            className="self-end mt-2 border-blue-400 text-foreground"
            onClick={() => location && setLocation({ ...location })}
          >
            Refresh
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
