import React, { useState } from 'react'

const Dashboard = ({ markers, saveCurrentLocationHendler, setCenterView, pickedLocation }) => {

    const [inputLocation, setInputLocation] = useState('');
    
    return (
        <div className="Dashboard">
            
            <div className="Dashboard-card Dashboard-locations">
                <h3 className="Dashboard-locations-title" >Saved location</h3>
                {   
                    markers.map((marker, index) => {
                        return <li onClick={() => setCenterView(marker.coordinates)} className="Dashboard-location-item" key={index} >{marker.title}</li>
                    })
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
                        <label htmlFor="name">Location name</label>
                        <input name="name" onChange={(e) => setInputLocation(e.target.value)} type="text" value={inputLocation} placeholder="Name your location." />
                    </div>
                    
                    <button onClick={saveCurrentLocationHendler} className="btn btn-dash-input">Save Picked Location</button>
                </div>
            </div>
            
        </div>
    )
}

export default Dashboard
