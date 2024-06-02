import React from 'react'
import { Link } from 'react-router-dom'
import NotFoundImg from "../../assets/images/404.svg"

const NotFound = () => {
  return (
    <div className="row">
      <div className="d-flex justify-content-center page-not-found-wrapper">
        <img
          src={NotFoundImg}
          height="550"
          width="550"
          alt="404_not_found"
        />
      </div>
      <h5 className="text-center">
        Page Not Found. Go to <Link to="/">Homepage</Link>
      </h5>
    </div>
  )
}

export default NotFound