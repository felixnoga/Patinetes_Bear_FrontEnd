import axios from "axios"

const serverReq= {
    url: process.env.REACT_APP_SERVER,

    async nearbyScooters(lng, lat){
        return await axios.get(`${this.url}/scooters/available/${lng},${lat}`)
    },
    async bookingScooter(body) {
        return await axios.post(`${this.url}/booking`, body)
    },
    async confirmBooking(booking_id, body) {
        return await axios.post(`${this.url}/booking/${booking_id}`, body)
    },
    async finishTrip(trip_id, body) {
        return await axios.post(`${this.url}/trip/${trip_id}`, body)
    },
    async cancelBooking(id_scooter){
        return await axios.post(`${this.url}/scooters/status/${id_scooter}`)
    }

}

export default serverReq