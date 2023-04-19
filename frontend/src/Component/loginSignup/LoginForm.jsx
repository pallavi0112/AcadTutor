import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { showHide } from "../../features/Reducer";
import { loginUser } from "../../features/users/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const showLogin = useSelector((state) => state.showLoginSlice.showHide);
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.auth.status);
  const error = useSelector((state) => state.auth.error);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState({
    iserror: false,
    error: ''
  });
  const Navigate = useNavigate();
  const validateForm = () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      setEmailError({
        iserror: true,
        error: 'Please enter a valid email address.'
      });
      return false;
    }
    return true;
  }
  const LoginUser = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(loginUser({ email, password }));
    }
  };
  // if (status === "loading") {
  //   return console.log("loading");
  // }

  // if (status === "failed") {
  //   return console.log(error);
  // }

  if (status === "succeeded") {
    if (user === "teacher") {
        Navigate("/teacher/dashboard");
    } else if (user === "student") {
        Navigate("/student/dashboard");
    } else {
      // Navigate("/");
    }
    setEmail("");
    setPassword("");
  }
  if (!showLogin) {
    return null;
  }
  return (
    <div className="LoginForm_Container">
      <div className="Loginform_Wrapper">
        <button className="crossbtn" onClick={() => dispatch(showHide(false))}>
          <FaTimes />
        </button>
        <h2>Login Page</h2>
        {error && <div><div className="res-error" >{error}</div></div>}
        <form className="LoginForm" onSubmit={LoginUser}>
          <div>
            <input
              type="text"
              placeholder="Email Address"
              value={email}
              name="email"
              className={emailError.iserror ? 'field_error' : ''}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="error">{emailError.error}</p>
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <a to="/" className="FP">
            Forgot Password ?
          </a>
          <input
            type="submit"
            className="Formbutton"
            style={{ backgroundColor: "#ff9900" }}
            value="Login"
          />
          <p>
            don't have account ? <a href="/signup">Signup Now</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
