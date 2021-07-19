import { useState } from 'react';
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
  Input,
  Text,
  Box,
  useFormControlContext,
  Flex,
  Progress,
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

  const isNotCheckableNext = () => {
    const idx = pageNumber * 5;
    let cnt = 0;
    for (let i = 0; i < 5; i++) {
      if (idx + i === questionAnswerList.length - 1) return true;
      if (questionAnswerList[idx + i] === 0) return false;
    }
    return true;
  };

  return (
    <div>
      <Heading as="h3">검사진행</Heading>
      {/* <Button
        onClick={() => {
          console.log(questionAnswerList);
        }}
      >
        sdfsd
      </Button> */}
      <Text mb="8px">{getProgress()}</Text>

      <Progress colorScheme="green" size="lg" value={getProgress()} />
      <Stack direction={'column'} spacing="24px">
        {questionList[pageNumber].map((question, idx) => {
          return (
            <Box
              key={`question_${question.qitemNo}`}
              borderWidth="2px"
              borderRadius="lg"
              w="80%"
              h="70%"
              bg="purple.300"
            >
              <Text color="white" fontSize="xl">
                Q{question.qitemNo}. {question.question}
              </Text>
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
                <Radio colorScheme="green" value={question.answerScore01}>
                  {question.answer01}
                </Radio>
                <Radio colorScheme="red" value={question.answerScore02}>
                  {question.answer02}
                </Radio>
              </RadioGroup>
            </Box>
          );
        })}
        <Flex>
          <Link to={setPrePageNumber()}>
            <Button>이전</Button>
          </Link>
          {isNotCheckableNext() ? (
            <Link to={setNextPageNumber()}>
              <Button isLoading={false}>다음</Button>
            </Link>
          ) : (
            <Button isLoading={true}>다음</Button>
          )}
        </Flex>
      </Stack>
    </div>
  );
}
