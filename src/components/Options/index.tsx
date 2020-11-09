import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Options from './Options';

const theme = createMuiTheme({
  typography: {
    fontFamily: ['IBM Plex Mono'].join(','),
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Options />
  </ThemeProvider>,
  document.getElementById('root')
);
