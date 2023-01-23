import logo from './logo.svg';
import './App.css';
import React, { createElement, useEffect, useState } from 'react';
import ReactDOM from 'react';
import {GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';
import config from './config.json';

class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherData: null,
      mapData:  {
        lat: null,
        lng: null
      }
    }
  }
  renderMainMap() {
    return (
      <MainMap value="test" onClick={ data => this.handleMapClick(data)} onMouseMove={ data => this.handleMouseMove(data)}/>
    )
  }
  renderMapData() {
    return (
      <MapData value={this.state.mapData}/>
    )
  }
  renderWeatherData() {
    return (
      <WeatherData value={this.state.weatherData}/>
    )
  }
  handleMouseMove(data) {
    let mapData = data.latLng.toJSON();

    let lat = mapData.lat.toFixed(4);
    let lng = mapData.lng.toFixed(4);

    let newMapData = {
      lat: lat,
      lng: lng
    }
    this.setState({mapData:newMapData});
  }
  handleMapClick(data) {
    let mapData = data.latLng.toJSON();
    let lat = mapData.lat;
    console.log("lat: "+ lat);
    let lng = mapData.lng;
    console.log("lng: "+ lng);
    let center = {
      lat: lat,
      lng: lng
    };
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=${weatherKey}`)
    .then(res => res.json())
    .then(weatherData => this.setState({weatherData: weatherData}));
  }
  render() {
   return (
      <div className="mainDiv">
        <h1>Choose Location</h1>
        <div className="mapDiv">
          <div className="mapContainer">
            {this.renderMainMap()}
          </div>
          <div className="mapDataContainer">
            {this.renderMapData()}
          </div>
        </div>
        {this.renderWeatherData()}
      </div>
    )
  }
}

const {mapKey, weatherKey} = config;
const containerStyle = {
  width: '75vw',
  minWidth: 'fit-content',
  height: '55vh',
  minHeight: '300px',
  // margin: '0 auto',
  position: 'relative',
};
let center = {
  lat: 40.7256,
  lng: -73.8625
};

function MainMap(props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: mapKey
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      className = "mainMap"
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6}
      // onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={props.onClick}
      onMouseMove = {props.onMouseMove}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      <Marker position={center} />

      <></>
    </GoogleMap>
  ) : <></>
}

function WeatherData(props) {
  let data = props.value;
  if (data) {;
    console.log(data);
    let temperatureCelcius = data.main.temp.toFixed(1);
    let feelsLikeCelcius = data.main.feels_like.toFixed(1);
    let temperatureFahrenheit = ((temperatureCelcius * 9/5) + 32).toFixed(0);
    let feelsLikeFahrenheit = ((feelsLikeCelcius * 9/5) + 32).toFixed(0);
    return (
      <div className="weatherData">
        <h1>Weather Data</h1>
        <h2 className="temperature">{temperatureCelcius}°C / {temperatureFahrenheit}°F</h2>
        <h2 className="feelsLike">Feels like: {feelsLikeCelcius}°C / {feelsLikeFahrenheit}°F</h2>
      </div>
    )
  }
}

function MapData(props) {
  let data = props.value;
  if (data) {
    return (
      <div className="mapData">
        <div className="location">
          <div className="latitude coordinates">
            <h2 className="lat">Latitude:</h2>
            <h3 className="latValue coordinateValues">{data.lat}</h3>
          </div>
          <div className="longitude coordinates">
            <h2 className="lng">Longitude:</h2>
            <h3 className="lngValue coordinateValues">{data.lng}</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default WeatherApp;
