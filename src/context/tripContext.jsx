import { createContext, useContext, useState } from "react";

const TripContext = createContext()
export const TripWrapper = ({ children }) => {
    const [isSelected, setIsSelected] = useState(false)
    const [scooter, setScooter]= useState({})
    const [userPosition, setUserPosition]= useState([])

    const select = () => {
        setIsSelected(true)
    }
    const unSelect = () => {
        setIsSelected(false)
    }
    const updatePos= (lng, lat)=>{
        setUserPosition([lng, lat])
    }

    return (
        <TripContext.Provider value={({
            isSelected,
            scooter,
            setScooter,
            select,
            unSelect,
            userPosition,
            updatePos
        })}>
            {children}
        </TripContext.Provider>
    )

}
export function useTripContext() {
    return useContext(TripContext)
}