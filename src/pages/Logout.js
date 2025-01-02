// // // src/hooks/useLogout.js

// // import { useSetRecoilState } from 'recoil';
// // import { signOut } from 'firebase/auth';
// // import { auth } from '../firebaseConfig';
// // import { loginInfo } from '../context/Auth';

// // const useLogout = () => {
// //   const setLoginInfoState = useSetRecoilState(loginInfo);

// //   const logout = async () => {
// //     try {
// //       await signOut(auth);
// //       setLoginInfoState({
// //         isLoggedIn: false,
// //         t: null,
// //         userName: null,
// //         userEmail: null,
// //         hasRegistered: false,
// //       });
// //       alert('로그아웃 되었습니다.');
// //     } catch (error) {
// //       console.error('로그아웃 중 오류 발생', error);
// //       alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
// //     }
// //   };

// //   return logout;
// // };

// // export default useLogout;

// // hooks/useLogout.js
// import { useSetRecoilState } from 'recoil';
// import { loginInfo } from '../context/Auth';
// import { useNavigate } from 'react-router-dom';

// const useLogout = () => {
//   // const setLoginInfoState = useSetRecoilState(loginInfo);
//   const navigate = useNavigate();

//   const logout = () => {
//     // Recoil 상태 초기화
//     setLoginInfoState({
//       isLoggedIn: false,
//       t: null,
//       userName: null,
//       userEmail: null,
//     });

//     // 로컬 스토리지에서 로그인 정보 삭제
//     localStorage.removeItem('loginInfo');

//     // 로그인 페이지로 리디렉션
//     navigate('/login');
//   };

//   return logout;
// };

// export default useLogout;
