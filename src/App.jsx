import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import Header from './components/Header';
import Events from './pages/Events';
import Home from './pages/Home';
import Machines from "./pages/Machines";
import { loadMachines } from './redux/slices/machines';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadMachines())
  }, [dispatch])

  return (
    <>
      <Header />
      <Switch>
        <Route path="/machines"><Machines /></Route>
        <Route path="/events"><Events /></Route>
        <Route><Home /></Route>
      </Switch>
    </>
  );
}

export default App;
