import { Link, useLocation } from "react-router-dom";
import useIsLoggedInHook from "../../utils/isLoggedInHook";

const Header = () => {
  let location = useLocation();
  const { isLoggedIn } = useIsLoggedInHook();

  return (
    <nav>
      <h2>
        <Link to="/">L&D MERN Demo</Link>
      </h2>
      <ul>
        <li>
          <Link to="/notifications">Notifications</Link>
        </li>
        <li>
          {location.pathname === "/profile" ? (
            <Link to={"/"}>Home</Link>
          ) : (
            <Link to={!!isLoggedIn ? "/profile" : "/auth/login"}>
              {!!isLoggedIn ? "Profile" : "Login"}
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};
export default Header;
