import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import OnboardingPage from './features/onboarding/OnboardingPage';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './features/home/HomePage';
import ShopPage from './features/shop/ShopPage';
import ProductPage from './features/product/ProductPage';
import BrandProductsPage from './features/brands/BrandProductsPage';
import EMIDuesPage from './features/emi/EMIDuesPage';
import LimitPage from './features/limit/LimitPage';
import ProfilePage from './features/profile/ProfilePage';
import { useUserStore } from './store/userStore';

function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F5F3FF] font-sans antialiased text-[#18181B]">
      <Navbar />
      {children}
    </div>
  );
}

export default function App() {
  const { isOnboarded } = useUserStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Onboarding */}
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* Root redirect */}
        <Route
          path="/"
          element={<Navigate to={isOnboarded ? '/home' : '/onboarding'} replace />}
        />

        {/* Protected App Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <AppLayout>
                <HomePage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ShopPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:slug"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ProductPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/brands/:brandId"
          element={
            <ProtectedRoute>
              <AppLayout>
                <BrandProductsPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/emi-dues"
          element={
            <ProtectedRoute>
              <AppLayout>
                <EMIDuesPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/limit"
          element={
            <ProtectedRoute>
              <AppLayout>
                <LimitPage />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AppLayout>
                <ProfilePage />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route
          path="*"
          element={<Navigate to={isOnboarded ? '/home' : '/onboarding'} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}
