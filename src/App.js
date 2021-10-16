import React, { lazy, Suspense } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import MainContainer from './components/Common/index';

// lazy load pages
const AxieTracker = lazy(() => import('./components/Tracker/Games/AxieInfinity/index'));


function App() {

  return (
    <div className="App">
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
                exact path='/axieinfinity' 
                render={() => <AxieTracker/>} 
              />
              <Route path='*' render={() => <div>404 not found</div>} />
            </Switch>
          </MainContainer>
        </Router>
      </Suspense>
    </div>
  );
};

export default App;
