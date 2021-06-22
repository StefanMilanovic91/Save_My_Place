
class AppService {
    
    static getDirections(lng1, lat1, lng2, lat2) {
        return fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${lng1},${lat1};${lng2},${lat2}?&geometries=geojson&steps=true&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`).then(res => res).then(data => data.json());
    }

    static saveLocationToLS(obj) {
        let oldpLoc = JSON.parse(localStorage.getItem('locations'));
        if (oldpLoc) {
            let newLoc = JSON.stringify([...oldpLoc, obj]);
            localStorage.setItem('locations', newLoc);
            return;
        }
        let newLoc = JSON.stringify([obj]);
        localStorage.setItem('locations', newLoc);
    }

    static getLocationsFromLS() {
        let locations = localStorage.getItem('locations')
        return locations ? JSON.parse(locations) : null;
    }

}


export default AppService;