// src/contexts/ShopifyContext.js

import React, { createContext, useContext } from 'react';
import Client from 'shopify-buy';

// Initialize the client
const shopifyClient = Client.buildClient({
  domain: 'techhype-business-card.myshopify.com',
  storefrontAccessToken: 'c83d1af304caf10c50caa78b014c2d44'
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
