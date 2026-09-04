import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './features/home/HomePage';
import ShopPage from './features/shop/ShopPage';
import ProductPage from './features/product/ProductPage';
import BrandProductsPage from './features/brands/BrandProductsPage';
import EMIDuesPage from './features/emi/EMIDuesPage';
import LimitPage from './features/limit/LimitPage';
import ProfilePage from './features/profile/ProfilePage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F5F3FF] font-sans antialiased text-[#18181B]">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="/brands/:brandId" element={<BrandProductsPage />} />
          <Route path="/emi-dues" element={<EMIDuesPage />} />
          <Route path="/limit" element={<LimitPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
