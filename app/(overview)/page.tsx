"use client";

import { useState } from "react";
import Search from "../ui/search";
import ResultPage from "../ui/resultpage";
import LoadingSkeletons from "../ui/skeletons";
import { GoogleGenerativeAI } from "@google/generative-ai";

const result = {
  request: {
    type: "City",
    query: "Kabupaten, Indonesia",
    language: "en",
    unit: "m",
  },
  location: {
    name: "Kabupaten",
    country: "Indonesia",
    region: "West Java",
    lat: "-6.711",
    lon: "108.560",
    timezone_id: "Asia/Jakarta",
    localtime: "2024-08-31 10:29",
    localtime_epoch: 1725100140,
    utc_offset: "7.0",
  },
  current: {
    observation_time: "03:29 AM",
    temperature: 30,
    weather_code: 113,
    weather_icons: [
      "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png",
    ],
    weather_descriptions: ["Sunny"],
    wind_speed: 12,
    wind_degree: 158,
    wind_dir: "SSE",
    pressure: 1012,
    precip: 0,
    humidity: 48,
    cloudcover: 7,
    feelslike: 32,
    uv_index: 9,
    visibility: 10,
    is_day: "yes",
  },
};

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

const apiGemini = process.env.NEXT_PUBLIC_API_1_KEY;
const apiWeather = process.env.NEXT_PUBLIC_API_2_KEY;

if (!apiGemini) {
  throw new Error("API key for Gemini is not defined in environment variables");
}

const genAI = new GoogleGenerativeAI(apiGemini);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function EHome() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<WeatherResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean | null>(true); // Set to null initially


  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setLoading(true); // Set loading to true when starting the fetch
    setSuccess(null); // Reset success to null while fetching
    try {
      const res = await fetch(`https://api.weatherstack.com/current?access_key=${apiWeather}&query=${query}`);
      const data = await res.json();
      const prompt = `make activity recommendations based on the weather and environmental data attached below. make a maximum of 3-4 sentences. then based on the location in the data, provide recommendations for the nearest famous places in that location. send the answer in the form of a json object with the suggestion and recommended_place properties. make sure dont write any text except the json data :${JSON.stringify(data)}`;
      const result = await model.generateContent(prompt);
      const jsonTextMatch = result.response.text().match(/\{.*\}/);
      if(jsonTextMatch && jsonTextMatch[0]){
        const textJson = JSON.parse(jsonTextMatch[0]);
        console.log(textJson);
        if (res.ok && data.current) {
          setResults({
            city: data.location.name,
            weather: data.current.weather_descriptions[0],
            humidity: data.current.humidity,
            wind_speed: data.current.wind_speed,
            temp: data.current.temperature,
            icon_weather: data.current.weather_icons[0],
            suggestion: textJson.suggestion,
            recommend_place: textJson.recommended_place,
          });
          setSuccess(true);
        } else {
          setSuccess(false); // Handle API error
        }
      }


    } catch (error) {
      setSuccess(false); // Handle fetch error
    } finally {
      setLoading(false); // Set loading to false regardless of success or error
    }
  };

  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80`}
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-12 sm:py-24 lg:py-32">
          {" "}
          {/* Adjusted padding */}
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Weather App v.2
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">By: Alfthr</p>
            {!searchQuery ? (
              <>
                <Search onSearch={handleSearch} />
              </>
            ) : (
              <>
                {loading ? (
                  <LoadingSkeletons /> // Display loading skeletons while loading
                ) : (
                  <>
                    {success === true ? (
                      <div className="pt-6">
                        {" "}
                        {/* Add top padding to move content down */}
                        <ResultPage results={results} />
                      </div>
                    ) : success === false ? (
                      <p className="text-red-500 pt-6">
                        Location not found, please try again
                      </p>
                    ) : null}
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mt-6 rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      Search Again
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
