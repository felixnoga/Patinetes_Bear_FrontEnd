import { useAppContext } from "../context/context"
import { Navigate, useLocation } from "react-router-dom"

const ProtectedRoute= ({children})=> {
    const {isLog}= useAppContext()
    const location = useLocation()

    if (isLog === false) return <Navigate to="/login" state={{ location }} />

    return children
}

export default ProtectedRoute