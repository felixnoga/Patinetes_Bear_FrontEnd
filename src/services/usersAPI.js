import axios from "axios";

class usersAPI{

   static async getAllUser() {
        const requestUrl = `${process.env.REACT_APP_BASE_URL}/user`;
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

export default usersAPI;