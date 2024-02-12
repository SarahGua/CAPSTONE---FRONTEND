import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBarComp from './Components/NavBarComponent';
import HomeComp from './Components/HomeComponent';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import WelcomeComp from './Components/Welcomecomponent';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route element={<HomeComp />} path="/"/>
        {/* <Route element={<NavBarComp />} path="/welcome"/> */}
        <Route element={<WelcomeComp />} path="/welcome"/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
