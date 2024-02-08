import React from 'react'
import LOGO from "../../assets/images/shopit_logo.png"
import { Link } from "react-router-dom"
import defaultAvatar from "../../assets/images/default_avatar.jpg"

const Header = () => {
  return (
    <div>
      <nav className="navbar row">
      <div className="col-12 col-md-3 ps-5">
        <div className="navbar-brand">
          <Link to="/">
            <img src={LOGO} alt="ShopIT Logo" />
          </Link>
        </div>
      </div>
      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <form action="your_search_action_url_here" >
          <div className="input-group">
            <input
              type="text"
              id="search_field"
              aria-describedby="search_btn"
              className="form-control"
              placeholder="Enter Product Name ..."
              name="keyword"
              value=""
            />
            <button id="search_btn" className="btn" type="submit">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <Link to="/cart">
          <span id="cart" className="ms-3"> Cart </span>
          <span className="ms-1" id="cart_count">0</span>
        </Link>

        <div className="ms-4 dropdown">
          <button
            className="btn dropdown-toggle text-white"
            type="button"
            id="dropDownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <figure className="avatar avatar-nav">
              <img
                src={defaultAvatar}
                alt="User Avatar"
                className="rounded-circle"
              />
            </figure>
            <span>User</span>
          </button>
          <div className="dropdown-menu w-100" aria-labelledby="dropDownMenuButton">
            <Link className="dropdown-item" to="/admin/dashboard"> Dashboard </Link>

            <Link className="dropdown-item" to="/me/orders"> Orders </Link>

            <Link className="dropdown-item" to="/me/profile"> Profile </Link>

            <Link className="dropdown-item text-danger" to="/"> Logout </Link>
          </div>
        </div>
        <Link to="/login" className="btn ms-4" id="login_btn"> Login </Link>
      </div>
    </nav>
    </div>
  )
}

export default Header;
