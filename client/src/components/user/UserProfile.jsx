import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './UserProfile.css'

function UserProfile() {
  return (
    <div>
     {userStatus ? (
          <div className="account-blocked-msg">Your account is blocked. Please contact the admin.</div>
      ) : (
        <>
        <ul className="d-flex justify-content-around list-unstyled fs-1">
        <li className="nav-item">
          <Link to ='articles' className="nav-link">Articles</Link>
        </li>
       
      </ul>
      <div className="mt-5">
        <Outlet />
      </div>
        </>
      )}
      {/* <ul className="d-flex justify-content-around list-unstyled fs-1">
        <li className="nav-item">
          <Link to ='articles' className="nav-link">Articles</Link>
        </li>
       
      </ul>
      <div className="mt-5">
        <Outlet />
      </div> */}
    </div>
  )
}

export default UserProfile