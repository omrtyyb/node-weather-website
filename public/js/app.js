console.log("client side js is loaded");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const newElement = document.createElement('h3')
weatherForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const location = search.value;
  //use the getlatLan function here??
  try {
    const res = await getLatLon(location);
    // console.log(res);
    try{
      const weather = await getWeather(res)
      newElement.textContent=`In ${weather.city} of ${weather.country} the temprature is ${weather.temperature} and it feels like ${weather.feelsLike} and it is ${weather.moreDescription}`
      weatherForm.appendChild(newElement)
    }catch(e){
      console.log(e)
    }

  } catch (e) {
    console.error("error fetching data from api", e);
  }
});

async function getLatLon(location) {
  const encodedText = encodeURIComponent(location);
  const geoCodeURL = `https://api.geoapify.com/v1/geocode/search?text=${encodedText}&apiKey=c4ed2a49e68d4363b7d8af6c2e8b209b`;

  try {
    const response = await fetch(geoCodeURL, { method: "GET" });
    if (!response.ok) {
      throw new Error(`HTTP status🚶‍♀️🚶‍♀️🚶‍♀️ ${response.status}`);
    }
    const result = await response.json();
    const latLon={
        lat:  result.features[0].properties.lat,
        lon:  result.features[0].properties.lon
    }
    return latLon
  } catch (e) {
    console.error(`error fetching geocode data 🛑🛑`, e);
    throw e;
  }
}



async function getWeather(latLonObject){
  const apiKey = "b5f81ec3038d627ce9b89d2bbfbb0090";
  const {lat,lon}=latLonObject
  const URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  try{
    const response= await fetch(URL, {method:"GET"})
    if(!response.ok){
      throw new Error(`HTTP status : ${response.status}🔥🔥`)
    }
    const data = await response.json()
    const objectToReturn={
      city: data.city.name,
      country: data.city.country,
      temperature: data.list[0].main.temp,
      feelsLike: data.list[0].main.feels_like,
      description: data.list[0].weather[0].main,
      moreDescription: data.list[0].weather[0].description
    }
    return objectToReturn
  }catch(e){
    console.log(e)
  }

}