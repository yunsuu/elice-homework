import { atom } from 'recoil';

const userNameState = atom({
  key: 'userNameState',
  default: '',
});

const genderState = atom({
  key: 'genderState',
  default: '',
});

export { userNameState, genderState };
