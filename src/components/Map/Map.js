import React, { useEffect, useState, Fragment } from 'react';

import ReactMapboxGl, { ZoomControl, Marker, Popup } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapHolder = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
});

const Map = ({setModalMessage}) => {

    const [currentLocation, setCurrentLocation] = useState([0, 0]);
    const [locations, setLocations] = useState([{ title: 'My parking place', coordinates: [21.25238312821648, 43.98523823866839] }]);


    useEffect(() => {

        // set current position
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const { longitude, latitude } = pos.coords;
                setCurrentLocation([longitude, latitude]);
                
            }, (err) => {
                setModalMessage(err.message);
                setTimeout(() => {
                    setModalMessage(null);
                }, 5000);
            });
        } else {
            setModalMessage("Geolocation is not supported by this browser.");
        }


    }, []);


    const pickedLocation = (map, e) => {
        console.log(e.lngLat);
    }

    return (
        <MapHolder
            style={"mapbox://styles/mapbox/streets-v9"}
            className="map-container"
            center={currentLocation}
            onClick={pickedLocation}
        >
            {
                locations.map(location => {
                    return <Fragment>
                                <Popup coordinates={location.coordinates} anchor="right">
                                    <p>{ location.title }</p>
                                </Popup>
                                <Marker coordinates={location.coordinates} anchor="bottom">
                                    <img className="current-location" src="./images/marker.png" alt="Marker" />
                                </Marker>
                            </Fragment>
                })
            }
            <Marker coordinates={currentLocation} anchor="bottom">
                <img className="current-location" src="./images/marker.png" alt="Marker" />
            </Marker>

            

            <ZoomControl />
        </MapHolder>
    )
}

export default Map
