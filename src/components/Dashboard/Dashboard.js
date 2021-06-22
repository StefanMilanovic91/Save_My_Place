import React, { useEffect, useState, Fragment } from 'react';

import Navbar from '../Navbar/Navbar';

const Dashboard = ({ markers, saveLocationHandler, setCenterView, pickedLocation, currentLocation, showDirectionsHandler, removeSavedLocation, dropDownParentClick }) => {

    const [pickedInput, setPickedInput] = useState('');
    const [currentInput, setCurrentInput] = useState('');

    const [disabledPickedBtn, setDisabledPickedBtn] = useState(true);
    const [disabledCurrBtn, setDisabledCurrBtn] = useState(true);
    const [disabledGetDirectionsBtn, setDisabledGetDirBtn] = useState(true);

    const [startDirections, setStartDirections] = useState(null);
    const [endDirections, setEndDirections] = useState(null);
    const [options1, setOptions1] = useState(null);
    const [options2, setOptions2] = useState(null);

    const [showDashboardCard, setShowDashboardCard] = useState({
        saved_location: true,
        picked_location: false,
        current_location: false,
        get_directions: false
    });

    useEffect(() => {
        setDisabledPickedBtn(pickedLocation ? !pickedInput.trim() : !pickedLocation);
    }, [pickedLocation, pickedInput]);

    useEffect(() => {
        setDisabledCurrBtn(!currentInput.trim());
    }, [currentLocation, currentInput]);

    useEffect(() => {

        // init options for get directions
        markers && setOptions1(markers.map(position => <option key={position.id} value={JSON.stringify(position)}>{position.title}</option>));
        markers && setOptions2(markers.map(position => <option key={position.id} value={JSON.stringify(position)}>{position.title}</option>));

    }, [markers]);

    useEffect(() => {
        // create select options for end position
        if (startDirections || endDirections) {
            markers && setOptions2(markers.map(position => {
                if (JSON.parse(startDirections).id === position.id) {
                    return <option key={position.id} disabled value={JSON.stringify(position)}>{position.title}</option>
                } else {
                    return <option key={position.id} value={JSON.stringify(position)}>{position.title}</option>
                }

            }));
        }
        // enable GetDirections btn
        if (startDirections && endDirections) {
            setDisabledGetDirBtn(false)
        }

    }, [startDirections]);

    useEffect(() => {

        // create select options for start position
        if (startDirections || endDirections) {
            markers && setOptions1(markers.map(position => {
                if (JSON.parse(endDirections).id === position.id) {
                    return <option key={position.id} disabled value={JSON.stringify(position)}>{position.title}</option>
                } else {
                    return <option key={position.id} value={JSON.stringify(position)}>{position.title}</option>
                }

            }));
        }
        // enable GetDirections btn
        if (startDirections && endDirections) {
            setDisabledGetDirBtn(false)
        }

    }, [endDirections]);


    const showDashboardHandler = (arg) => {
        setShowDashboardCard(arg);
    }

    // show or hide dashboard cards

    let savedLocationsCard = showDashboardCard.saved_location && <Fragment>
                            <div className="Dashboard-card">
                                <h3 className="Dashboard-locations-title" >Saved location</h3>
                                {
                                    markers ? markers.map(marker => {
                                        return <li className="Dashboard-location-item" key={marker.id} >
                                            <img onClick={() => removeSavedLocation(marker.id)} className="Dashboard-location-item-x" src='images/x.png' alt="delete" />
                                            <p onClick={() => setCenterView(marker.coordinates)} className="Dashboard-item-title">{marker.title}</p>
                                        </li>
                                    }) : <p>You have no saved locations.</p>
                                }
                            </div>
                        </Fragment>

    let pickedLocationsCard = showDashboardCard.picked_location && <Fragment>
                            <div className="Dashboard-card Dashboard-input">
                                <div className="Dashboard-input-group">
                                    <h3 className="Dashboard-locations-title" >Picked location</h3>
                                    <div className="Dashboard-lngLtd">
                                        <p>Lng: {pickedLocation ? pickedLocation[0] : '-----'}</p>
                                        <p>Lat: {pickedLocation ? pickedLocation[1] : '-----'}</p>
                                    </div>

                                    <div className="Dashboard-input-group">
                                        <label htmlFor="picked-loc-name">Name of location</label>
                                        <input className="Dashboard-input-item" name="picked-loc-name" onChange={(e) => setPickedInput(e.target.value)} type="text" value={pickedInput} placeholder="Add name here." />
                                    </div>

                                    <button disabled={disabledPickedBtn} onClick={(e) => { saveLocationHandler(e, pickedInput, pickedLocation); setPickedInput(''); }} className={disabledPickedBtn ? "btn btn-dash-input btn-disabled" : "btn btn-dash-input"} >Save Picked Location</button>
                                </div>
                            </div>
                        </Fragment>

    let currentLocationsCard = showDashboardCard.current_location && <Fragment>
                                    <div className="Dashboard-card Dashboard-input">
                                        <div className="Dashboard-input-group">
                                            <h3 className="Dashboard-locations-title" >Current location</h3>
                                            <div className="Dashboard-lngLtd">
                                                <p>Lng: {currentLocation ? currentLocation[0] : '-----'}</p>
                                                <p>Lat: {currentLocation ? currentLocation[1] : '-----'}</p>
                                            </div>

                                            <div className="Dashboard-input-group">
                                                <label htmlFor="current-loc-name">Name of current location</label>
                                                <input className="Dashboard-input-item" name="current-loc-name" onChange={(e) => setCurrentInput(e.target.value)} type="text" value={currentInput} placeholder="Add name here." />
                                            </div>

                                            <button disabled={disabledCurrBtn} onClick={(e) => { saveLocationHandler(e, currentInput, currentLocation); setCurrentInput(''); }} className={disabledCurrBtn ? "btn btn-dash-input btn-disabled" : "btn btn-dash-input"} >Save Current Location</button>
                                        </div>
                                    </div>
                                </Fragment>

    let directionsCard = showDashboardCard.get_directions && <Fragment>
                                <div className="Dashboard-card Dashboard-directions">
                                    <div className="Dashboard-input-group">
                                        <h3 className="Dashboard-locations-title" >Get directions</h3>
                                        <div className="Dashboard-directions-start">
                                            <p>Start position</p>
                                            <select onChange={(e) => setStartDirections(e.target.value)} name="start" >
                                                <option disabled selected>Start position</option>
                                                {options1}
                                            </select>
                                        </div>
                                        <div className="Dashboard-directions-end">
                                            <p>End position</p>
                                            <select onChange={(e) => setEndDirections(e.target.value)} name="end" >
                                                <option disabled selected>End position</option>
                                                {options2}
                                            </select>
                                        </div>


                                        <button disabled={disabledGetDirectionsBtn} onClick={(e) => showDirectionsHandler(e, JSON.parse(startDirections).coordinates, JSON.parse(endDirections).coordinates)} className={disabledGetDirectionsBtn ? "btn btn-dash-input btn-disabled" : "btn btn-dash-input"} >Get Directions</button>
                                    </div>
                                </div>
                            </Fragment>

    return (
        <div className="Dashboard">
            
            <Navbar showDashboardHandler={showDashboardHandler} dropDownParentClick={dropDownParentClick} />

            <div className="row">
                {/* Saved locations panel */}
                { savedLocationsCard }

                {/* Picked location panel */}
                { pickedLocationsCard }

                {/* Current location panel */}
                { currentLocationsCard }

                {/* Get directions panel */}
                { directionsCard }
            </div>
        </div>
    )
}

export default Dashboard
