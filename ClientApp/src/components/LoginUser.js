import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { _baseURL } from "./Utils";

const LoginUser = () => {

  useEffect(() => {
    setInputs({username:"", password: "" });
  }, []);
      
  let history = useHistory();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { username, password } = inputs;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (username && password) {
      try {
        debugger   
        const response = await axios.get(
          `${_baseURL}/CheckSalonUser/${username}/${password}`
        );
        console.log(response);

        if (response.data)
            history.push('/queue',  [response.data.salonUserId,response.data.userName])
        else
            alert("User not exists!");    

      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Login User</h2>

        <form name="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
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
            <button className="btn btn-primary">Login</button>
            <Link to="/register" className="btn btn-link">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginUser;
