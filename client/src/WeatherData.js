import './App.scss';

let temperatureCelcius;
let feelsLikeCelcius;
let temperatureFahrenheit;
let feelsLikeFahrenheit;

export default function WeatherData(props) {
    const weatherData = props.data;

    function setWeatherStats() {
        temperatureCelcius = weatherData.main.temp.toFixed(1);
        feelsLikeCelcius = weatherData.main.feels_like.toFixed(1);
        temperatureFahrenheit = ((temperatureCelcius * 9 / 5) + 32).toFixed(0);
        feelsLikeFahrenheit = ((feelsLikeCelcius * 9 / 5) + 32).toFixed(0);
    }

    if (weatherData) {
        setWeatherStats();
        return (
            <div className="weatherData">
            <h1>Weather Data</h1>
            <h2 className="temperature">{temperatureCelcius}°C / {temperatureFahrenheit}°F</h2>
            <h2 className="feelsLike">Feels like: {feelsLikeCelcius}°C / {feelsLikeFahrenheit}°F</h2>
            </div>
        )
    }
  }