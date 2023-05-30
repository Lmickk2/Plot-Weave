import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';


import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleCheckboxChange = (event) => {
    setAgreeTerms(event.target.checked);
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="cool-bg">
      <Helmet>
          <title>Plot Weave | Signup</title>
      </Helmet>
    <div className="large-container-center">
    <div className="login-cont">

      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <label htmlFor="username"></label>
          <input
                   placeholder="Username"
                   name="username"
                   type="text"
                   value={formState.name}
            className="cred-input"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="email"></label>
          <input
            placeholder="youremail@test.com"
                  name="email"
                  type="email"
                  value={formState.email}
            className="cred-input"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="pwd"></label>
          <input
            placeholder="password"
            name="password"
            type="password"
            value={formState.password}
            className="cred-input"
            onChange={handleChange}
          />
        </div>
      <label className="terms" htmlFor="terms">
      <input
        id="terms"
        type="checkbox"
        checked={agreeTerms}
        onChange={handleCheckboxChange}
      />
      I have read and agree to the <span className="emph"><Link to="/terms" target="_blank">terms</Link></span>
    </label>
    <br/>
        <button type="submit" className="long-btn top" disabled={!agreeTerms}>Submit</button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default Signup;
