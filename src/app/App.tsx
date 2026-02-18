import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '@/pages/login';
import { UsersPage } from '@/pages/users';
import { NotFoundPage } from '@/pages/not-found';

const isAuthenticated = () => Boolean(localStorage.getItem('auth'));

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export const App: React.FC = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route
      path="/users"
      element={
        <ProtectedRoute>
          <UsersPage />
        </ProtectedRoute>
      }
    />
    <Route path="/404" element={<NotFoundPage />} />
    <Route path="/" element={<Navigate to="/users" replace />} />
    <Route path="*" element={<Navigate to="/404" replace />} />
  </Routes>
);
