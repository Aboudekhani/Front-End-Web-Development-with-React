import {Navbar, NavbarBrand} from 'reactstrap'
import './App.css';
import Menu from './components/MenuComponent';

function App() {
  return (
    <div>
      <Navbar dark color="primary">
        <div className="container">
          <NavbarBrand href="/">Ristorante Con fusionn</NavbarBrand>
        </div>
      </Navbar>
      <Menu/>

      <div className="container">
      </div>
    </div>
  );
}

export default App;
