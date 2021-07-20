import { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import moment from 'moment';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  questionAnswerListState,
  userNameState,
  genderState,
  questionListState,
} from '../../recoil/atom';
import { Link } from 'react-router-dom';
import {
  Button,
  Heading,
  Text,
  Flex,
  Center,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';

export default function End() {
  const questionAnswerList = useRecoilValue(questionAnswerListState);
  const userName = useRecoilValue(userNameState);
  const gender = useRecoilValue(genderState);

  const setQuestionAnswerList = useSetRecoilState(questionAnswerListState);
  const setUserNameState = useSetRecoilState(userNameState);
  const setGenderState = useSetRecoilState(genderState);
  const setQuestionListState = useSetRecoilState(questionListState);

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
    const result = [['', '점수']];
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
    return result;
  };

  const getDate = () => {
    if (apiResult.inspct === undefined) return 0;
    return moment(apiResult.inspct.beginDtm).format('YYYY.MM.DD');
  };

  const getResultFromApi = () => {
    let answersString = '';
    for (let i = 0; i < questionAnswerList.length; i++) {
      answersString += `B${i + 1}=${questionAnswerList[i]} `;
    }
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
        fetch(
          `https://inspct.career.go.kr/inspct/api/psycho/report?seq=${queryString.seq}`
        )
          .then((response) => response.json())
          .then((result) => {
            setApiResult(result);
          });
      });
  };

  const resetTest = () => {
    setQuestionAnswerList([]);
    setUserNameState('');
    setGenderState('');
    // setQuestionListState([[]]);
  };

  useEffect(() => {
    getResultFromApi();
  }, []);

  return (
    <Flex
      marginTop={10}
      marginLeft={10}
      top
      flexDirection="column"
      width="80%"
      height="100vh"
    >
      <Center margin={10}>
        <Text fontWeight="extrabold" fontSize="3xl" as="u">
          직업가치관검사 결과표
        </Text>
      </Center>
      <Center>
        <Table borderWidth="1px" variant="simple">
          <Thead>
            <Tr>
              <Th>이름</Th>
              <Th>성별</Th>
              <Th>검사일</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>{`${userName}`}</Td>
              <Td>{`${gender[0]}`}</Td>
              <Td>{`${getDate()}`}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Center>
      <Center margin={3} marginTop={10}>
        <Chart
          width="100%"
          height={'300px'}
          chartType="Bar"
          loader={<div>Loading Chart</div>}
          data={makeChartData()}
          options={{
            // Material design options
            chart: {
              title: '직업가치관결과',
            },
          }}
          // For tests
          rootProps={{ 'data-testid': '2' }}
        />
      </Center>
      <Center margin={3}>
        <Link to="/start">
          <Button onClick={resetTest}>다시검사하기</Button>
        </Link>
      </Center>
    </Flex>
  );
}
