import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import PlacesAutocomplete from 'react-places-autocomplete';
import MapData from './MapData';
import WeatherData from './WeatherData';
import config from './config.json';
import { useState } from 'react';

const { mapKey, weatherKey } = config;
const containerStyle = {
    width: '75vw',
    minWidth: 'fit-content',
    height: '55vh',
    minHeight: '300px',
    position: 'relative',
};
const libraries = ["places"];

export default function MainMap() {
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: mapKey,
        libraries: libraries,
    });
    
    const [center, setCenter] = useState({
        lat: 40.7256,
        lng: -73.8625
    });
    const [currentCoords, setCurrentCoords] = useState(center);
    const [currentWeatherData, setCurrentWeatherData] = useState(null);
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
        const lat = currentCoords.lat.toFixed(4);
        const lng = currentCoords.lng.toFixed(4);
        
        setCenter({ lat: lat, lng: lng });
    }
    function setWeather(data) {
        if (!data) return;
        setCurrentWeatherData(data);
    }
    
    function onMouseMove(data) {
        const coordinates = data.latLng.toJSON();
        setCurrentCoords({
            lat: coordinates.lat.toFixed(4),
            lng: coordinates.lng.toFixed(4)
        });
    }
    
    function handleSelect(data) {
        console.log(data);
        setMapCenter();
    }
    
    function handleMapClick() {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${currentCoords.lat}&lon=${currentCoords.lng}&units=metric&appid=${weatherKey}`)
            .then(res => {
                // console.log("Response from API: \n" + String(res));
                return res.json();
                })
            .then(data => {
                // console.log("Data received from API: \n" + String(data));
                setWeather(data);
            })
    }

    const [address, setAddress] = useState('');
    const handleChange = (address) => {
        setAddress(address);
    }

    return isLoaded ? (
        <div>
            <GoogleMap
                className="mainMap"
                mapContainerStyle={containerStyle}
                center={center}
                zoom={6}
                onLoad={(data) => onLoad(data)}
                onUnmount={onUnmount}
                onClick={(data) => handleMapClick(data)}
                onMouseMove={(data) => onMouseMove(data)}
            >
                { /* Child components, such as markers, info windows, etc. */}
                <Marker position={center} onClick={(data) => setMapCenter(data)} text={'Hello'} />
            </GoogleMap>
            <PlacesAutocomplete
                className='locationSearch'
                value={address}
                apiKey={mapKey}
                // onLoad={onLoad}
                onChange={(data) => handleChange(data)}
                onSelect={(data) => handleSelect(data)}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input {...getInputProps({ placeholder: "Search for location" })} className="locationInput" type="text" />
                        <div>
                            {loading ? <div>Loading...</div> : null}
                            {suggestions.map(suggestion => {
                                const style = suggestion.active ? { backgroundColor: "#fafafa", cursor: "pointer" } : { backgroundColor: "#ffffff", cursor: "pointer" };
                                return <div {...getSuggestionItemProps(suggestion, { style })}>{suggestion.description}</div>;
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
            <div className="mapDataContainer">
                <MapData coordinates={currentCoords} />
            </div>
            <div className="weatherContainer">
                <WeatherData data={currentWeatherData} />
            </div>
        </div>
    ) : <></>
}