import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import {
  userNameState,
  questionAnswerListState,
  genderState,
} from '../../recoil/atom';
import { Link } from 'react-router-dom';
import { Button, Heading, Center, Text, Flex } from '@chakra-ui/react';

export default function End() {
  return (
    <Flex marginTop="30vh" flexDirection="column">
      <Center margin={5}>
        <Heading color="purple.300" as="h3">
          검사가 완료되었습니다.
        </Heading>
      </Center>
      <Center margin={2}>
        <Text fontSize="lg">
          검사결과는 여러분이 직업을 선택할 때 상대적으로 어떠한 가치를 중요하게
          생각하는지를 알려주고,
        </Text>
      </Center>
      <Center margin={1}>
        <Text fontSize="lg">
          중요 가치를 충족시켜줄 수 있는 직업에 대해 생각해 볼 기회를
          제공합니다.
        </Text>
      </Center>
      <Center margin={5}>
        <Link to="/result">
          <Button>결과보기</Button>
        </Link>
      </Center>
    </Flex>
  );
}
