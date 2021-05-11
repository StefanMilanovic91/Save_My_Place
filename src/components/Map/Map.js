import React, { useEffect } from 'react';

import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapHolder = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
});

const Map = () => {

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            console.log(latitude, longitude);
        });
    }, []);


    const getCoordinatesHendler = (map, e) => {
        console.log(e.lngLat);
    }

    return (
        <MapHolder
            style={"mapbox://styles/mapbox/streets-v9"}
            containerStyle={{
                height: '50vh',
                width: '100vw'
            }}
            onClick={getCoordinatesHendler}
        >
            <Marker
                coordinates={[22.13633940228712, 44.06327530383129]}
                anchor="bottom">
                <img src="./images/marker.png" />
            </Marker>
            <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
                <Feature coordinates={[22.13633940228712, 44.06327530383129]} />
            </Layer>
        </MapHolder>
    )
}

export default Map
