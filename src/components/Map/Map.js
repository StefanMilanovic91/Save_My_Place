import React, { useEffect, useState, Fragment, useRef } from 'react';

import MapGL, { NavigationControl, Marker } from "react-map-gl";


const Map = ({ markers, centerView, currentLocation, geojson, setPickedLocation }) => {

  const map = useRef();

  const [viewport, setViewport] = useState({
    latitude: centerView[1],
    longitude: centerView[0],
    zoom: 9,
    maxZoom: 18,
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

  const markerIconPath = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

  const pinStyle = {
    cursor: 'pointer',
    transform: `translate(${-25 / 2}px,${-25}px)`,
    stroke: 'none'
  };


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




  const pickedLocation = (e) => {
    setPickedLocation(e.lngLat)
  }


  return (
    <div className="mapbox-react">
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        width='100%'
        height='100%'
        ref={map}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        onClick={pickedLocation}

      >
        {/*<NavigationControl />*/}

        {
          markers && markers.map((marker, index) => {
            return <Marker key={index} longitude={marker.coordinates[0]} latitude={marker.coordinates[1]} >
              <div className="marker">
                <svg
                  height={25}
                  viewBox="0 0 25 25"
                  style={{ ...pinStyle, fill: 'forestgreen' }} >
                  <path d={markerIconPath} />
                </svg>
                <p className="marker-title" >{marker.title}</p>
              </div>
            </Marker>
          })
        }

        { currentLocation && <Marker longitude={currentLocation[0]} latitude={currentLocation[1]} >
                                <div className="marker">
                                  <svg
                                    height={25}
                                    viewBox="0 0 25 25"
                                    style={{ ...pinStyle, fill: 'dodgerblue' }} >
                                    <path d={markerIconPath} />
                                  </svg>
                                  <p className="marker-title marker-title-current" >Your position</p>
                                </div>
                              </Marker>
        }

      </MapGL>
    </div>
  )
}
export default Map
