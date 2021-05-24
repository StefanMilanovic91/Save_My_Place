import React, { useEffect, useState, Fragment, useRef } from 'react';

import MapGL, { NavigationControl } from "react-map-gl";


const Map = ({ markers, centerView, currentLocation, geojson }) => {

  const map = useRef();

  const [viewport, setViewport] = useState({
    latitude: centerView[1],
    longitude: centerView[0],
    zoom: 9,
    bearing: 0,
    pitch: 0,
  });

    useEffect(() => {
      setViewport({
        ...viewport,
        latitude: centerView[1],
        longitude: centerView[0],
      });

    }, [centerView]);
    
    
    
   /* useEffect(() => {
        
        console.log(map.loaded());
          init(map);

          map.on('load', () => {
            makeRouteHendler(map);
          })
      
          return () => map.remove();
      }, [centerView, geojson]);
    */


    /*const init = (map) => {
        
        
        const nav = new mapboxgl.NavigationControl();
        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true
          });
        /*const directions = new Directions({
            accessToken: mapboxgl.accessToken,
            unit: 'metric',
            profile: 'mapbox/cycling'
        })

        markers.forEach(marker => {
            
            new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false,
                anchor: 'right'
            }).setLngLat(marker.coordinates).setHTML(`<p>${marker.title}</p>`).addTo(map);
            new mapboxgl.Marker().setLngLat(marker.coordinates).setPopup().addTo(map);
        }) 

        //map.addControl(directions, "top-left")
        map.addControl(geolocate, "top-right")
        map.addControl(nav, "top-right"); 

        
    }*/


    const makeRouteHendler = (map) => {
        map.addLayer({
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: geojson
            },
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#3887be',
              'line-width': 5,
              'line-opacity': 0.75
            }
          });
        }
          
    

    
    const pickedLocation = (map, e) => {
        console.log('Picked location');
        console.log(e.lngLat);
    }

    
    return (
      <div  className="mapbox-react">
            <MapGL
                {...viewport}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                width= '100%'
                height= '100%'
                ref={map}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                onViewportChange={nextViewport => setViewport(nextViewport)}
              >
              <NavigationControl/>
            </MapGL>
        </div>
    )
}
export default Map
