import './App.css';
import { Routes, Route } from "react-router-dom";
import { AppWrapper } from './context/context';
import ProtectedRoute from './utils/ProtectedRoute';
import ErrorMessage from './utils/ErrorMessage';
import Login from './Components/Login';
import Register from './Components/Register'
import Home from './Components/Home';
import Payments from './Components/Payments';
 
function App() {

  

  return (
    <div className="App">
      <AppWrapper>
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
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
