import './App.css';
import React from 'react';

let temperatureCelcius;
let feelsLikeCelcius;
let temperatureFahrenheit;
let feelsLikeFahrenheit;
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const date = new Date();
let day = weekday[date.getDay()];
function WeatherData(props) {
    // const defaultWeatherData = props.data.default;
    const oneClickWeatherData = props.weatherData;
    const location = props.location;
    function setWeatherStats() {
        temperatureCelcius = oneClickWeatherData.current.temp.toFixed(1);
        feelsLikeCelcius = oneClickWeatherData.current.feels_like.toFixed(1);
        temperatureFahrenheit = ((temperatureCelcius * 9 / 5) + 32).toFixed(0);
        feelsLikeFahrenheit = ((feelsLikeCelcius * 9 / 5) + 32).toFixed(0);
    }
    function renderWeeklyReport() {
        console.log("RENDERING WEEKLY REPORT");
        console.log(oneClickWeatherData);
        //store array of DailyWeatherWidget components
        const dailyWeatherWidgets = [];
        for (let i = 0; i < 8; i++) {
            const day = (i == 0) ? "Today" : weekday[(date.getDay() + i) % 7];
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
            const dailyWeatherWidget = <DailyWeatherWidget key={i} props={{ day, dailyData, dailyTemp, dailyFeelsLike, dailyTempFahrenheit, dailyFeelsLikeFahrenheit }} />
            dailyWeatherWidgets.push(dailyWeatherWidget);
        }
        //return a map of DailyWeatherWidget components
        return dailyWeatherWidgets.map((dailyWeatherWidget) => {
            return dailyWeatherWidget;
        })
    }
    if (oneClickWeatherData && location) {
        setWeatherStats();

        return (
            <div className="weatherReport">
                <h2>{location}</h2>
                <br />
                {/* <h2 className="temperature">{temperatureCelcius}°C / {temperatureFahrenheit}°F</h2>
                <h2 className="feelsLike">Feels like: {feelsLikeCelcius}°C / {feelsLikeFahrenheit}°F</h2> */}
                <div className="weeklyReport">
                    {renderWeeklyReport()}
                </div>
            </div>
        )
    }
}

function DailyWeatherWidget(props) {
    const data = props.props;
    const day = data.day;
    const dailyData = data.dailyData;
    const dailyTemp = data.dailyTemp;
    const dailyFeelsLike = data.dailyFeelsLike;
    const dailyTempFahrenheit = data.dailyTempFahrenheit;
    const dailyFeelsLikeFahrenheit = data.dailyFeelsLikeFahrenheit;

    function getRainIcon(rainData) {
        console.log("RAIN DATA: " + rainData);
        if (rainData < 10) {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cloud-rain-fill weatherIcon rainIcon" viewBox="0 0 16 16">
                    <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 1 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317zm3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317zm.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973z" />
                </svg>
            )
        }
        else {
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cloud-rain-heavy-fill weatherIcon rainIcon" viewBox="0 0 16 16">
                    <path d="M4.176 11.032a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm3 0a.5.5 0 0 1 .292.643l-1.5 4a.5.5 0 0 1-.936-.35l1.5-4a.5.5 0 0 1 .644-.293zm.229-7.005a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 10H13a3 3 0 0 0 .405-5.973z" />
                </svg>
            )
        }
    }

    return data ? (
        //TODO: check for all weather description types
        //bootstrap card containing weather data for each day
        <div className={"card " + (dailyData.weather[0].description).replaceAll(" ", '')}>
            <div className="card-body">
                <h4 className="card-title">{day}</h4>
                <div className='mainWeather'>
                    <h5 className="card-subtitle">{dailyTemp}°C / {dailyTempFahrenheit}°F
                    </h5>
                    <img className="card-img-top" src={`http://openweathermap.org/img/wn/${dailyData.weather[0].icon}.png`} alt="weather icon" style={{ width: "64px", alignSelf: "flex-end" }} />
                </div>
                <p className="card-text description">
                    {dailyData.weather[0].description} <br />
                    {/* Feels like: {dailyFeelsLike}°C / {dailyFeelsLikeFahrenheit}°F<br /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-droplet-half weatherIcon" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M7.21.8C7.69.295 8 0 8 0c.109.363.234.708.371 1.038.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8zm.413 1.021A31.25 31.25 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10c0 0 2.5 1.5 5 .5s5-.5 5-.5c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z" />
                        <path fill-rule="evenodd" d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448z" />
                    </svg>{dailyData.humidity}%<br />
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-wind weatherIcon" viewBox="0 0 16 16">
                        <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5zm-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2zM0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5z" />
                    </svg>{dailyData.wind_speed.toFixed(1)}m/s<br />
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-brightness-high weatherIcon" viewBox="0 0 16 16">
                        <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z" />
                    </svg>{dailyData.uvi}<br />
                    {getRainIcon(dailyData.rain ? dailyData.rain : 0)} {dailyData.rain ? dailyData.rain.toFixed(2) : 0}mm<br />
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-snow weatherIcon snowIcon" viewBox="0 0 16 16">
                        <path d="M8 16a.5.5 0 0 1-.5-.5v-1.293l-.646.647a.5.5 0 0 1-.707-.708L7.5 12.793V8.866l-3.4 1.963-.496 1.85a.5.5 0 1 1-.966-.26l.237-.882-1.12.646a.5.5 0 0 1-.5-.866l1.12-.646-.884-.237a.5.5 0 1 1 .26-.966l1.848.495L7 8 3.6 6.037l-1.85.495a.5.5 0 0 1-.258-.966l.883-.237-1.12-.646a.5.5 0 1 1 .5-.866l1.12.646-.237-.883a.5.5 0 1 1 .966-.258l.495 1.849L7.5 7.134V3.207L6.147 1.854a.5.5 0 1 1 .707-.708l.646.647V.5a.5.5 0 1 1 1 0v1.293l.647-.647a.5.5 0 1 1 .707.708L8.5 3.207v3.927l3.4-1.963.496-1.85a.5.5 0 1 1 .966.26l-.236.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.883.237a.5.5 0 1 1-.26.966l-1.848-.495L9 8l3.4 1.963 1.849-.495a.5.5 0 0 1 .259.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.236.883a.5.5 0 1 1-.966.258l-.495-1.849-3.4-1.963v3.927l1.353 1.353a.5.5 0 0 1-.707.708l-.647-.647V15.5a.5.5 0 0 1-.5.5z" />
                    </svg> {dailyData.snow ? dailyData.snow.toFixed(2) : 0}mm
                </p>
            </div>
        </div>
    ) : <></>;
}
export default React.memo(WeatherData);