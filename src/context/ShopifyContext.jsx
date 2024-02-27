// src/contexts/ShopifyContext.js

import React, { createContext, useContext } from 'react';
import Client from 'shopify-buy';

// Initialize the client
const shopifyClient = Client.buildClient({
  domain: 'techhype-business-card.myshopify.com',
  storefrontAccessToken: '5c08c7f290e432e9edf0d04e84ea329d'
});

// Create a context
const ShopifyContext = createContext();

// Provider component
export const ShopifyProvider = ({ children }) => {
  return (
    <ShopifyContext.Provider value={shopifyClient}>
      {children}
    </ShopifyContext.Provider>
  );
};

// Custom hook to use the Shopify client
export const useShopify = () => {
  return useContext(ShopifyContext);
};
