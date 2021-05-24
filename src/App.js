import React, { useState, useEffect } from 'react'


import Map from './components/Map/Map';
import Modal from './components/Modal/Modal';
import Navbar from './components/Navbar/Navbar';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {


    const [modalMessage, setModalMessage] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [currentLocation, setCurrentLocation] = useState([0, 0]);
    const [centerView, setCenterView] = useState([0, 0]);
    const [geojson, setGeojson] = useState([]);


    useEffect(() => {

        // get my locations from local storage
        setMarkers(JSON.parse(localStorage.getItem('locations')));

        //localStorage.setItem('locations', JSON.stringify([{ title: 'My parking place', coordinates: [21.25238312821648, 43.98523823866839] }]));
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const { longitude, latitude } = pos.coords;
                console.log(longitude, latitude);
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
        let data = fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${lng1},${lat1};${lng2},${lat2}?&geometries=geojson&steps=true&access_token=pk.eyJ1Ijoic3RlZm1pbDkxIiwiYSI6ImNrb2tnaHJjcTAzdnoyb3BmeWF1MzJ6djMifQ.YebsJzhNccHaEOKMhigbIQ`).then(res => res).then(data => data.json());
        return data;
    }


    const saveCurrLocationToLS = (arg) => {
        let oldpLoc = JSON.parse(localStorage.getItem('locations'));
        if (oldpLoc) {
            let newLoc = JSON.stringify([...oldpLoc, arg]);
            localStorage.setItem('locations', newLoc);
        }


    }

    const getLocationsFromLS = () => {
        return JSON.parse(localStorage.getItem('locations'));
    }

    const saveCurrentLocationHendler = (e) => {
        e.preventDefault();
        //saveCurrLocationToLS({ title: "My log cabin", coordinates: currentLocation });
        //setLocations([...locations, { title: "My log cabin", coordinates: currentLocation }]);
    }

    const showDirectionsHendler = async (e) => {
        e.preventDefault();

        let fetchCoordinates = markers.map(location => location.coordinates)

        let data = await fetchDirections(fetchCoordinates[0][0], fetchCoordinates[0][1], fetchCoordinates[1][0], fetchCoordinates[1][1]);
        const geojson = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates: data.routes[0].geometry.coordinates
            }
        }
        setGeojson(geojson);
        console.log(data);
    }

    return (
        <main className="main-page">
            <Navbar showDirectionsHendler={showDirectionsHendler} />

            <Layout>

                <Dashboard
                    markers={markers}
                    saveCurrentLocationHendler={saveCurrentLocationHendler}
                />
                
                <Map
                    markers={markers}
                    currentLocation={currentLocation}
                    geojson={geojson}
                    centerView={centerView}
                />
            </Layout>


            <Modal modalMessage={modalMessage} />

        </main>
    )
}

export default App
