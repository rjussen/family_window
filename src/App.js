import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Memories from './components/Memories/Memories';
import Events from './components/Events/Events';
import Connect from './components/Connect/Connect';
import AlbumPage from './components/AlbumPage/AlbumPage';
import LinkIcon from '@material-ui/icons/Link';
function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/a">
            <AlbumPage />
          </Route>
          <Route path="/events">
            <Events />
          </Route>
          <Route path="/connect">
            <Connect />
          </Route>
          <Route path={["/memories", "/"]}>
           <Memories />
          </Route>
        </Switch>
        <Navbar />
      </Router>
      {/* Header */}
      {/* App */}
      {/* Nav */}
    </div>

  );
}


export default App;
