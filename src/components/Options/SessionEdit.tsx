import React, { useState, useEffect } from 'react';

import SessionInProgress from './SessionInProgress';
import { SessionData } from './Options';

import './Options.scss';
declare var chrome: any;

function retrieveSites(): Promise<Array<string>> {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['sites'], ({ sites }: Array<string>) => {
      console.log(sites);
      resolve(sites);
    });
  });
}

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
      chrome.storage.sync.get(null, (data) => {
        console.log('data after set', data);
      });
    }
  );
}

type Props = {
  sessionData: SessionData;
  updateSession: any;
};

function SessionEdit({ sessionData, updateSession }: Props) {
  const { intention, sites } = sessionData;
  console.log(sessionData);

  // input states
  const [siteInput, setSiteInput] = useState('');
  const [duration, setDuration] = useState('0');

  // add site to allowlist
  const addSite = async () => {
    const newSitesList = [...sites, siteInput];
    // persist new list
    chrome.storage.sync.set({ sites: newSitesList }, () => {
      updateSession({
        ...sessionData,
        sites: newSitesList,
      });
      setSiteInput('');
    });
  };

  const removeSite = async (index: number) => {
    const newSitesList = [...sites].splice(index + 1, 1);

    console.log('remove', index, newSitesList);
    // persist new list
    chrome.storage.sync.set({ sites: newSitesList }, () => {
      updateSession({
        ...sessionData,
        sites: newSitesList,
      });
      setSiteInput('');
    });
  };

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
          ></input>
        </div>
        <div>
          <button onClick={handleStartSessionClick}>Start</button>
        </div>
      </div>
    </div>
  );
}

export default SessionEdit;
