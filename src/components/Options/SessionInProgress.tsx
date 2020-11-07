import React, { useState, useEffect } from 'react';
import './Options.scss';

function SessionInProgress({ intention }) {
  return <div>You are focused on {intention} for the next x minutes.</div>;
}

export default SessionInProgress;
