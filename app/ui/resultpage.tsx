"use client";

import Card from "./Card";
import InfoCard from "./InfoCard";
import PlaceCard from "./PlaceCard";

interface WeatherResult {
  city: string;
  weather: string;
  humidity: string;
  wind_speed: string;
  icon_weather: string;
  temp: string;
  suggestion: string;
  recommend_place: string[];
}

interface ResultPageProps {
  results: WeatherResult | null;
  
}

export default function ResultPage({ results }: ResultPageProps) {
  return (
    <div>
      <h1 className="text-xl font-bold tracking-tight text-gray-900">
        Weather in {results?.city}
      </h1>
      <div className="p-6">
        {/* Grid Container for Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card title='Weather' content={results?.weather} icon='/1.png' />
          <Card title='Wind' content={results?.wind_speed + ' Km/h'} icon='/4.png' />
          <Card title="Humidity" content={results?.humidity + ' RH'} icon="/3.png" />
          <Card title="Temperature" content={results?.temp + ' Celsius'} icon="/2.png" />
        </div>

        {/* New Row with Two InfoCards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoCard suggestion={results?.suggestion} />
          <PlaceCard places={results?.recommend_place}/>
        </div>
      </div>
    </div>
  );
}
