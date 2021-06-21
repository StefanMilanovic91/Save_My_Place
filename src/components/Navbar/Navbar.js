import React, { useState, useEffect } from 'react';


const Navbar = ({ showDashboardHandler, dropDownParentClick }) => {

    const [showMenuCard, setShowMenuCard] = useState({
        saved_location: true,
        picked_location: false,
        current_location: false,
        get_directions: false
    });
    const [dropdowMenu, setDropdownMenu] = useState(false);
    const [removeDropdownFromDOM, setRemoveDropdownFromDOM] = useState(true);

    useEffect(() => {
        showDashboardHandler(showMenuCard);
    }, [showMenuCard]);

    useEffect(() => {
        if(!dropdowMenu){
            setTimeout(() => {
                setRemoveDropdownFromDOM(false);
            }, 300);
        }
    }, [dropdowMenu]);

    useEffect(() => {
        if (dropdowMenu) {
            toggleddMenuHandler()
        }
    }, [dropDownParentClick])

    const toggleddMenuHandler = () => {
        setRemoveDropdownFromDOM(true);
        setTimeout(() => setDropdownMenu(!dropdowMenu), 0)
    }


    let dropdownMenuClasses = dropdowMenu ? "nav-dropdown nav-dropdown-show" : "nav-dropdown";

    let savedLocatinClasses = showMenuCard.saved_location ? "nav-checkmark-btn nav-checkmark-btn-on" : "nav-checkmark-btn";
    let pickedLocatinClasses = showMenuCard.picked_location ? "nav-checkmark-btn nav-checkmark-btn-on" : "nav-checkmark-btn";
    let currentLocatinClasses = showMenuCard.current_location ? "nav-checkmark-btn nav-checkmark-btn-on" : "nav-checkmark-btn";
    let getDirectionClasses = showMenuCard.get_directions ? "nav-checkmark-btn nav-checkmark-btn-on" : "nav-checkmark-btn";

    let labelSavedLocatinClasses = showMenuCard.saved_location ? "nav-check-label nav-check-label-on" : "nav-check-label";
    let labelPickedLocatinClasses = showMenuCard.picked_location ? "nav-check-label nav-check-label-on" : "nav-check-label";
    let labelCurrentLocatinClasses = showMenuCard.current_location ? "nav-check-label nav-check-label-on" : "nav-check-label";
    let labelGetDirectionClasses = showMenuCard.get_directions ? "nav-check-label nav-check-label-on" : "nav-check-label";

    return (
        <nav className="nav">
            <div onClick={toggleddMenuHandler} className="nav-btn">
                <div className="nav-btn-line"></div>
                <div className="nav-btn-line"></div>
                <div className="nav-btn-line"></div>
            </div>
            {
                removeDropdownFromDOM && <div className={dropdownMenuClasses}>
                    <label className={labelSavedLocatinClasses}  htmlFor="saved_location">Saved Location
                        <input className="nav-check-input" onClick={(e) => { setShowMenuCard({ ...showMenuCard, [e.target.name]: !showMenuCard.saved_location })}} type="checkbox" id="saved_location" name="saved_location" />
                        <span className="nav-checkmark"><span className={savedLocatinClasses}></span></span>
                    </label>
                    <label className={labelPickedLocatinClasses} htmlFor="picked_location">Picked Location
                        <input className="nav-check-input" onClick={(e) => setShowMenuCard({ ...showMenuCard, [e.target.name]: !showMenuCard.picked_location })} type="checkbox" id="picked_location" name="picked_location"  />
                        <span className="nav-checkmark"><span className={pickedLocatinClasses}></span></span>
                    </label>
                    <label className={labelCurrentLocatinClasses} htmlFor="current_location">Current Location
                        <input className="nav-check-input" onClick={(e) => setShowMenuCard({ ...showMenuCard, [e.target.name]: !showMenuCard.current_location })} type="checkbox" id="current_location" name="current_location"  />
                        <span className="nav-checkmark"><span className={currentLocatinClasses}></span></span>
                    </label>
                    <label className={labelGetDirectionClasses} htmlFor="get_directions">Get Directions
                        <input className="nav-check-input" onClick={(e) => setShowMenuCard({ ...showMenuCard, [e.target.name]: !showMenuCard.get_directions })} type="checkbox" id="get_directions" name="get_directions"  />
                        <span className="nav-checkmark"><span className={getDirectionClasses}></span></span>
                    </label>
                </div>
            } 
        </nav>
    )
}

export default Navbar
