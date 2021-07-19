import { atom } from 'recoil';

const userNameState = atom({
  key: 'userNameState',
  default: '',
});

const genderState = atom({
  key: 'genderState',
  default: '',
});

const questionListState = atom({
  key: 'questionListState',
  default: [[]],
});

const questionAnswerListState = atom({
  key: 'questionAnswerListState',
  default: [],
});

export {
  userNameState,
  genderState,
  questionListState,
  questionAnswerListState,
};
