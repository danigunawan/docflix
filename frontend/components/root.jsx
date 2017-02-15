import React from 'react';
import App from './app'
import Splash from './splash/splash'
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import SessionFormContainer from './session_form/session_form_container';



const Root = ({ store }) => {
  const _redirectIfLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (currentUser) {
      replace('/');
    }
  }

  return(
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path='/' component={ App }>
          <IndexRoute component={ Splash }/>
          <Route path='/login' component={SessionFormContainer} onEnter={_redirectIfLoggedIn} />
          <Route path='/signup' component={SessionFormContainer} onEnter={_redirectIfLoggedIn} />
        </Route>
      </Router>
    </Provider>
  );
}



export default Root;

// define a logged_in helper method to see if we have current user, if we do
// have current user, switch between which navbar you use - pass down to app
