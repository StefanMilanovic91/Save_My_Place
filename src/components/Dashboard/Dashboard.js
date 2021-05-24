import React, { useState } from 'react'

const Dashboard = ({ markers, saveCurrentLocationHendler }) => {

    const [inputLocation, setInputLocation] = useState('');

    return (
        <div className="Dashboard">
            
            <div className="Dashboard-card Dashboard-locations">
                <h3 className="Dashboard-locations-title" >Saved location</h3>
                {
                    markers.map((location, index) => <li className="Dashboard-location-item" key={index} >{location.title}</li>)
                }
            </div>

            <div className="Dashboard-card Dashboard-input">
                <div className="Dashboard-input-group">
                    <input onChange={(e) => setInputLocation(e.target.value)} type="text" value={inputLocation} placeholder="Name your location." />
                    <button onClick={saveCurrentLocationHendler} className="btn btn-dash-input">Save Current Location</button>
                </div>
            </div>
            
        </div>
    )
}

export default Dashboard
