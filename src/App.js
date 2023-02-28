import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { AppWrapper } from './context/context';
import ProtectedRoute from './utils/ProtectedRoute';
import ErrorMessage from './utils/ErrorMessage';
import Login from './Components/Login';
import Home from './Components/Home';
// import DetailsHistoryUser from './Components/DetailsHistoryUser';
import AllTrips from './Components/AllTrips';
import Register from './Components/Register';
import LandingPage from './Components/Landing';
import Payments from './Components/Payments';
import NoTrips from './Components/NoTrips';
 
function App() {

  

  return (
    <div className="App">
      <AppWrapper>
        <Routes>
          <Route path="/landing" element={<LandingPage/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/no-trips" element={<NoTrips/>}/>
          {/* <Route path='/detailshistoryuser' element={<DetailsHistoryUser/>}></Route> */}
          <Route path='/all-trips' element={<AllTrips/>}></Route>
          <Route path="/" element={
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>}/>
          <Route path="*" element={<h1>Esta ruta no existe</h1>}/>
          <Route path="/forma_pago" element={<Payments />} />
        </Routes>

        <ErrorMessage/>
      </AppWrapper>
    </div>
  );
}

export default App;
