import axios from "axios"

const serverReq= {
    url: process.env.REACT_APP_SERVER,

    async nearbyScooters(lng, lat){
        return await axios.get(`${this.url}/scooters/available/${lng},${lat}`)
    }


}

export default serverReq