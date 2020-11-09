import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

import {
  startSession,
  writeNewSiteList,
} from '../../utils/chromeStorageActions';
import type { SessionData } from './Options';
import './Options.scss';

type Props = {
  sessionData: SessionData;
  updateSession: any;
};

function SessionEdit({ sessionData, updateSession }: Props) {
  const { intention, sites } = sessionData;

  // input states
  const [siteInput, setSiteInput] = useState('');
  const [duration, setDuration] = useState('');

  // update site list
  const updateSiteList = (sites: Array<string>) => {
    writeNewSiteList(sites, () => {
      updateSession({
        ...sessionData,
        sites: sites,
      });
      setSiteInput('');
    });
  };

  // add site to allowlist
  const addSite = () => {
    const newSitesList = [...sites, siteInput];
    // persist new list
    updateSiteList(newSitesList);
  };

  // remove site from allowlist
  const removeSite = (index: number) => {
    const newSitesList = [...sites];
    newSitesList.splice(index, 1);
    // persist new list
    updateSiteList(newSitesList);
  };

  // start session
  const handleStartSessionClick = () => {
    startSession(intention, duration, sites);
    location.reload(); // eslint-disable-line no-restricted-globals
  };

  return (
    <div className="Options container-fluid my-5">
      <div>
        <div className="Intention">
          I want to focus on{' '}
          <div className="Intention-input">
            <input
              placeholder="intention"
              value={intention}
              onChange={(e) =>
                updateSession({ ...sessionData, intention: e.target.value })
              }
            />
          </div>
        </div>
        <div className="Time-sentence">
          for the next
          <input
            placeholder="5"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          minutes.
        </div>
        <div className="Website-list">
          <div style={{ fontSize: '20px', fontWeight: 'bold', padding: '5px' }}>
            Allowed sites:
          </div>
          <input
            className="Website-input"
            value={siteInput}
            onChange={(e) => setSiteInput(e.target.value)}
          ></input>{' '}
          <button onClick={addSite}>add</button>
          <div style={{ paddingTop: '10px' }}>
            {sites &&
              sites.map((site, i) => (
                <ul key={i}>
                  {site} <button onClick={() => removeSite(i)}>x</button>
                </ul>
              ))}
          </div>
        </div>
        <div className="Start-button">
          <button onClick={handleStartSessionClick}>Start</button>
        </div>
      </div>
    </div>
  );
}

export default SessionEdit;
