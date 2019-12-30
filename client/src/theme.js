import { createMuiTheme } from '@material-ui/core/styles';

const commonStyles = createMuiTheme({
  link: {
    textDecoration: 'none'
  }
});

export const lightTheme = createMuiTheme({
  ...commonStyles,
  palette: {
    primary: {
      main: '#f5f5f5',
      dark: '#9ea3a0',
      light: '#fff',
      contrastText: '#000'
    },
    secondary: { main: '#000', contrastText: '#fff' },
    text: { primary: '#000', secondary: '#000' },
    bg: '#eee',
    delete: '#db6565',

    divider: '#000'
  }
});

export const darkTheme = createMuiTheme({
  ...commonStyles,
  palette: {
    primary: {
      main: '#272727',
      light: '',
      dark: '#6f6767',
      contrastText: '#fff'
    },
    text: { primary: '#fff', secondary: '#eee' },
    secondary: { main: '#fff', contrastText: '#000' },
    bg: '#000',
    delete: '#db6565',
    divider: '#fff'
  }
});
