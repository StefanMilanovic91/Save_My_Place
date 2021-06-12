import React, { useState, useEffect } from 'react';
import { uuid } from 'uuidv4';


import Map from './components/Map/Map';
import Modal from './components/Modal/Modal';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';


const App = () => {


    const [modalMessage, setModalMessage] = useState(null);
    const [markers, setMarkers] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [centerView, setCenterView] = useState([0, 0]);
    const [geojson, setGeojson] = useState(null);
    const [pickedLocation, setPickedLocation] = useState(null);
    

    useEffect(() => {

        // get my locations from local storage
        let locations = JSON.parse(localStorage.getItem('locations'));
        locations.length < 1 ? setMarkers(null) : setMarkers(JSON.parse(localStorage.getItem('locations')))

        //localStorage.setItem('locations', JSON.stringify([{ title: 'My parking place', coordinates: [21.25238312821648, 43.98523823866839] }]));
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const { longitude, latitude } = pos.coords;

                setCurrentLocation([longitude, latitude]);
                setCenterView([longitude, latitude]);
            }, (err) => {
                setModalMessage(err.message);

            });
        } else {
            setModalMessage("Geolocation is not supported by this browser.");
        }
        
    }, []);

    const fetchDirections = (lng1, lat1, lng2, lat2) => {
        let data = fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${lng1},${lat1};${lng2},${lat2}?&geometries=geojson&steps=true&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`).then(res => res).then(data => data.json());
        return data;
    }


    const saveToLocalStorage = (arg) => {
        let oldpLoc = JSON.parse(localStorage.getItem('locations'));
        if (oldpLoc) {
            let newLoc = JSON.stringify([...oldpLoc, arg]);
            localStorage.setItem('locations', newLoc);
        } else {
            let newLoc = JSON.stringify([arg]);
            localStorage.setItem('locations', newLoc);
        }


    }

    const getLocationsFromLS = () => {
        return JSON.parse(localStorage.getItem('locations'));
    }

    const saveLocationHandler = (e, title, coordinates) => {
        e.preventDefault();
        let id = uuid();
        saveToLocalStorage({ title, coordinates, id });
        markers ? setMarkers([...markers, { title, coordinates, id }]) : setMarkers([{ title, coordinates: coordinates }])
    }

    const showDirectionsHandler = async (e, start, end) => {
        e.preventDefault();

        let data = await fetchDirections(start[0], start[1], end[0], end[1]);

        const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: data.routes[0].geometry.coordinates
            }
        }
        setGeojson(geojson);
    
    }

    const removeSavedLocation = (id) => {

        // remove location from local storage
        let newLocations = getLocationsFromLS().filter(location => {
            if(location.id !== id) return location;
        });
        localStorage.setItem('locations', JSON.stringify(newLocations));
        
        // remove location from markers
        newLocations.length < 1 ? setMarkers(null) : setMarkers(newLocations);

    }


    return (
        <main className="main-page">

            <Layout>

                <Dashboard
                    markers={markers}
                    saveLocationHandler={saveLocationHandler}
                    setCenterView={setCenterView}
                    pickedLocation={pickedLocation}
                    currentLocation={currentLocation}
                    showDirectionsHandler={showDirectionsHandler}
                    removeSavedLocation={removeSavedLocation}
                />
                
                <Map
                    markers={markers}
                    currentLocation={currentLocation}
                    geojson={geojson}
                    centerView={centerView}
                    setPickedLocation={setPickedLocation}
                    setCenterView={setCenterView}
                />
            </Layout>


            <Modal modalMessage={modalMessage} />

        </main>
    )
}

export default App
