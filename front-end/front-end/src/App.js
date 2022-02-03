
import './App.css';
import {BrowserRouter as Router,Route, Switch} from "react-router-dom";
import Astronauts from "./components/Astronauts";
import Spacecrafts from "./components/Spacecrafts";

function App() {
  return (
      <Router>
      <Switch>
          <Route exact path="/spacecrafts/:id">
              <Spacecrafts/>
          </Route>
        <Route path="/">
          <Astronauts />
        </Route>

      </Switch>
      </Router>
  );
}

export default App;
