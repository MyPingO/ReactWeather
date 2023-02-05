import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import PlacesAutocomplete, { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete';
import MapData from './MapData';
import WeeklyForecast from './WeeklyForecast';
import config from './config.json';
import { useState } from 'react';
import React from 'react';
import TodaysWeather from './TodaysWeather';

const { mapKey, weatherKey } = config;

const libraries = ["places"];

const defaultCenter = {
    lat: 40.7256,
    lng: -73.8625
}
//get the coords of the users location
function getUserLocation() {
    new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    })
    .then((position) => {
        console.log(position);
        defaultCenter.lat = position.coords.latitude;
        defaultCenter.lng = position.coords.longitude;
    })
    .catch((err) => {
        console.log(err);
    })
}
getUserLocation();

export default function MainMap() {

    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: mapKey,
        libraries: libraries
    });


    const [center, setCenter] = useState({
        lat: defaultCenter.lat,
        lng: defaultCenter.lng
    });
    const [locationInputValue, setLocationInputValue] = useState("");
    const [currentCoords, setCurrentCoords] = useState(center);
    const [selectedAddress, setSelectedAddress] = useState("");
    // const [defaultWeatherData, setDefaultWeatherData] = useState(null);
    const [oneClickWeatherData, setOneClickWeatherData] = useState(null);
    const [map, setMap] = useState(null);

    function onLoad(GoogleMap) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        // const bounds = new window.google.maps.LatLngBounds(center);
        // map.fitBounds(bounds);
        setMap(GoogleMap)
    }

    function onUnmount(map) {
        setMap(null)
    }

    function setMapCenter() {
        const lat = currentCoords.lat;
        const lng = currentCoords.lng;

        setCenter({ lat: lat, lng: lng });
        map.zoom = 10;
    }

    function onMouseMove(data) {
        
    }

    function handleSelect(address) {
        console.log("HANDLING SELECT");
        geocodeByAddress(address)
            .then(results => {
                setSelectedAddress(results[0].formatted_address)
                console.log(results);
                const lat = results[0].geometry.location.lat();
                const lng = results[0].geometry.location.lng();
                setCurrentCoords({
                    lat: lat,
                    lng: lng
                });
                setMapCenter();
            });
        setLocationInputValue("");

    }

    function handleMapClick(data) {
        const coordinates = data.latLng.toJSON();
        const lat = coordinates.lat
        const lng = coordinates.lng
        setCurrentCoords({
            lat: lat,
            lng: lng
        });
        fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentCoords.lat},${currentCoords.lng}&result_type=locality|political&key=${mapKey}`
        )
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setSelectedAddress(data.results[0].formatted_address);
            })
            .catch(error => console.error(error));
        // geocodeByLatLng(currentCoords).then(results => {console.log(results); setSelectedAddress(results[0].formatted_address);})
        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${currentCoords.lat}&lon=${currentCoords.lng}&units=metric&appid=${weatherKey}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setOneClickWeatherData(data);
            });
        // fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currentCoords.lat}&lon=${currentCoords.lng}&units=metric&appid=${weatherKey}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data)
        //         setDefaultWeatherData(data);
        //     });
    }

    const handleChange = (address) => {
        setLocationInputValue(address);
    }

    const containerStyle = {
        width: '100%',
        minwidth: '400px',
        minHeight: '400px',
        position: 'relative',
    };

    //TODO: Get current location on load
    return isLoaded ? (
        <div>
            <div className='searchAndWeather'>
                <div className="mapAndSearch">
                    <div className='Autocomplete'>
                        <PlacesAutocomplete
                            className='PlacesAutocomplete'
                            value={locationInputValue}
                            apiKey={mapKey}
                            // onLoad={onLoad}
                            onChange={(data) => handleChange(data)}
                            onSelect={(data) => handleSelect(data)}>
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div className="locationSearchContainer">
                                    <div className="locationSearch">
                                        <input className="form-control locationInput" {...getInputProps({ placeholder: "Search for location" })} type="text" value={locationInputValue} />
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search searchIcon" viewBox="0 0 16 16">
                                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                        </svg>
                                    </div>
                                    <div style={{ width: "100", position: "absolute", zIndex: "1" }}>
                                        <div className='suggestions'>
                                            {loading ? <div>Loading...</div> : null}
                                            {suggestions.map(suggestion => {
                                                const style = suggestion.active ? { backgroundColor: "#ffffff", cursor: "pointer" } : { backgroundColor: "rgba(238,238,238,.85)", cursor: "pointer" };
                                                return <div key={suggestion.description} {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>;
                                            })}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                    </div>
                    <GoogleMap
                        className="mainMap"
                        mapContainerStyle={containerStyle}
                        center={center}
                        options={{ mapTypeControl: false, streetViewControl: false }}
                        zoom={10}
                        zIndex={0}
                        onLoad={(data) => onLoad(data)}
                        onUnmount={onUnmount}
                        onClick={(data) => handleMapClick(data)}
                        onMouseMove={(data) => onMouseMove(data)}
                    >
                        { /* Child components, such as markers, info windows, etc. */}
                        <Marker position={center} onClick={(data) => console.log("Marker data: " + data) /*setMapCenter(data)*/} label="" />
                    <br />
                    </GoogleMap>
                </div>
                <div className='locationAndTodaysCard'>
                    <TodaysWeather className="todaysWeather" weatherData={oneClickWeatherData} location={selectedAddress} />
                </div>
            </div>
            <div className="weeklyWeatherContainer">
                <WeeklyForecast className="weeklyForecast" weatherData={oneClickWeatherData} location={selectedAddress} />
            </div>
        </div>
    ) : <></>
}