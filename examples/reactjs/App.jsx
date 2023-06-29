import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AyrshareCallback } from '../../src/AyrshareCallback';
// import AyrsharePage from './AyrsharePageHook';
import AyrsharePage from './AyrsharePageHook';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/ayrshare" component={AyrshareCallback} />
        <Route path="/" component={AyrsharePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
