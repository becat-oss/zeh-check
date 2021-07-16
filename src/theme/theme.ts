import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { THEME_COLOR } from 'src/constants';

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: THEME_COLOR,
    },
    secondary: {
      main: '#222',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f8f8f8',
    },
    warning: {
      main: '#F02C2D',
    },
  },
  overrides: {
    MuiLink: {
      root: {
        color: 'inherit',
      },
    },
    MuiStepIcon: {
      root: {
        '&$active': {
          color: THEME_COLOR,
        },
      },
    },
  },
});

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: THEME_COLOR,
    },
    secondary: {
      main: '#222',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#282828',
    },
    warning: {
      main: '#F02C2D',
    },
  },
  overrides: {
    MuiLink: {
      root: {
        color: 'inherit',
      },
    },
    MuiStepIcon: {
      root: {
        '&$active': {
          color: THEME_COLOR,
        },
      },
    },
  },
});
