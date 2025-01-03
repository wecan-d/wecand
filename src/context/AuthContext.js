import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
  userInfo: {
    isLoggedIn: false,
    userName: null,
    userEmail: null,
    token: null,
  },
  handleLogin: () => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    isLoggedIn: false,
    userName: null,
    userEmail: null,
    token: null,
  });

  useEffect(() => {
    const storedLoginInfo = localStorage.getItem("loginInfo");
    if (storedLoginInfo) {
      const loginInfo = JSON.parse(storedLoginInfo);
      if (loginInfo.isLoggedIn) {
        setUserInfo({
          isLoggedIn: loginInfo.isLoggedIn,
          userName: loginInfo.userName,
          userEmail: loginInfo.userEmail,
          token: loginInfo.t || null,
        });
      }
    }
  }, []);

  const handleLogin = (loginData) => {
    setUserInfo({
      isLoggedIn: true,
      userName: loginData.userName,
      userEmail: loginData.userEmail,
      token: loginData.t,
    });
    localStorage.setItem("loginInfo", JSON.stringify(loginData));
  };

  const handleLogout = () => {
    setUserInfo({
      isLoggedIn: false,
      userName: null,
      userEmail: null,
      token: null,
    });
    localStorage.setItem("loginInfo", JSON.stringify({ isLoggedIn: false }));
  };

  return (
    <AuthContext.Provider value={{ userInfo, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
