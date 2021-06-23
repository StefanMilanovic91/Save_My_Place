import React, { useState, useEffect } from 'react';
import { v4 as uuid_v4 } from "uuid";


import Map from './components/Map/Map';
import Modal from './components/Modal/Modal';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';

import AppService from './services/app-service';


const App = () => {


    const [modalMessage, setModalMessage] = useState(null);
    const [markers, setMarkers] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [centerView, setCenterView] = useState([0, 0]);
    const [geojson, setGeojson] = useState(null);
    const [pickedLocation, setPickedLocation] = useState(null);
    const [ddMenu, setDDMenu] = useState(false);
    

    useEffect(() => {

        // get my locations from local storage
        let locations = AppService.getLocationsFromLS();
        locations ? locations.length < 1 ? setMarkers(null) : setMarkers(locations) : setMarkers(null)

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


    const saveLocationHandler = (e, title, coordinates) => {
        e.preventDefault();
        let id = uuid_v4();
        AppService.saveLocationToLS({ title, coordinates, id });
        markers ? setMarkers([...markers, { title, coordinates, id }]) : setMarkers([{ title, coordinates, id }])
    }

    const showDirectionsHandler = async (e, start, end) => {
        e.preventDefault();

        let data = await AppService.getDirections(start[0], start[1], end[0], end[1]) //fetchDirections(start[0], start[1], end[0], end[1]);

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

        // remove location from local storage array
        let newLocations = AppService.getLocationsFromLS().filter(location => {
            return location.id !== id;
        });
        localStorage.setItem('locations', JSON.stringify(newLocations));
        
        // remove location from markers
        newLocations.length < 1 ? setMarkers(null) : setMarkers(newLocations);

    }

    const ddMenuParentHandler = (e) => {
        let classList = e.target.classList;
        let class1 = classList.contains('nav__dropdown');
        let class3 = classList.contains("nav__check-input");
        let class4 = classList.contains("nav__checkmark");
        let class5 = classList.contains("nav__checkmark__btn");
        let class6 = classList.contains("nav__check-label");
        if (!class1 && !class3 && !class4 && !class5 && !class6) {
            setDDMenu(!ddMenu);
        }
        
        
    }

    return (
        <main  className="main-page">

            <Layout onClick={ddMenuParentHandler} >

                <Dashboard
                    markers={markers}
                    saveLocationHandler={saveLocationHandler}
                    setCenterView={setCenterView}
                    pickedLocation={pickedLocation}
                    currentLocation={currentLocation}
                    showDirectionsHandler={showDirectionsHandler}
                    removeSavedLocation={removeSavedLocation}
                    dropDownParentClick={ddMenu}
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
