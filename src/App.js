import './App.css';
import { Routes, Route } from "react-router-dom";
import { AppWrapper } from './context/context';
import { ClientDataProvider } from './context/clientDataContext'
import ProtectedRoute from './utils/ProtectedRoute';
import ErrorMessage from './utils/ErrorMessage';
import Login from './Components/Login';
import Home from './Components/Home';
import HistoryKM from './Components/HistoryKm';
import DetailsHistoryUser from './Components/DetailsHistoryUser';
import AllUsers from './Components/AllUsers';
import Register from './Components/Register';
import LandingPage from './Components/Landing';
import Payments from './Components/Payments';
import Invoice from './Components/TripComponents/Invoice';

function App() {



  return (
    <div className="App">
      <AppWrapper>
      <ClientDataProvider>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/historykm" element={<HistoryKM />}></Route>
          <Route path='/detailshistoryuser' element={<DetailsHistoryUser />}></Route>
          <Route path='/all-users' element={<AllUsers />}></Route>
          <Route path="/home" element={

              <ProtectedRoute>
                <Home />
              </ProtectedRoute>

          }>

            <Route path="payments" element={<Invoice />}></Route>
          </Route>
          <Route path="*" element={<h1>Esta ruta no existe</h1>} />
          <Route path="/forma_pago" element={<Payments />} />
        </Routes>
        <ErrorMessage />
        </ClientDataProvider>
      </AppWrapper>
    </div>
  );
}

export default App;
