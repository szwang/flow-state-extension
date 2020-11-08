import React, { useState } from 'react';

import type { SessionData } from './Options';

import './Options.scss';
declare var chrome: any;

function startSession(
  intention: string,
  duration: string,
  sites: Array<string>
) {
  const currentTime = Date.now();
  // change duration from min to ms
  const durationMs = parseInt(duration) * 60 * 1000;
  const endTime = currentTime + durationMs;

  chrome.storage.sync.set(
    {
      intention,
      endTime,
      sites,
    },
    () => {
      chrome.storage.sync.get(null, (data: SessionData) => {
        console.log('data after set', data);
      });
    }
  );
}

function writeNewSiteList(sites: Array<string>, stateUpdate: () => void) {
  chrome.storage.sync.set({ sites }, () => {
    stateUpdate();
  });
}

type Props = {
  sessionData: SessionData;
  updateSession: any;
};

function SessionEdit({ sessionData, updateSession }: Props) {
  const { intention, sites } = sessionData;

  // input states
  const [siteInput, setSiteInput] = useState('');
  const [duration, setDuration] = useState('0');

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
  };

  return (
    <div className="Options container-fluid my-5">
      <div>
        <div>
          I want to focus on{' '}
          <input
            value={intention}
            onChange={(e) =>
              updateSession({ ...sessionData, intention: e.target.value })
            }
          ></input>
        </div>
        <div>
          Websites:
          <input
            value={siteInput}
            onChange={(e) => setSiteInput(e.target.value)}
          ></input>{' '}
          <button onClick={addSite}>add</button>
          {sites &&
            sites.map((site, i) => (
              <li key={i}>
                {site} <button onClick={() => removeSite(i)}>x</button>
              </li>
            ))}
        </div>
        <div>
          Time set{' '}
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          ></input>{' '}
          min
        </div>
        <div>
          <button onClick={handleStartSessionClick}>Start</button>
        </div>
      </div>
    </div>
  );
}

export default SessionEdit;
