import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = (props) => {
  const {filtrar}=props
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info">
  <div className="container-fluid">
   <Link  to='/' className='nav-item'><i class="fa-solid fa-house"></i> Home</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> 
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
       
        <li className="nav-item">
          <Link className="nav-link" to='/add'> <i className="fa-solid fa-plus"></i> Add</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to='/' id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-circle-chevron-down"></i> Dropdown
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to='/addname'> <i className="fa-solid fa-plus m-2"></i>Add Name</Link></li>
            <li><Link className="dropdown-item" to='/'>Another action</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link className="dropdown-item" to='/'>Something else here</Link></li>
          </ul>
        </li>
        
      </ul>
      <form className="d-flex mr-">
        <input className="form-control ml-4 bg-light" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>filtrar(e.target.value)}/>
        <input className="form-control ml-4 bg-light" type="date" placeholder="Search" aria-label="Search" onChange={(e)=>filtrar(e.target.value)}/>
        
      </form>
    </div>
  </div>
</nav>
  )
}

export default NavBar