import Home from "./components/Home";
import Department from "./components/Department";
import Employee from "./components/Employee";

import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom"

function App() {
  return (
    <Router>
      <div className="App container">
        <h3 className="d-flex justify-content-center m-3">
          Heading
        </h3>

        <nav className="navbar navbar-expand-sm bg-light navbar-dark">
          <ul className="navbar-nav">
            <li className="nav-item m-1">
                <NavLink className="btn btn-light btn-outline-primary" to="/home">
                  Home
                </NavLink>

            </li>

            <li className="nav-item m-1">
                <NavLink className="btn btn-light btn-outline-primary" to="/department">
                  Department
                </NavLink>

            </li>

            <li className="nav-item m-1">
                <NavLink className="btn btn-light btn-outline-primary" to="/employee">
                  Employee
                </NavLink>
            </li>
          </ul>
        </nav>
          
          <Switch>
            <Route exact path="/home" component={ Home }/>
            <Route path="/department" component={ Department }/>
            <Route path="/employee" component={ Employee }/>
          </Switch>

      </div>
    </Router>
  );
}

export default App;
