import React from 'react';

import Options from './Options';
import type { SessionData } from './Options';
import './Options.scss';

type Props = SessionData;

function SessionInProgress({ endTime, intention, sites }: Props) {
  if (!endTime) return <Options />;

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
