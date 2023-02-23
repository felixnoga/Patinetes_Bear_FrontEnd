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
            </TripWrapper>
        </>
    )
}

export default Home

