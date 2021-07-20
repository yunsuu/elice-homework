import { useState, useEffect } from 'react';
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

  const getQuestionsFromApi = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apikey: '72612ba54c1decfb085cfe680f85ce3a',
        qestrnSeq: '6',
        trgetSe: '100208',
        name: '홍길동',
        gender: '100323',
        school: '세종대학교',
        grade: '2',
        email: '',
        startDtm: 1550466291034,
        answers:
          'B1=2 B2=4 B3=6 B4=8 B5=10 B6=12 B7=14 B8=16 B9=18 B10=20 B11=22 B12=23 B13=26 B14=28 B15=30 B16=32 B17=34 B18=35 B19=38 B20=40 B21=42 B22=44 B23=45 B24=48 B25=50 B26=52 B27=53 B28=56 ',
      }),
    };
    fetch('https://www.career.go.kr/inspct/openapi/test/report', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  useEffect(() => {
    getQuestionsFromApi();
  }, []);

  return (
    <div>
      <Heading as="h3">검서결과 볼까요?</Heading>
      <Link to="/result">결과보기</Link>
      <Button
        onClick={() => {
          getQuestionsFromApi();
        }}
      >
        테스트
      </Button>
    </div>
  );
}
