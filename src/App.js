import React, { lazy, Suspense } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import MainContainer from './components/Common/index';

// lazy load pages
const AxieTracker = lazy(() => import('./components/Tracker/Games/AxieInfinity/index'));

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const renderLoading = () => {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <Box sx={{ display: 'flex', flexFlow: 'column nowrap', alignItems: 'center', }}>
          <CircularProgress color='inherit' mb={2} />
          <Typography variant='subtitle1'>
            Loading
          </Typography>
        </Box>
      </Backdrop>
    );
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={renderLoading()}>
          <Router>
            <MainContainer>
              <Switch>
                <Route exact path='/'>
                  <Redirect to='/dashboard' />
                </Route>
                <Route 
                  exact path='/dashboard' 
                  render={() => <div>Homepage</div>} 
                />
                <Route 
                  exact path='/trackers/axieinfinity' 
                  render={() => <AxieTracker/>} 
                />
                <Route path='*' render={() => <div>404 not found</div>} />
              </Switch>
            </MainContainer>
          </Router>
        </Suspense>
      </ThemeProvider>
    </div>
  );
};

export default App;
