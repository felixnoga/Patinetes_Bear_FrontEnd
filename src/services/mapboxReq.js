import axios from "axios";


class mapboxReq {
   static async getDirection(lng, lat){
        return await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?limit=1&types=address&language=es&access_token=${process.env.REACT_APP_MAP_PUBLIC_TOKEN}`)
    }
    static async getIso(lng, lat){
        return await axios.get(`https://api.mapbox.com/isochrone/v1/mapbox/walking/${lng},${lat}?contours_minutes=20&polygons=true&access_token=${process.env.REACT_APP_MAP_PUBLIC_TOKEN}`)
    }

}
export default mapboxReq