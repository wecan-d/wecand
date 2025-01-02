// src/components/LoginButton.js

import React from 'react';
import styled from 'styled-components';
import { useGoogleLogin } from './Login';

const Button = styled.button`
  padding: 5px 10px;
  background-color: #1890ff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #40a9ff;
  }
`;

const LoginButton = () => {
  const googleLogin = useGoogleLogin();

  return (
    <Button onClick={googleLogin}>
      로그인
    </Button>
  );
};

export default LoginButton;
