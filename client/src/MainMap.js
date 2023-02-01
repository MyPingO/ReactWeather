import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import MapData from './MapData';
import WeatherData from './WeatherData';
import config from './config.json';
import { useState } from 'react';
import React from 'react';

const { mapKey, weatherKey } = config;
const containerStyle = {
    width: '75vw',
    minWidth: 'fit-content',
    height: '25vw',
    minHeight: '300px',
    position: 'relative',
};
const libraries = ["places"];

export default function MainMap() {
    
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: mapKey,
        libraries: libraries
    });
    
    
    const [center, setCenter] = useState({
        lat: 40.7256,
        lng: -73.8625
    });
    const [locationInputValue, setLocationInputValue] = useState("");
    const [currentCoords, setCurrentCoords] = useState(center);
    const [defaultWeatherData, setDefaultWeatherData] = useState(null);
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
        const lat = Number(currentCoords.lat.toFixed(4));
        const lng = Number(currentCoords.lng.toFixed(4));

        setCenter({ lat: lat, lng: lng });
        map.zoom = 10;
    }

    function onMouseMove(data) {
        const coordinates = data.latLng.toJSON();
        const lat = Number(coordinates.lat.toFixed(4))
        const lng = Number(coordinates.lng.toFixed(4))
        setCurrentCoords({
            lat: lat,
            lng: lng
        });
    }

    function handleSelect(address) {
        console.log("HANDLING SELECT");
        geocodeByAddress(address)
        .then(results => {
            console.log(results);
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();
            setCurrentCoords({
                lat: Number(lat.toFixed(4)),
                lng: Number(lng.toFixed(4))
            });
            setMapCenter();
        });
        setLocationInputValue("");

    }

    function handleMapClick() {
        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${currentCoords.lat}&lon=${currentCoords.lng}&units=metric&appid=${weatherKey}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setOneClickWeatherData(data);
            });
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currentCoords.lat}&lon=${currentCoords.lng}&units=metric&appid=${weatherKey}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setDefaultWeatherData(data);
            });
    }

    const handleChange = (address) => {
        setLocationInputValue(address);
    }

    return isLoaded ? (
        <div>
            <div>
                <PlacesAutocomplete
                    className='Autocomplete'
                    value={locationInputValue}
                    apiKey={mapKey}
                    // onLoad={onLoad}
                    onChange={(data) => handleChange(data)}
                    onSelect={(data) => handleSelect(data)}>
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <div className="locationSearch">
                                <div>
                                    <input className="form-control locationInput" {...getInputProps({ placeholder: "Search for location" })} type="text" value={locationInputValue}/>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search searchIcon" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div style={{width:"100%", position:"absolute", zIndex:"1"}}>
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
                options={{mapTypeControl: false, streetViewControl: false}}
                zoom={10}
                zIndex={0}
                onLoad={(data) => onLoad(data)}
                onUnmount={onUnmount}
                onClick={(data) => handleMapClick(data)}
                onMouseMove={(data) => onMouseMove(data)}
            >
                { /* Child components, such as markers, info windows, etc. */}
                <Marker position={center} onClick={(data) => console.log("Marker data: " + data) /*setMapCenter(data)*/} text={'Hello'} />
            </GoogleMap>
            <div className="mapDataContainer">
                <MapData className="mapData" coordinates={currentCoords} />
            </div>
            <div className="weatherContainer">
                <WeatherData data={{default: defaultWeatherData, oneClick: oneClickWeatherData}} />
            </div>
        </div>
    ) : <></>
}