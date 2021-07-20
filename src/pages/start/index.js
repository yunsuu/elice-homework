import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  userNameState,
  genderState,
  questionListState,
  questionAnswerListState,
} from '../../recoil/atom';
import { Link } from 'react-router-dom';
import {
  Button,
  Stack,
  Radio,
  RadioGroup,
  Heading,
  Input,
  Text,
  Container,
} from '@chakra-ui/react';
export default function Start(props) {
  const userName = useRecoilValue(userNameState);
  const setUserName = useSetRecoilState(userNameState);
  const gender = useRecoilValue(genderState);
  const setGender = useSetRecoilState(genderState);

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

  const inputGender = (gender) => {
    setGender(gender);
  };

  const inputUserName = (event) => {
    setUserName(event.target.value);
  };

  const isInputEmpty = () => {
    if (userName === '' || gender === '') return true;
    else return false;
  };

  return (
    <Container padding={20} borderWidth="3px" borderRadius="lg" marginTop={40}>
      <Stack>
        <Heading as="h3">직업가치관검사</Heading>
        <Text mb="8px">이름</Text>
        <Input onChange={inputUserName} placeholder="이름을 입력해주세요!" />
        <RadioGroup onChange={inputGender}>
          <Radio margin={1} colorScheme="green" value="남자">
            남자
          </Radio>
          <Radio margin={1} colorScheme="red" value="여자">
            여자
          </Radio>
        </RadioGroup>
        <Link to="/survey/0">
          <Button
            loadingText="검사시작"
            spinner={''}
            isLoading={isInputEmpty()}
          >
            검사시작
          </Button>
        </Link>
      </Stack>
    </Container>
  );
}
