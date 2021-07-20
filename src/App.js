import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Start from './pages/start';
import Survey from './pages/survey';
import End from './pages/end';
import Result from './pages/result';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/start" component={Start} />
          <Route path="/survey/:page" component={Survey} />
          <Route path="/end" component={End} />
          <Route path="/result" component={Result} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
