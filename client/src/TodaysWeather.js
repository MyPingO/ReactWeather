import React from 'react';
import TodaysWeatherCard from './TodaysWeatherCard';

function TodaysWeather(props) {
    // const defaultWeatherData = props.data.default;
    const oneClickWeatherData = props.weatherData;
    const location = props.location;
    function renderTodaysWeather() {
        const className = "todaysCard"
        const day = "Today";
        const dailyData = oneClickWeatherData.daily[0];
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
        const todaysWeatherCard = <TodaysWeatherCard key={0} props={{
            day,
            dailyData,
            dailyTemp,
            dailyFeelsLike,
            dailyTempFahrenheit,
            dailyFeelsLikeFahrenheit,
            location,
            className
        }} />
        return todaysWeatherCard;
    }
    if (oneClickWeatherData && location) {
        return (
            renderTodaysWeather()
        )
    }
}
export default React.memo(TodaysWeather);