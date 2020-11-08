import React, { useState, useEffect } from 'react';
import './Options.scss';

interface Props {
  endTime: number;
  intention: string | null;
  sites: Array<string>;
}

function SessionInProgress({ endTime, intention, sites }: Props) {
  const remainingDuration = Math.round((endTime - Date.now()) / 60000);
  return (
    <div>
      <div>
        You are focused on {intention} for the next {remainingDuration} minutes.
      </div>
      <div>
        Allowed sites:{' '}
        {sites.map((site, i) => (
          <ul key={i}>{site}</ul>
        ))}
      </div>
    </div>
  );
}

export default SessionInProgress;
