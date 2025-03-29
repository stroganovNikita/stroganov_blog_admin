import { useState, useEffect } from "react";
import classes from "./nav.module.css";
import checkTokenFetch from "../../javascript/checkTokenFetch";
import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
function Nav() {
  const [currentLink, setCurrentLink] = useState(null);
  const [checkToken, setCheckToken] = useState(0);

  useEffect(() => {
    let checkFn = checkTokenFetch();
    checkFn.then((answer) => setCheckToken(answer));
  }, []);

  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  return (
    <nav>
      <div className={classes.logoDivLink}>
        <Link
          to="/"
          onClick={() => setCurrentLink(0)}
          className={window.location.pathname === "/" ? classes.underline : ""}
          viewTransition
        >
          Articles
        </Link>
      </div>
      <img src={logo} className={classes.logoImg} />
      <div className={classes.logoDivLink}>
        {checkToken.data ? (
          <Link onClick={logout} style={{ marginRight: "6rem" }} viewTransition>
            Log out
          </Link>
        ) : (
          <>
            <Link
              to="/session"
              onClick={() => setCurrentLink(3)}
              className={
                window.location.pathname === "/session" ? classes.underline : ""
              }
              viewTransition
            >
              Log in
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
