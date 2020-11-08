import React, { useState, useEffect } from 'react';
import './Options.scss';

interface Props {
  endTime: number | null;
  intention: string | null;
  sites: Array<string>;
}

function SessionInProgress({ endTime, intention, sites }: Props) {
  return <div>You are focused on {intention} for the next x minutes.</div>;
}

export default SessionInProgress;
