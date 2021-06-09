import React, { useState } from 'react'

const Navbar = () => {

    const [showMenuCard, setShowMenuCard] = useState({
        saved_location: false,
        picked_location: false,
        current_location: false,
        get_directions: false
    });

    const showMenuHendler = (e) => {
        console.log(e.target.checked);
    }

    // start from here, work on Off/On classes on .nav-checkmark-btn and animation on on/off btn 
    // ...(add dynamically .nav-checkmark-btn - off/.nav-checkmark-btn-on classes)

    return (
        <nav className="nav">
            <div className="nav-btn"></div>
            <div className="nav-dropdown">
                <label className="nav-check-label" for="saved_location">Saved Location
                    <input className="nav-check-input" onClick={showMenuHendler} type="checkbox" id="saved_location" name="saved_location" value={false} />
                    <span className="nav-checkmark"><span className="nav-checkmark-btn"></span></span>
                </label>
                <label className="nav-check-label" for="picked_location">Picked Location
                    <input className="nav-check-input" onClick={showMenuHendler} type="checkbox" id="picked_location" name="picked_location" value={false} />
                    <span className="nav-checkmark"></span>
                </label>
                <label className="nav-check-label" for="current_location">Current Location
                    <input className="nav-check-input" onClick={showMenuHendler} type="checkbox" id="current_location" name="current_location" value={false} />
                    <span className="nav-checkmark"></span>
                </label>
                <label className="nav-check-label" for="get_directions">Get Directions
                    <input className="nav-check-input" onClick={showMenuHendler} type="checkbox" id="get_directions" name="get_directions" value={false} />
                    <span className="nav-checkmark"></span>
                </label>
            </div>
        </nav>
    )
}

export default Navbar
