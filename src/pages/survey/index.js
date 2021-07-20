import { useRecoilValue, useSetRecoilState } from 'recoil';
import { questionListState, questionAnswerListState } from '../../recoil/atom';
import produce from 'immer';
import { Link } from 'react-router-dom';
import {
  Button,
  Stack,
  Radio,
  RadioGroup,
  Heading,
  Text,
  Box,
  Flex,
  Progress,
  Spacer,
  Center,
  Container,
  Divider,
} from '@chakra-ui/react';

export default function Survey({ match }) {
  const questionList = useRecoilValue(questionListState);
  const questionAnswerList = useRecoilValue(questionAnswerListState);
  const setQuestionAnswerList = useSetRecoilState(questionAnswerListState);

  const { params } = match;
  const pageNumber = params.page;

  const onChangeAnswer = (idx1, idx2, score) => {
    // 전체 질문 답변 state
    setQuestionAnswerList(
      produce(questionAnswerList, (draft) => {
        draft[idx2] = parseInt(score);
      })
    );
  };

  const getProgress = () => {
    const length = questionAnswerList.length;
    if (length === 0) return 0;
    let notZeroCnt = 0;
    for (let i = 0; i < length; i++) {
      if (questionAnswerList[i] !== 0) notZeroCnt += 1;
    }
    const percentage = parseInt((notZeroCnt / length) * 100);
    return percentage;
  };

  const setPrePageNumber = () => {
    // 첫 페이지일때
    if (parseInt(pageNumber) === 0) return '/survey/0';
    else return `/survey/${parseInt(pageNumber) - 1}`;
  };

  const setNextPageNumber = () => {
    // 마지막 페이지일때
    if (parseInt(pageNumber) === questionList.length - 1) return '/end';
    else return `/survey/${parseInt(pageNumber) + 1}`;
  };

  const isCheckableNext = () => {
    const idx = pageNumber * 5;
    let cnt = 0;
    for (let i = 0; i < 5; i++) {
      if (idx + i === questionAnswerList.length - 1) return true;
      if (questionAnswerList[idx + i] === 0) return false;
    }
    return true;
  };

  return (
    <Flex
      marginTop={10}
      marginLeft={10}
      top
      flexDirection="column"
      height="100vh"
    >
      <Box width="80%">
        <Flex>
          <Heading as="h3">검사진행</Heading>
          <Spacer />
          <Heading as="h3">{getProgress()}</Heading>
        </Flex>
        <Divider marginTop={5} />
        <Progress colorScheme="green" size="lg" value={getProgress()} />
      </Box>
      <Divider marginTop={5} />
      <Stack direction={'column'} spacing="24px">
        {questionList[pageNumber].map((question, idx) => {
          return (
            <Box
              key={`question_${question.qitemNo}`}
              borderWidth="2px"
              w="80%"
              h="15vh"
              bg="purple.300"
            >
              <Flex flexDirection="column">
                <Center marginTop="2vh">
                  <Text color="white" fontSize="xl">
                    Q{question.qitemNo}. {question.question}
                  </Text>
                </Center>
                <Center marginTop="1vh">
                  <RadioGroup
                    defaultValue={
                      questionAnswerList[question.qitemNo - 1] === 0
                        ? ''
                        : `${questionAnswerList[question.qitemNo - 1]}`
                    }
                    onChange={(data) => {
                      onChangeAnswer(idx, question.qitemNo - 1, data);
                    }}
                  >
                    <Radio
                      margin={1}
                      colorScheme="white"
                      value={question.answerScore01}
                    >
                      {question.answer01}
                    </Radio>
                    <Radio
                      margin={1}
                      colorScheme="white"
                      value={question.answerScore02}
                    >
                      {question.answer02}
                    </Radio>
                  </RadioGroup>
                </Center>
              </Flex>
            </Box>
          );
        })}
        <Flex width="80%">
          <Link to={setPrePageNumber()}>
            <Button>이전</Button>
          </Link>
          <Spacer />
          {isCheckableNext() ? (
            <Link to={setNextPageNumber()}>
              <Button isLoading={false}>다음</Button>
            </Link>
          ) : (
            <Button loadingText="다음" spinner={''} isLoading={true}>
              다음
            </Button>
          )}
        </Flex>
      </Stack>
    </Flex>
  );
}
