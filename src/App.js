import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBarComp from './Components/NavBarComponent';
import HomeComp from './Components/HomeComponent';

function App() {
  return (
    <div className="App">
      <NavBarComp />
      <HomeComp />
    </div>
  );
}

export default App;
