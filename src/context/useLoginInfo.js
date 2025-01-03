import { useState, useEffect } from 'react';

export const isLoggedIn = () => {
  const storedLoginInfo = localStorage.getItem("loginInfo");
  return storedLoginInfo;
}

export const useLoginInfo = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedLoginInfo = localStorage.getItem("loginInfo");

    if (storedLoginInfo) {
      const loginInfo = JSON.parse(storedLoginInfo);

      if (loginInfo.isLoggedIn) {
        setUserInfo({
          userName: loginInfo.userName,
          userEmail: loginInfo.userEmail,
        });
      }
    }

  }, []);

  return userInfo;
};