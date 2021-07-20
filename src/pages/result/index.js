import { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import moment from 'moment';
import { useRecoilValue } from 'recoil';
import {
  questionAnswerListState,
  userNameState,
  genderState,
} from '../../recoil/atom';
import produce from 'immer';
import { Link } from 'react-router-dom';
import {
  Button,
  Stack,
  Radio,
  RadioGroup,
  Heading,
  Input,
  Text,
  Box,
  useFormControlContext,
  Flex,
  Progress,
} from '@chakra-ui/react';

export default function End() {
  const questionAnswerList = useRecoilValue(questionAnswerListState);
  const userName = useRecoilValue(userNameState);
  const gender = useRecoilValue(genderState);
  const [apiResult, setApiResult] = useState({});
  const dataRow = [
    '능력발휘',
    '자율성',
    '보수',
    '안정성',
    '사회적 인정',
    '사회봉사',
    '자기계발',
    '창의성',
  ];

  function getUrlParams(url) {
    var params = {};
    url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) {
      params[key] = value;
    });

    return params;
  }

  const makeChartData = () => {
    const result = [['항목', '점수']];
    console.log(apiResult.result, apiResult.result === undefined);
    if (apiResult.result === undefined) return result;
    let string = apiResult.result.wonScore.split(' ');
    string = string.map((r) => {
      return r.split('=');
    });
    for (let i = 0; i < 8; i++) {
      const idx = parseInt(string[i][0]) - 1;
      const score = parseInt(string[i][1]);
      result.push([dataRow[idx], score]);
    }
    console.log(result);
    return result;
  };

  const getDate = () => {
    console.log(apiResult.inspct, apiResult.inspct === undefined);
    if (apiResult.inspct === undefined) return 0;
    return moment(apiResult.inspct.beginDtm).format('YYYY.MM.DD');
  };

  const getResultFromApi = () => {
    let answersString = '';
    for (let i = 0; i < questionAnswerList.length; i++) {
      answersString += `B${i + 1}=${questionAnswerList[i]} `;
    }
    console.log(answersString);
    const timeStamp = new Date().getTime();
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apikey: '72612ba54c1decfb085cfe680f85ce3a',
        qestrnSeq: '6',
        trgetSe: '100208',
        name: `${userName}`,
        gender: gender === '남자' ? 100323 : 100324,
        school: '엘리스대학교',
        email: '',
        startDtm: timeStamp,
        // answers:
        //   'B1=2 B2=4 B3=6 B4=8 B5=10 B6=12 B7=14 B8=16 B9=18 B10=20 B11=22 B12=23 B13=26 B14=28 B15=30 B16=32 B17=34 B18=35 B19=38 B20=40 B21=42 B22=44 B23=45 B24=48 B25=50 B26=52 B27=53 B28=56 ',
        answers: answersString,
      }),
    };
    fetch('https://www.career.go.kr/inspct/openapi/test/report', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        const queryString = getUrlParams(data.RESULT.url);
        console.log(queryString);

        fetch(
          `https://inspct.career.go.kr/inspct/api/psycho/report?seq=${queryString.seq}`
        )
          .then((response) => response.json())
          .then((result) => {
            console.log(result);
            setApiResult(result);
          });
      });
  };

  useEffect(() => {
    getResultFromApi();
  }, []);

  return (
    <div>
      <Heading as="h3">직업가치관검사 결과표</Heading>
      <Text>이름 : {`${userName}`}</Text>
      <Text>성별 {`${gender}`}</Text>
      <Text>검사일 {`${getDate()}`}</Text>
      <Chart
        width={'900px'}
        height={'300px'}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={makeChartData()}
        options={{
          // Material design options
          chart: {
            title: 'Company Performance',
          },
        }}
        // For tests
        rootProps={{ 'data-testid': '2' }}
      />
      <Button
        onClick={() => {
          console.log(apiResult);
        }}
      >
        테스트 다시보기
      </Button>
    </div>
  );
}
