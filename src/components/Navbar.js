import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    let location = useLocation()
    const navigate = useNavigate()
   const handlelogout = ()=>{
    localStorage.removeItem('token')
    navigate('/signup')
   }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <Link
        className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        to="/"
        >
        Home
        </Link>

        <Link
        className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
        to="/about"
        >
        About
        </Link>
                
      </ul>
      {!localStorage.getItem('token')?<form className="d-flex">
        <Link role="button" to="/login" className="btn btn-primary mx-2">log in</Link>
        <Link role="button" to="/signup" className="btn btn-primary mx-2">sign up</Link>
      </form>:<button onClick={handlelogout} className='btn btn-primary'>log out</button>}
    </div>
  </div>
</nav>
  )
}

export default Navbar
