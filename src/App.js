import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Profile from './components/Profile'
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import Features from './components/Features';
import TripDetails from './components/TripDetails';
import MyTrips from './components/MyTrips';
import { ToastContainer, toast } from 'react-toastify';


function App() {
  return (
<>

<Router>
<Navbar/>
    <Routes>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/' element={  
        <>
          <Home/>
          <Features/>
        </>}>
        </Route>
      <Route path='/profile' element={
        <>
         <Profile/>
         
        </>
       }></Route>
       <Route path="/trip-details" element={<TripDetails />} />
       <Route path="/my-trips" element={<MyTrips />} />
    </Routes>
       <ToastContainer />

<Footer/>
</Router>
</>
  );
}

export default App;
