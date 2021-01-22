import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom'
import { styled } from '@material-ui/core';
import Header from './components/Header';
import Events from './pages/Events';
import Machines from "./pages/Machines";
import { loadMachines } from './redux/slices/machines';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadMachines())
  }, [dispatch])

  return (
    <Container>
      <Header />
      <Switch>
        <Route path="/machines"><Machines /></Route>
        <Route path="/events"><Events /></Route>
        <Route><Redirect to="/machines" /></Route>
      </Switch>
    </Container>
  );
}

const Container = styled("div")({
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  "& > :first-child": {
    flex: "0 0 50px"
  },
  "& > :last-child": {
    flex: "1 1 100px",
    overflow: "hidden"
  }
})


export default App;
