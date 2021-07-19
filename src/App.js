import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Start from './pages/start';
import Survey from './pages/survey';

function App() {
  const getDataFromApi = () => {
    fetch(
      'https://www.career.go .kr/inspct/openapi/test/questions?apikey=72612ba54c1decfb085cfe680f85ce3a&q=6'
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/start" component={Start} />
          <Route path="/survey" component={Survey} />
          {/* <Route path="/end" component={Reviews} />
          <Route path="/result" component={Reviews} /> */}
          {/* <Route component={PageNotFound} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
