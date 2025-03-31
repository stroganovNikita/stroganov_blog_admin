import { useState, useEffect } from "react";
import checkTokenFetch from "../javascript/checkTokenFetch";
import { useNavigate } from "react-router-dom";
import Nav from "../partials/Nav/Nav";
import classes from "./login.module.css";
import brain from "../../assets/brain.png";

function LogIn() {
  const [response, setResponse] = useState(0);
  const [checkToken, setCheckToken] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let checkFn = checkTokenFetch();
    checkFn.then((answer) => setCheckToken(answer));
  }, []);

  const handleSubmit = async (event) => {
    const body = event.currentTarget.elements;
    let answer = "";
    event.preventDefault();
    fetch("https://celebrated-vision-production.up.railway.app/session/", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        nickname: body.nickname.value,
        password: body.password.value,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        answer = response;
        setResponse(answer);
        if (answer.data) {
          localStorage.setItem("token", answer.data);
          navigate("/");
        }
      });
  };

  if (checkToken.data || response.data) {
    return (
      <>
        <Nav />
        <h2 className={classes.infoAuth}>You are authorize</h2>
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className={classes.mainLogIn}>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          {response.errors && (
            <ul>
              {response.errors.map((error, index) => (
                <li key={index}>{error.msg}</li>
              ))}
            </ul>
          )}

          <label htmlFor="nickname">Nickname</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            minLength="5"
            maxLength="20"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            maxLength="25"
            required
          />
          <button type="submit">Login</button>
        </form>
        <h3 className={classes.textBeforeBrain}>How are you?</h3>
        <img src={brain} className={classes.brain} />
      </main>
    </>
  );
}

export default LogIn;
