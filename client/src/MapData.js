import './App.scss';

export default function MapData(props) {
    const coordinates = props.coordinates;

    if (coordinates) {
        return (
        <div className="location">
            <div className="latitude coordinates">
            <h2 className="lat">Latitude:</h2>
            <h3 className="latValue coordinateValue">{coordinates.lat}</h3>
            </div>
            <div className="longitude coordinates">
            <h2 className="lng">Longitude:</h2>
            <h3 className="lngValue coordinateValue">{coordinates.lng}</h3>
            </div>
        </div>
        );
    }
}