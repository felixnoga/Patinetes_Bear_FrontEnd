import { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

 const ClientContext = createContext();

export const ClientDataProvider = ({ children }) => {

    const [clientData, setClientData] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {

    }, [])

    
    
    const getClientData = async () => {
        const client_id =  localStorage.getItem('id')
         const res = await axios.get(`http://localhost:3005/client/${client_id}`);
        setClientData(res.data[0]);
    } 

    const getUserData = async () =>{
        const user_id =  localStorage.getItem('id')
         const res = await axios.get(`http://localhost:3005/user/${user_id}`);
        setUserData(res.data[0]);
    }

  

    return (
        <ClientContext.Provider value={({
            clientData,
            getClientData,

            userData, 
            getUserData,

         })}>

            {children}

        </ClientContext.Provider>
    );
}

export function useClientContext() {
    return useContext(ClientContext);
}
 