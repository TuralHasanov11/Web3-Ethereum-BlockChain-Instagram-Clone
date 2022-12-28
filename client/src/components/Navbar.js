import React from 'react'
import { NavLink } from 'react-router-dom'
import photo from '../assets/logo.png'

export default function Navbar({ account }) {

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/"><img src={photo} width="30" height="30" className="d-inline-block align-top" alt="" /></NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <small className="text-secondary">
                <small id="account">{account}</small>
              </small>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
