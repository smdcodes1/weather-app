
import axios from "axios";
const WEATHER_API_KEY= process.env.REACT_APP_API_KEY;

export const fetchWeatherByCity = async (city) => {
  try {
    const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        units: "metric",
        appid: WEATHER_API_KEY,
      },
    }
  );
  return response.data;
  } catch (error) {
    console.log(error);
  }
};