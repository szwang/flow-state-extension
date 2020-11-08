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
      You are focused on {intention} for the next {remainingDuration} minutes.
    </div>
  );
}

export default SessionInProgress;
