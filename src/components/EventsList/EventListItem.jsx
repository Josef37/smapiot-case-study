import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from 'date-fns';

export const EventListItem = ({ id, machine_id, machineName, timestamp, status }) => {
  return (
    <div>
      <h2><Link to={`/machines/${machine_id}`}>{machineName}</Link></h2>
      <p>{status}</p>
      <p>{formatDistanceToNow(parseISO(timestamp), { addSuffix: true })}</p>
    </div>
  );
};
