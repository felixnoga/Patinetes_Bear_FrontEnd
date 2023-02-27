import { Outlet } from "react-router-dom"
import { TripWrapper } from '../context/tripContext';
import BookingPopup from './BookingPopup';
import Map2 from './Map2';
import AsideMenu from "./AsideMenu";
import TripInterface from './TripComponents/TripInterface.jsx';

const Home = () => {

    return (
        <>
            <TripWrapper>
                <AsideMenu />
                 <Map2 />
                <BookingPopup/>
                <TripInterface />
                <Outlet/>
            </TripWrapper>
        </>
    )
}

export default Home

