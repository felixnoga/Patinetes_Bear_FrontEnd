import axios from "axios";

class tipsAPI{

   static async getAllTrip() {
        const requestUrl = `${process.env.REACT_APP_BASE_URL}/trip`;
        console.log("To backend!");
        try {
            const response = await axios.get(requestUrl);
      
            console.log(response.data)
            return response.data
        }
        catch (error) {  
            console.error(error);
            return error.response.data;
        }
    }

}

export default tipsAPI;