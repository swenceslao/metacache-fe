import React, { lazy, Suspense } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Suspense fallback={<div>Loading...</div>}>
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
