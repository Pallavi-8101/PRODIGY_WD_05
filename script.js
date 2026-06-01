const apiKey = "c04c93cf8d064ca2a17132633260106";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");

const city = document.getElementById("city");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const weatherIcon = document.getElementById("weatherIcon");

const weatherInfo = document.getElementById("weatherInfo");
const loading = document.getElementById("loading");
const forecastContainer = document.getElementById("forecastContainer");

async function getWeather(location){

try{

loading.style.display="block";
weatherInfo.style.display="none";

const response = await fetch(
`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5&aqi=yes&alerts=no`
);

const data = await response.json();

if(data.error){
alert(data.error.message);
loading.style.display="none";
return;
}

displayWeather(data);

}catch(error){

loading.style.display="none";
console.log(error);
alert("Unable to fetch weather");

}
}

function displayWeather(data){

loading.style.display="none";
weatherInfo.style.display="block";

city.innerText=
`${data.location.name}, ${data.location.country}`;

temp.innerText=
`${Math.round(data.current.temp_c)}°C`;

condition.innerText=
data.current.condition.text;

humidity.innerText=
`${data.current.humidity}%`;

wind.innerText=
`${data.current.wind_kph} km/h`;

feelsLike.innerText=
`${Math.round(data.current.feelslike_c)}°C`;

weatherIcon.src=
"https:" + data.current.condition.icon;

forecastContainer.innerHTML="";

data.forecast.forecastday.forEach(day=>{

const date=new Date(day.date);

forecastContainer.innerHTML+=`
<div class="forecast-card">
<p>${date.toLocaleDateString('en-US',{weekday:'short'})}</p>
<img src="https:${day.day.condition.icon}">
<h4>${Math.round(day.day.avgtemp_c)}°C</h4>
</div>
`;

});

}

searchBtn.addEventListener("click",()=>{

const value=cityInput.value.trim();

if(value){
getWeather(value);
}

});

cityInput.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){

const value=cityInput.value.trim();

if(value){
getWeather(value);
}

}

});

locationBtn.addEventListener("click",()=>{

navigator.geolocation.getCurrentPosition(

(position)=>{

const lat=position.coords.latitude;
const lon=position.coords.longitude;

getWeather(`${lat},${lon}`);

},

()=>{
alert("Location access denied");
}

);

});

function updateTime(){

const now=new Date();

document.getElementById("dateTime").innerHTML=
now.toLocaleString();

}

setInterval(updateTime,1000);

updateTime();

document.getElementById("themeToggle")
.addEventListener("click",()=>{

document.body.classList.toggle("dark");

});

getWeather("Hyderabad");