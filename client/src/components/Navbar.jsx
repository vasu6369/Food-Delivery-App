import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { StoreContext } from '../context/Context';

export default function Navbar() {
  const { user, handleLogout,cartitems } = useContext(StoreContext);

  const cartlength = Object.values(cartitems).filter(quantity => quantity > 0).length;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top ">
      <div className="container-fluid">
        <NavLink to='/'>
          <img src="/logo.png" alt="Food Logo" style={{ height: "60px",width:"100px" ,marginLeft:"5px" }} />
          <img src="/name.png" alt="name" style={{ height: "60px",width:"150px" ,marginLeft:"5px" }} />
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item p-1">
              <NavLink to="/" className="nav-link fw-bold fs-5" >Home</NavLink>
            </li>
            {!user ?
              <>
                <li className="nav-item p-1">
                  <NavLink to="/login" className="nav-link fw-bold fs-5" >Login</NavLink>
                </li>
                <li className="nav-item p-1">
                  <NavLink to="/signup" className="nav-link fw-bold fs-5" >SignUp</NavLink>
                </li>
              </>
              :
              <>
                <li className="nav-item p-1">
                  <NavLink to="/cart" className="nav-link fw-bold fs-5" >MyCart({cartlength})</NavLink>
                </li>
                <li className="nav-item dropdown p-1 fw-bold fs-5">
                  <a class="nav-link " href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {user.name} <FaUserCircle size={30}/>
                  </a>
                  <ul className="dropdown-menu">
                    <li><NavLink to="/whislist" className="nav-link" >whislist</NavLink></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><NavLink to="/myorders" className="nav-link" >MyOrders</NavLink></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><p className='nav-link' onClick={handleLogout}>Logout</p></li>
                  </ul>
                </li>
                <li className="nav-item p-1">
                  <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                </li>
              </>
            }


          </ul>
        </div>
      </div>
    </nav>
  );
}
