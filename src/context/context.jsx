import { createContext, useContext, useState } from "react";

const AppContext = createContext()
export const AppWrapper = ({ children }) => {
    const [isLog, setIsLog] = useState(false)

    const log= ()=>{
        setIsLog(!isLog)
    }
    const logout= ()=>{
        setIsLog(false)
    }

    return (
        <AppContext.Provider value={({
            isLog,
            log,
            logout
        })}>
            {children}
        </AppContext.Provider>
    )

}
export function useAppContext() {
    return useContext(AppContext)
}