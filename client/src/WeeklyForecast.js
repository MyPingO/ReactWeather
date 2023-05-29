import React from 'react';
import WeatherCard from './WeatherCard';

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const date = new Date();
let DAY = weekday[date.getDay()];
function WeeklyForecast(props) {
    // const defaultWeatherData = props.data.default;
    const oneClickWeatherData = props.weatherData;
    const location = props.location;

    function renderWeeklyReport() {
        //store array of WeatherCard components
        const weatherCards = [];
        for (let i = 1; i < 8; i++) {
            const day = weekday[(DAY + i) % 7];
            const className = "dailyCard";
            const dailyData = oneClickWeatherData.daily[i];
            //get description and make every word capitalized
            const description = dailyData.weather[0].description;
            const descriptionArray = description.split(" ");
            for (let i = 0; i < descriptionArray.length; i++) {
                descriptionArray[i] = descriptionArray[i].charAt(0).toUpperCase() + descriptionArray[i].slice(1);
            }
            dailyData.weather[0].description = descriptionArray.join(" ");
            const dailyTemp = dailyData.temp.day.toFixed(1);
            const dailyFeelsLike = dailyData.feels_like.day.toFixed(1);
            const dailyTempFahrenheit = ((dailyTemp * 9 / 5) + 32).toFixed(0);
            const dailyFeelsLikeFahrenheit = ((dailyFeelsLike * 9 / 5) + 32).toFixed(0);
            const weatherCard = <WeatherCard key={i} props={{
                day,
                dailyData,
                dailyTemp,
                dailyFeelsLike,
                dailyTempFahrenheit,
                dailyFeelsLikeFahrenheit,
                className
            }} />
            weatherCards.push(weatherCard);
        }
        //return a map of WeatherCard components
        return weatherCards.map((weatherCard) => {
            return weatherCard;
        })
    }
    if (oneClickWeatherData && location) {
        return (
            /* <h2 className="temperature">{temperatureCelcius}°C / {temperatureFahrenheit}°F</h2>
            <h2 className="feelsLike">Feels like: {feelsLikeCelcius}°C / {feelsLikeFahrenheit}°F</h2> */
            <div className="weeklyReport">
                {renderWeeklyReport()}
            </div>
        )
    }
}


export default React.memo(WeeklyForecast);