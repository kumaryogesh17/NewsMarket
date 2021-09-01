import NavBar from './components/NavBar';
import './App.css';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        
        <Switch>
          <Route exact path="/"><News  key="home" category="general" /></Route>
          <Route exact path="/sports"><News  key="sports"  category="sports" /></Route>
          <Route exact path="/business"><News key="business" category="business" /></Route>
          <Route exact path="/entertainment"><News key="entertainment" category="entertainment" /></Route>
          <Route exact path="/general"><News  key="general" category="general" /></Route>
          <Route exact path="/science"><News key="science"  category="science" /></Route>
          <Route exact path="/technology"><News  key="technology" category="technology" /></Route>
          <Route exact path="/health"><News key="health"  category="health" /></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
