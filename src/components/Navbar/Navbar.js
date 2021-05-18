import React, { useState } from 'react'

const Navbar = ({saveCurrentLocation, showDirectionsHendler}) => {


    const [inputLocation, setInputLocation] = useState('');

    return (
        <nav className="nav">
            <a className="navbar-logo" href="#">Logo</a>

            <div className="nav-input">
                <input onChange={(e) => setInputLocation(e.target.value)} type="text" value={inputLocation} placeholder="Name your location." />
                <button onClick={saveCurrentLocation} className="btn btn-success">Save Location</button>
            </div>
            <div className="nav-link">
                <button onClick={showDirectionsHendler} className="btn btn-success">Get Directions</button>
            </div>
            
        </nav>
    )
}

export default Navbar
