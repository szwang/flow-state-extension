import React, { useState, useEffect } from 'react';

import SessionInProgress from './SessionInProgress';
import SessionEdit from './SessionEdit';

import './Options.scss';
declare var chrome: any;

export interface SessionData {
  endTime: number | null;
  intention: string;
  sites: Array<string>;
}

function Options() {
  const [active, setActive] = useState<boolean | null>(null);
  const [sessionData, setSessionData] = useState<SessionData>({
    endTime: null,
    intention: '',
    sites: [],
  });

  // On mount, retrieve state of the session
  useEffect(() => {
    chrome.storage.sync.get(null, (data) => {
      const { endTime, sites, intention } = data;
      // no session in progress
      console.log('DATA', data, endTime);
      if (!endTime) {
        setSessionData({
          ...sessionData,
          sites: sites || [],
        });
        setActive(false);
      } else if (endTime < Date.now()) {
        // reset settings
        chrome.storage.sync.set({ endTime: null, intention: null });
        setSessionData({
          ...sessionData,
          sites: sites || [],
        });
        setActive(false);
      } else {
        // session in progress
        setSessionData({
          sites,
          intention,
          endTime,
        });
        setActive(true);
      }
    });
  }, []);

  // Render loading state
  if (active === null) {
    return <div></div>;
  }
  // Render session intention and countdown
  if (active) {
    return <SessionInProgress {...sessionData} />;
  } else {
    // Render session settings
    return (
      <SessionEdit sessionData={sessionData} updateSession={setSessionData} />
    );
  }
}

export default Options;
