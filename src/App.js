import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Start from './pages/start';
import Survey from './pages/survey';

import { useSetRecoilState } from 'recoil';
import { questionListState, questionAnswerListState } from './recoil/atom';

function App() {
  const setQuestionListState = useSetRecoilState(questionListState);
  const setQuestionAnswerListState = useSetRecoilState(questionAnswerListState);
  const getQuestionsFromApi = () => {
    fetch(
      'https://www.career.go.kr/inspct/openapi/test/questions?apikey=72612ba54c1decfb085cfe680f85ce3a&q=6'
    )
      .then((response) => response.json())
      .then((data) => {
        const dataArr = data.RESULT;
        let resultArr = [];
        for (let i = 0; i < dataArr.length; i++) {
          resultArr.push(0);
        }
        setQuestionAnswerListState(resultArr);

        resultArr = [[]];
        let idx = 0;
        for (let i = 0; i < dataArr.length; i++) {
          resultArr[idx].push({ ...dataArr[i] });
          if ((i + 1) % 5 === 0) {
            idx += 1;
            resultArr.push([]);
          }
        }
        setQuestionListState(resultArr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getQuestionsFromApi();
  }, []);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/start" component={Start} />
          <Route path="/survey/:page" component={Survey} />
          {/* <Route path="/end" component={Reviews} />
          <Route path="/result" component={Reviews} /> */}
          {/* <Route component={PageNotFound} /> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
