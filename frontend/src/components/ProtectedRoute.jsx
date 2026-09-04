import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';

export default function ProtectedRoute({ children }) {
  const { isOnboarded } = useUserStore();
  if (!isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }
  return children;
}
