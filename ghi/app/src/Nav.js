import { NavLink } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';


function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavDropdown id="nav-dropdown-dark-example" title="Inventory" menuVariant="dark">
                <NavDropdown.Item href="/inventory/automobiles">View all automobiles</NavDropdown.Item>
                <NavDropdown.Item href="/inventory/automobiles/new">Add automobile to inventory</NavDropdown.Item>
            </NavDropdown>
            <li className="nav-item">
            <NavDropdown id="nav-dropdown-dark-example" title="Appointments" menuVariant="dark">
                <NavDropdown.Item href="/appointments">Show appointments</NavDropdown.Item>
                <NavDropdown.Item href="/appointments/new">Add new appointment</NavDropdown.Item>
                <NavDropdown.Item href="/appointments/history">Appointment history</NavDropdown.Item>
            </NavDropdown>
            </li>
            <li className="nav-item"></li>
            <NavDropdown id="nav-dropdown-dark-example" title="Technicians" menuVariant="dark">
                <NavDropdown.Item href="/technicians">View technicians </NavDropdown.Item>
                <NavDropdown.Item href="/technicians/new">Add a technician</NavDropdown.Item>
                <NavDropdown.Item href="/inventory/new-automobile">Add automobile to inventory</NavDropdown.Item>
            </NavDropdown>
          </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
