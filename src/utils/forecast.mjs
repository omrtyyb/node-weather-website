import fetch from "node-fetch";
const apiKey = "b5f81ec3038d627ce9b89d2bbfbb0090";
export async function getWeather(obj, callback) {
  try {
    const { lat, lon } = obj;
    const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response = await fetch(URL, { method: "GET" });
    const result = await response.json();
    const data = `in city of ${result.city.name} of ${result.city.country} the temrature is ${result.list[0].main.temp} and it feels like ${result.list[0].main.feels_like} and the weather is ${result.list[0].weather[0].main} and it is acutally ${result.list[0].weather[0].description}`
    callback(data, null);
  } catch (error) {
    callback(null, error);
  }
}
