import './App.css';

export default function MapData(props) {
    const coordinates = props.coordinates;

    if (coordinates) {
        return (
        <div className="location">
            <div className="latitude coordinates">
                <h2 className="coordsLabel">Latitude: </h2>
                <h3 className="latValue coordsLabel coordinateValue">{coordinates.lat}</h3>
            </div>
            <div className="longitude coordinates">
                <h2 className="coordsLabel">Longitude: </h2>
                <h3 className="lngValue coordsLabel coordinateValue">{coordinates.lng}</h3>
            </div>
        </div>
        );
    }
}