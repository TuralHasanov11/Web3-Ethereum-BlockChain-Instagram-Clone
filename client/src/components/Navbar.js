import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar({ account }) {
  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Ethegram{/* <img src={photo} width="30" height="30" className="d-inline-block align-top" alt="" /> */}</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <small className="text-secondary">
                <small id="account">{'0x0'}</small>
              </small>
              {account
                ? <img
                  className='ml-2'
                  width='30'
                  height='30'
                  alt=""
                  src=""
                />
                : <span></span>
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
