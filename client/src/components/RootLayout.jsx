import React from 'react';
import App from '../App.jsx';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';

const RootLayout = () => (
  <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </AuthProvider>
);

export default RootLayout;