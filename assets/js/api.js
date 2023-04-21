var searchText=document.getElementById('search')
searchText.addEventListener('keydown',function(e)
{
    var cityName=e.target.value
    getTemperature(cityName)
})
async function getTemperature(cityName)
{
    if(cityName==null){
        var data=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2d75499f6ac24e8eba1193140231903&q=cairo&days=10&aqi=yes&alerts=no`)
    }
    else{
        var data=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2d75499f6ac24e8eba1193140231903&q=${cityName}&days=10&aqi=yes&alerts=no`)
    }
    var temp= await data.json()
    getCurrentTemperature(temp)
    getHourTemperature(temp)
    getrealfeel(temp)
    getChanceOfRain(temp)
    getWindSpeed(temp)
    getUvIndex(temp)
    getDayWeather(temp)
    cities(temp)
    

}
getTemperature()

function getCurrentTemperature(currentTemp)
{
    var city=`
    <div class='col-md-8'>
    <h1 class=" fw-bolder fs-1 text-dark" id="city">${currentTemp.location.name}</h1>
     <span class="time d-block mb-2 text-light">chance of Rain: ${currentTemp.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
     
    <div class='my-4 d-block'> <span class="text-white current-temp mt-4 me-5" class="mt-3 d-inline">${Math.round(currentTemp.current.temp_c)}°C</span>
     <span class="text-white  current-temp mt-4 ms-3" class="mt-3 d-inline">${Math.round(currentTemp.current.temp_f)}°F</span></div>
     <span class="time text-light me-3  ">Sun Rise: ${currentTemp.forecast.forecastday[0].astro.sunrise}</span>
     <span class="time text-light  ">Sun Set: ${currentTemp.forecast.forecastday[0].astro.sunset}</span>
    </div>
    <div class='col-md-4 p-0'>
    <img class='sun ' src='https://${currentTemp.forecast.forecastday[0].day.condition.icon}'>
    <h6 class="mt-3 text-light h5 ">${currentTemp.forecast.forecastday[0].day.condition.text}</h6> 
    </div>
     `
     document.getElementById('cityName').innerHTML=city
}
function getHourTemperature(hourTemp){
    var hourTempArr=hourTemp.forecast.forecastday[0].hour
    var box='';
   for(var i=0;i<10;i+=2){
    box+=`
    <div style="background-color: #4466c9;" class=" col-md mx-1 rounded my-1  text-center break ">
    <h6 class="my-2 time text-light">${hourTempArr[i].time} AM</h6>
    <img class='w-100 icon' src="https://${hourTempArr[i].condition.icon}" alt="" class="icon">
    <h6 class="mt-3 temperature">${Math.round(hourTempArr[i].temp_c)}°C</h6>                    
    <h6 class="mt-3 temperature">${Math.round(hourTempArr[i].temp_f)}°F</h6> 
    <h6 class="mt-3 text-light h5 ">${hourTempArr[i].condition.text}</h6> 
                    
    </div>
    
    
    `
   }
     document.getElementById('hourTemp').innerHTML=box;
}

function getrealfeel(realFeelTemp)
{
var realFeel=`
<div  class="mt-3 me-3" >
<i class="fa-solid fa-temperature-three-quarters text-muted temp-icon fa-2x "></i>
</div>
<div >
<h4 class="air-condition fs-4 text-secondary">Real Feel</h4>
<h5  class="temp text-info fs-5 mt-1">${Math.round(realFeelTemp.current.feelslike_c)}°C</h5>
</div>
`
document.getElementById('realFeel').innerHTML=realFeel
}

function getChanceOfRain(rain)
{
var rain=`
<div class=" me-3 mt-3 "><i class="fa-solid fa-droplet text-muted temp-icon fa-2x "></i>
</div>
<div>
    <h4 class="air-condition fs-4 text-secondary">Chance Of Rain</h4>
    <h5 class="temp text-info fs-5 mt-1">${rain.forecast.forecastday[0].day.daily_chance_of_rain}%</h5>
</div>
`
document.getElementById('rain').innerHTML=rain
}
function getWindSpeed(wind)
{
    
var wind=`
<div class="me-3 mt-3">
<i class="fa-solid fa-wind text-muted  temp-icon fa-2x ">
</i>
</div>
<div>
    <h4 class="air-condition fs-4 text-secondary">Wind</h4>
    <h5 class="temp text-info mt-1 fs-5">${wind.current.wind_kph} Km/h</h5>
</div>
`
document.getElementById('wind').innerHTML=wind
}
function getUvIndex(uv)
{
    console.log()
var uvIndex=`
<div class=" me-3 mt-3  "> <i class="fa-solid fa-sun text-muted temp-icon fa-2x "></i></div>
<div>
    <h4 class="air-condition fs-4 text-secondary">UV Index</h4>
    <h5 class="temp text-info mt-1 fs-5">${uv.current.uv}</h5>
</div>
`
document.getElementById('uvIndex').innerHTML=uvIndex
}
function getDayWeather(dayWeather)
{
    
    var dailyForecast='';
    
    for(var i=0;i<3;i++)
    {
 
    
            dailyForecast+=`
            <div class="col-md-12  py-4 my-3  d-flex  justify-content-between ">
                    <h6 class='text-light fw-bold'>${dayWeather.forecast.forecastday[i].date}</h6>
                    <img class=' daily-icon' src="https://${dayWeather.forecast.forecastday[i].day.condition.icon}" alt="" class="icon">
                       <h6 class='fw-bold day-temp text-light'>${dayWeather.forecast.forecastday[i].day.condition.text}</h6>
                       <span class='fw-bold day-temp text-light'>${Math.round(dayWeather.forecast.forecastday[i].day.avgtemp_c)}°C | ${Math.round(dayWeather.forecast.forecastday[i].day.avgtemp_f)}°F</span>
            </div>`
           
    }
     document.getElementById('dayWeather').innerHTML=dailyForecast
}



