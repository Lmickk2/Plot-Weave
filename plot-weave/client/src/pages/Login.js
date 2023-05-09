import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { Helmet } from "react-helmet";

import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="cool-bg">
      <Helmet>
        <title>Plot Weave | Login</title>
      </Helmet>
      <div className="large-container-center">
        <div className="login-cont">
          <h2>Login</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="enter-cred">
              <label htmlFor="email"></label>
              <input
                placeholder="YourEmail@mail.com"
                name="email"
                type="email"
                value={formState.email}
                className="cred-input"
                onChange={handleChange}
              />
            </div>
            <div className="enter-cred">
              <label htmlFor="pwd"></label>
              <input
                placeholder="Password"
                name="password"
                type="password"
                value={formState.password}
                className="cred-input"
                onChange={handleChange}
              />
            </div>
            {error ? (
              <div>
                <p className="error-text">
                  The provided credentials are incorrect
                </p>
              </div>
            ) : null}
            <div className="log-btns">
              <button type="submit" className="long-btn">
                Login
              </button>
              <p className="or">Or</p>
              <button className="long-btn signup-btn">
                <Link to="/signup">Signup</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
