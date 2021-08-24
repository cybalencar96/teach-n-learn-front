import './App.css';
import { Link } from 'react-router-dom';
import ReactDOM from 'react-dom'
import Home from "./Home"

function Nav() {
  function isLoggedIn() {
    return true;
  }
  const nav = document.querySelector('.nav-list');
  return (
    <nav>
      <Link to='/'><h1>Nav</h1></Link>
      <ul className="nav-list">
          <Link to='/about'><li>About</li></Link>
          <Link to="/shop"><li>Shop</li></Link>
      </ul>
    </nav>
  );
}

export default Nav;
