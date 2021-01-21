import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import MachinesList from '../../components/MachinesList'
import MachineDetails from '../../components/MachineDetails'
import MachinesMap from '../../components/MachinesMap'
import { styled } from '@material-ui/core/styles'

const Machines = () => {
  const { path } = useRouteMatch()

  return (
    <Container>
      <MachinesList />
      <Switch>
        <Route path={`${path}/:id`} render={({ match }) => (
          <MachineDetails id={match.params.id} />
        )} />
        <Route>
          <MachinesMap />
        </Route>
      </Switch>
    </Container>
  )
}

const Container = styled("div")({
  display: "grid",
  gridTemplateColumns: "300px 1fr"
})

export default Machines
