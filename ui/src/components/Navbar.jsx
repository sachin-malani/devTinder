import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";
import axios from "axios";
import { removeFeed } from "../utils/feedSlice";
import { useState } from "react";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeFeed());
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {}
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link to={user ? "/" : "/login"} className="btn btn-ghost text-xl">
          💻 Dev Tinder
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-2">
          <div className="form-control">Welcome, {user.firstName}</div>

          <div className="dropdown dropdown-end mx-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setDropdown(!dropdown)}
            >
              <div className="w-10 rounded-full">
                <img alt="User Image" src={user.photoUrl} />
              </div>
            </div>
            {dropdown && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li onClick={() => setDropdown(false)}>
                  <Link to="/profile">Profile</Link>
                </li>
                <li onClick={() => setDropdown(false)}>
                  <Link to="/connections">Connections</Link>
                </li>
                <li onClick={() => setDropdown(false)}>
                  <Link to="/request">Request</Link>
                </li>

                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
