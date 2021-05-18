import React, { useEffect, useState, Fragment } from 'react';

import mapboxgl from "mapbox-gl";
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';


const Map = ({ markers, centerView, currentLocation, directionCoordinates }) => {

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    
    useEffect(() => {
        
        init();
          
    }, [centerView]);

    const init = () => {
        const map = new mapboxgl.Map({
            container: "mapContainer",
            style: "mapbox://styles/mapbox/streets-v11",
            center: centerView,
            zoom: 9,
          });
        
        const nav = new mapboxgl.NavigationControl();
        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true
          });
        const directions = new Directions({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            profile: 'mapbox/cycling'
        })

        markers.forEach(marker => {
            
            new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            }).setLngLat(marker.coordinates).setHTML(`<p>${marker.title}</p>`).addTo(map);
            new mapboxgl.Marker().setLngLat(marker.coordinates).setPopup().addTo(map);
        }) 

        map.addControl(directions, "top-left")
        map.addControl(geolocate, "top-right")
        map.addControl(nav, "top-right");

        
    }
    

    const pickedLocation = (map, e) => {
        console.log('Picked location');
        console.log(e.lngLat);
    }

    
    return (
        <div id="mapContainer" className="map"></div>
    )
}

export default Map
