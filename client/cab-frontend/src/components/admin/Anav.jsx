import { Link, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaCar,
  FaClipboardList,
  FaPlusCircle,
  FaSignOutAlt,
} from "react-icons/fa";

function Anav() {
  const navigate = useNavigate();
const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };


  return (
   <nav
    className="navbar navbar-expand-lg navbar-dark"
    style={{
        background: "linear-gradient(90deg,#004d40,#00695c)"
    }}
>

      <div className="container">

        <Link className="navbar-brand fw-bold" to="/admin/home">
          🚖 UCab Admin
        </Link>

        <button
          className="navbar-toggler"
          data-bs-toggle="collapse"
          data-bs-target="#adminNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="adminNav">

          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/admin/home">
                <FaTachometerAlt /> Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/admin/users">
                <FaUsers /> Users
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/admin/cabs">
                <FaCar /> Cars
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/admin/addcar">
                <FaPlusCircle /> Add Car
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/admin/bookings">
                <FaClipboardList /> Bookings
              </Link>
            </li>
            <li className="nav-item">
    <Link
        className="nav-link"
        to="/admin/adddriver"
    >
        🚖 Register Driver
    </Link>
</li>

          </ul>

          <button
            className="btn btn-danger"
            onClick={logout}
          >
            <FaSignOutAlt /> Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Anav;