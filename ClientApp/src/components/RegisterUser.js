import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { _baseURL } from "./Utils";

const RegisterUser = () => {

  let history = useHistory();

  useEffect(() => {
    setInputs({username:"", userFirstName: "", password: "" });
  }, []);

  const [inputs, setInputs] = useState({
    username: "",
    userFirstName: "", 
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { username, userFirstName, password } = inputs;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (username && userFirstName && password) {
      try {

        const salonUser = {
            salonUserId: 0,
            userName: username,
            userPwd: password,
            UserFirstName: userFirstName   
        };

        const response = await axios.post(`${_baseURL}/AddSalonUser`,salonUser);
        console.log(response);
        history.push("/");

      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Register User</h2>

        <form name="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User Name</label>
            <input
              autoComplete="off"
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              className={
                "form-control" + (submitted && !username ? " is-invalid" : "")
              }
            />
            {submitted && !username && (
              <div className="invalid-feedback">Username is required</div>
            )}
          </div>

          <div className="form-group">
            <label>First Name</label>
            <input
              autoComplete="off"
              type="text"
              name="userFirstName"
              value={userFirstName}
              onChange={handleChange}
              className={
                "form-control" + (submitted && !userFirstName ? " is-invalid" : "")
              }
            />
            {submitted && !userFirstName && (
              <div className="invalid-feedback">First Name is required</div>
            )}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              autoComplete="off"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className={
                "form-control" + (submitted && !password ? " is-invalid" : "")
              }
            />
            {submitted && !password && (
              <div className="invalid-feedback">Password is required</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
