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

export default function End() {
  const questionList = useRecoilValue(questionListState);
  const questionAnswerList = useRecoilValue(questionAnswerListState);

  return (
    <div>
      <Heading as="h3">검서결과 볼까요?</Heading>
      <Link to="/result">결과보기</Link>
      <Button
        onClick={() => {
          let result = '';
          for (let i = 0; i < questionAnswerList.length; i++) {
            result += `B${i + 1}=${questionAnswerList[i]} `;
          }
          console.log(result);
        }}
      >
        테스트
      </Button>
    </div>
  );
}
