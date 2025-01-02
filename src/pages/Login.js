import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { loginInfo } from "../context/Auth";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const server = process.env.REACT_APP_SERVER;

export const useGoogleLogin = () => {
  const setLoginInfoState = useSetRecoilState(loginInfo);
  const navigate = useNavigate();

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const isNewUser = result._tokenResponse?.isNewUser;
      let token = 1;
      console.log("로그인 성공", result);

      // 서버에서 토큰 받아오기
      if(!isNewUser) {
        const response = await axios.get(`${server}/user/email`, {
          params: { email: user.email }
        });
        console.log("기존 유저", response);
        token = response.data.token; // TODO: 응답 구조 보고 수정

      } else {
        const response = await axios.post(`${server}/user/name-email`, {
          "name": user.displayName,
          "email": user.email,
        });
        console.log("신규 유저", response);
        token = response.data.token; // TODO: 응답 구조 보고 수정

      }

      const newUserData = {
        isLoggedIn: true,
        userName: user.displayName,
        userEmail: user.email,
        t: token,   // 서버 토큰
      };

      setLoginInfoState(newUserData);
      localStorage.setItem('loginInfo', JSON.stringify(newUserData));

      console.log('로그인 성공', newUserData);

      if(isNewUser) {
        navigate('/register/1');
      } else {
        navigate('/home');
      }

    } catch (error) {
      console.error('로그인 중 오류 발생', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return googleLogin;
};
