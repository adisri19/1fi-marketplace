import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ShopPage from './features/shop/ShopPage';
import ProductPage from './features/product/ProductPage';
import Navbar from './components/layout/Navbar';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#F5F3FF] font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/shop" replace />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/products/:slug" element={<ProductPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
