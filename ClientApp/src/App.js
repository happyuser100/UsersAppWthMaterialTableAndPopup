import React from "react";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import LoginUser from "./components/LoginUser";
import UsersQueue from "./components/UsersQueue";
import RegisterUser from "./components/RegisterUser";
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";


function App(props) {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={LoginUser} />
          <Route exact path="/register" component={RegisterUser} />
          <Route exact path="/queue" component={UsersQueue} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

