import React, { useState, useEffect } from 'react';

import SessionInProgress from './SessionInProgress';
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

function startSession(intention: string, duration: string) {
  const currentTime = Date.now();
  const durationInt = parseInt(duration);
  const endTime = currentTime + durationInt;

  chrome.storage.sync.set({
    active: true,
    intention,
    startTime: currentTime,
    duration: durationInt,
    endTime,
  });
}

function Options() {
  const [sessionState, setSessionState] = useState(null);
  const [sites, setSites] = useState(['']);
  const [newSite, setNewSite] = useState('');
  const [intention, setIntention] = useState('');
  const [duration, setDuration] = useState('0');

  const addSite = async () => {
    const newSitesList = [...sites, newSite];
    chrome.storage.sync.set({ sites: newSitesList }, () => {
      setSites(newSitesList);
      setNewSite('');
    });
  };

  useEffect(() => {
    chrome.storage.sync.get(['active'], ({ active }: Array<string>) => {
      setSessionState(active);
    });
  });

  // Fetch latest sites
  useEffect(() => {
    const getSites = async () => {
      const sites = await retrieveSites();
      console.log(sites);
      setSites(sites);
    };
    getSites();
  }, []);

  if (sessionState === null) {
    return <div></div>;
  } else if (sessionState === true) {
    return <SessionInProgress intention={intention} />;
  }

  return (
    <div className="Options container-fluid my-5">
      <div>
        <div>
          I want to focus on{' '}
          <input
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
          ></input>
        </div>
        <div>
          Websites:
          <input
            value={newSite}
            onChange={(e) => setNewSite(e.target.value)}
          ></input>{' '}
          <button onClick={addSite}>add</button>
          {sites && sites.map((site) => <li>{site}</li>)}
        </div>
        <div>
          Time set{' '}
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          ></input>
        </div>
        <div>
          <button onClick={() => startSession(intention, duration)}>
            Start
          </button>
        </div>
      </div>
    </div>
  );
}

export default Options;
