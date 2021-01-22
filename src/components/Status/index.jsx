import React from 'react'
import Typography from '@material-ui/core/Typography'
import capitalize from "lodash/capitalize";
import { styled } from '@material-ui/core/styles';

const Status = ({ status }) => {
  return (
    <Typography>
      Status:{" "}
      <Text status={status}>
        {capitalize(status)}
      </Text>
    </Typography>
  )
}

const statusColors = {
  "running": "green",
  "finished": "grey",
  "errored": "red",
}
const Text = styled("b")({
  fontSize: "1.2em",
  color: ({ status }) => statusColors[status] ?? "inherit"
})

export default Status
