import React, { useEffect, useState } from 'react'

const Dashboard = ({ markers, saveLocationHendler, setCenterView, pickedLocation, currentLocation, showDirectionsHendler }) => {

    const [pickedInput, setPickedInput] = useState('');
    const [currentInput, setCurrentInput] = useState('');
    const [disabledPickedBtn, setDisabledPickedBtn] = useState(true);
    const [disabledCurrBtn, setDisabledCurrBtn] = useState(true);
    const [disabledGetDirectionsBtn, setDisabledGetDirBtn] = useState(false);
    const [startEndDirections, setStartEndDirections] = useState({ start: 'Select start', end: 'Select end' });
    
    useEffect(() => {
        setDisabledPickedBtn(pickedLocation ? !pickedInput.trim() : !pickedLocation);
    }, [pickedLocation, pickedInput]);

    useEffect(() => {
        setDisabledCurrBtn(!currentInput.trim());
    }, [currentLocation, currentInput]);

    useEffect(() => {
        console.log(startEndDirections);
        if (startEndDirections.start === startEndDirections.end) {
            console.log('if it is the same');
        }
    }, [startEndDirections]);

    return (
        <div className="Dashboard">
            
            <div className="Dashboard-card Dashboard-locations">
                <h3 className="Dashboard-locations-title" >Saved location</h3>
                {   
                    markers ? markers.map((marker, index) => {
                        return <li onClick={() => setCenterView(marker.coordinates)} className="Dashboard-location-item" key={index} >{marker.title}</li>
                    }) : <p>You have no saved locations.</p>
                }
            </div>

            <div className="Dashboard-card Dashboard-input">
                <div className="Dashboard-input-group">
                    <h3 className="Dashboard-locations-title" >Picked location</h3>
                    <div className="Dashboard-lngLtd">
                        <p>Lng: {pickedLocation ? pickedLocation[0] : '-----' }</p>
                        <p>Lat: {pickedLocation ? pickedLocation[1] : '-----' }</p>
                    </div>
                    
                    <div className="Dashboard-input-group">
                        <label htmlFor="picked-loc-name">Name of location</label>
                        <input className="Dashboard-input-item" name="picked-loc-name" onChange={(e) => setPickedInput(e.target.value)} type="text" value={pickedInput} placeholder="Add name here." />
                    </div>
                    
                    <button disabled={disabledPickedBtn} onClick={(e) => { saveLocationHendler(e, pickedInput, pickedLocation); setPickedInput(''); }} className={disabledPickedBtn ?  "btn btn-dash-input btn-disabled" : "btn btn-dash-input" } >Save Picked Location</button>
                </div>
            </div>

            <div className="Dashboard-card Dashboard-input">
                <div className="Dashboard-input-group">
                    <h3 className="Dashboard-locations-title" >Current location</h3>
                    <div className="Dashboard-lngLtd">
                        <p>Lng: {currentLocation ? currentLocation[0] : '-----' }</p>
                        <p>Lat: {currentLocation ? currentLocation[1] : '-----' }</p>
                    </div>
                    
                    <div className="Dashboard-input-group">
                        <label htmlFor="current-loc-name">Name of current location</label>
                        <input className="Dashboard-input-item" name="current-loc-name" onChange={(e) => setCurrentInput(e.target.value)} type="text" value={currentInput} placeholder="Add name here." />
                    </div>
                    
                    <button disabled={disabledCurrBtn} onClick={(e) => { saveLocationHendler(e, currentInput, currentLocation); setCurrentInput(''); }} className={disabledCurrBtn ?  "btn btn-dash-input btn-disabled" : "btn btn-dash-input" } >Save Current Location</button>
                </div>
            </div>

            <div className="Dashboard-card Dashboard-directions">
                <div className="Dashboard-input-group">
                    <h3 className="Dashboard-locations-title" >Get directions</h3>
                    <div className="Dashboard-directions-start">
                        <p>Start position</p>
                        <select onChange={(e) => setStartEndDirections({...startEndDirections, [e.target.name]: e.target.value })} name="start" >
                            <option disabled selected>Start position</option>
                            { markers && markers.map(position =>  <option value={position.coordinates}>{position.title}</option>) }
                        </select>
                    </div>
                    <div className="Dashboard-directions-end">
                        <p>End position</p>
                        <select onChange={(e) => setStartEndDirections({...startEndDirections, [e.target.name]: e.target.value })} name="end" >
                            <option disabled selected>End position</option>
                            { markers && markers.map(position =>  <option value={position.coordinates}>{position.title}</option>) }
                        </select>
                    </div>
                    
                    
                    <button disabled={disabledGetDirectionsBtn} onClick={(e) => showDirectionsHendler(e, startEndDirections.start, startEndDirections.end) } className="btn btn-dash-input" >Get Directions</button>
                </div>
            </div>
            
        </div>
    )
}

export default Dashboard
