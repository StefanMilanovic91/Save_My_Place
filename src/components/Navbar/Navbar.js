import React, { useState } from 'react'

const Navbar = ({ showDirectionsHendler}) => {


    const [inputLocation, setInputLocation] = useState('');

    return (
        <nav className="nav">
            <a className="navbar-logo" href="#">Logo</a>

            <div className="nav-link">
                <button onClick={showDirectionsHendler} className="btn btn-success">Get Directions</button>
            </div>
            
        </nav>
    )
}

export default Navbar
