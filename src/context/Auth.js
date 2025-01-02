import { atom } from 'recoil';

export const loginInfo = atom({
  key: 'loginInfo',
  default: {
    isLoggedIn: false,
    t: null,   // 서버 토큰
    userName: null,
    userEmail: null,
  }
});