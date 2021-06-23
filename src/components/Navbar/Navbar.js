import React, { useState, useEffect } from 'react';
import '../../css/navbar.css';


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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dropDownParentClick])

    const toggleddMenuHandler = () => {
        setRemoveDropdownFromDOM(true);
        setTimeout(() => setDropdownMenu(!dropdowMenu), 0)
    }


    let dropdownMenuClasses = dropdowMenu ? "nav__dropdown nav__dropdown__show" : "nav__dropdown";

    let savedLocatinClasses = showMenuCard.saved_location ? "nav__checkmark__btn nav__checkmark__btn-on" : "nav__checkmark__btn";
    let pickedLocatinClasses = showMenuCard.picked_location ? "nav__checkmark__btn nav__checkmark__btn-on" : "nav__checkmark__btn";
    let currentLocatinClasses = showMenuCard.current_location ? "nav__checkmark__btn nav__checkmark__btn-on" : "nav__checkmark__btn";
    let getDirectionClasses = showMenuCard.get_directions ? "nav__checkmark__btn nav__checkmark__btn-on" : "nav__checkmark__btn";

    let labelSavedLocatinClasses = showMenuCard.saved_location ? "nav__check-label nav__check-label-on" : "nav__check-label";
    let labelPickedLocatinClasses = showMenuCard.picked_location ? "nav__check-label nav__check-label-on" : "nav__check-label";
    let labelCurrentLocatinClasses = showMenuCard.current_location ? "nav__check-label nav__check-label-on" : "nav__check-label";
    let labelGetDirectionClasses = showMenuCard.get_directions ? "nav__check-label nav__check-label-on" : "nav__check-label";

    return (
        <nav className="nav">
            <div onClick={toggleddMenuHandler} className="nav__btn">
                <div className="nav__btn__line"></div>
                <div className="nav__btn__line"></div>
                <div className="nav__btn__line"></div>
            </div>
            {
                removeDropdownFromDOM && <div className={dropdownMenuClasses}>
                    <label className={labelSavedLocatinClasses}  htmlFor="saved_location">Saved Location
                        <input className="nav__check-input" onClick={(e) => { setShowMenuCard({ ...showMenuCard, [e.target.name]: !showMenuCard.saved_location })}} type="checkbox" id="saved_location" name="saved_location" />
                        <span className="nav__checkmark"><span className={savedLocatinClasses}></span></span>
                    </label>
                    <label className={labelPickedLocatinClasses} htmlFor="picked_location">Picked Location
                        <input className="nav__check-input" onClick={(e) => setShowMenuCard({ ...showMenuCard, [e.target.name]: !showMenuCard.picked_location })} type="checkbox" id="picked_location" name="picked_location"  />
                        <span className="nav__checkmark"><span className={pickedLocatinClasses}></span></span>
                    </label>
                    <label className={labelCurrentLocatinClasses} htmlFor="current_location">Current Location
                        <input className="nav__check-input" onClick={(e) => setShowMenuCard({ ...showMenuCard, [e.target.name]: !showMenuCard.current_location })} type="checkbox" id="current_location" name="current_location"  />
                        <span className="nav__checkmark"><span className={currentLocatinClasses}></span></span>
                    </label>
                    <label className={labelGetDirectionClasses} htmlFor="get_directions">Get Directions
                        <input className="nav__check-input" onClick={(e) => setShowMenuCard({ ...showMenuCard, [e.target.name]: !showMenuCard.get_directions })} type="checkbox" id="get_directions" name="get_directions"  />
                        <span className="nav__checkmark"><span className={getDirectionClasses}></span></span>
                    </label>
                </div>
            } 
        </nav>
    )
}

export default Navbar
