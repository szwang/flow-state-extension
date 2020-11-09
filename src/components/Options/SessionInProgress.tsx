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
      <div className="Intention">
        You are focused on {intention} for the next {remainingDuration} minutes.
      </div>
      <div className="Website-list">
        Allowed sites:{' '}
        {sites.map((site, i) => (
          <ul key={i}>
            <a href={site}>{site}</a>
          </ul>
        ))}
      </div>
    </div>
  );
}

export default SessionInProgress;
