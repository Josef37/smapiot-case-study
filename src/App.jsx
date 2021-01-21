import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom'
import Events from './pages/Events';
import Home from './pages/Home';
import Machines from "./pages/Machines";
import { loadMachineDetails, loadMachines } from './redux/slices/machines';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadMachines())
    dispatch(loadMachineDetails("68015cc1-3119-42d2-9d4e-3e824723fe03"))
  }, [dispatch])

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
