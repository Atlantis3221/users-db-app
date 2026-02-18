import React from 'react';
import { Navigate } from 'react-router-dom';
import { LoginForm } from '@/features/auth/ui/LoginForm';
import styled from 'styled-components';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
`;

const isAuthenticated = () => Boolean(localStorage.getItem('auth'));

export const LoginPage: React.FC = () => {
  if (isAuthenticated()) {
    return <Navigate to="/users" replace />;
  }
  return (
    <Page>
      <LoginForm />
    </Page>
  );
};
