import { TripWrapper } from '../context/tripContext';
import BookingPopup from './BookingPopup';
import Trip from './Trip';
import Map2 from './Map2';
import AsideMenu from "./AsideMenu";

const Home = () => {

    return (
        <>
            <TripWrapper>
                <AsideMenu />
                <Map2 />
                <BookingPopup/>
                <Trip/>
            </TripWrapper>
        </>
    )
}

export default Home

