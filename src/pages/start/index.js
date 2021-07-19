import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userNameState, genderState } from '../../recoil/atom';
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
    <Container>
      <Stack>
        <Heading as="h3">직업가치관검사</Heading>
        <Text mb="8px">이름</Text>
        <Input onChange={inputUserName} placeholder="이름을 입력해주세요!" />
        <Link to="/survey/0">
          <Button isLoading={isInputEmpty()}>검사시작</Button>
        </Link>
        <RadioGroup onChange={inputGender}>
          <Radio colorScheme="green" value="남자">
            남자
          </Radio>
          <Radio colorScheme="red" value="여자">
            여자
          </Radio>
        </RadioGroup>
      </Stack>
    </Container>
  );
}
