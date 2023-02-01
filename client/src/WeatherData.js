import './App.css';

let temperatureCelcius;
let feelsLikeCelcius;
let temperatureFahrenheit;
let feelsLikeFahrenheit;

export default function WeatherData(props) {
    const defaultWeatherData = props.data.default;
    const oneClickWeatherData = props.data.oneClick;

    function setWeatherStats() {
        temperatureCelcius = defaultWeatherData.main.temp.toFixed(1);
        feelsLikeCelcius = defaultWeatherData.main.feels_like.toFixed(1);
        temperatureFahrenheit = ((temperatureCelcius * 9 / 5) + 32).toFixed(0);
        feelsLikeFahrenheit = ((feelsLikeCelcius * 9 / 5) + 32).toFixed(0);
    }

    if (defaultWeatherData) {
        setWeatherStats();
        return (
            <div className="weatherReport">
                <h1>Weather Report</h1>
                <h2 className="temperature">{temperatureCelcius}°C / {temperatureFahrenheit}°F</h2>
                <h2 className="feelsLike">Feels like: {feelsLikeCelcius}°C / {feelsLikeFahrenheit}°F</h2>
            </div>
        )
    }
}

function DailyWeatherWidget(props) {

}