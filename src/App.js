import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import HomeComp from './Components/HomeComponent';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import WelcomeComp from './Components/Welcomecomponent';
import RegisterComp from './Components/RegisterComponent';
import ExhibitorListComp from './Components/ExhibitorListComponent';
import ExhibitorProfile from './Components/ExhibitorProfile';
import WishList from './Components/WishListComponent';
import AgendaComp from './Components/AgendaComponent';
import Appointment from './Components/Appointment';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route element={<HomeComp />} path="/"/>
        <Route element={<WelcomeComp />} path="/welcome"/>
        <Route element={<RegisterComp />} path='register'/>
        <Route element={<ExhibitorListComp />} path='/list'/>
        <Route element={<ExhibitorProfile />} path='/profile'/>
        <Route element={<WishList />} path='/wish'/>
        <Route element={<AgendaComp />} path='/agenda'/>
        <Route element={<Appointment />} path='/appointment'/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
