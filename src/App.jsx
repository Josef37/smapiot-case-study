import { Route, Switch } from 'react-router-dom'
import Events from './pages/Events';
import Home from './pages/Home';
import Machines from "./pages/Machines";

function App() {
  return (
    <>
      <header>Header</header>
      <Switch>
        <Route path="/machines"><Machines /></Route>
        <Route path="/events"><Events /></Route>
        <Route><Home /></Route>
      </Switch>
    </>
  );
}

export default App;
