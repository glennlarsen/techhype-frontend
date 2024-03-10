// src/contexts/ShopifyContext.js

import { SHOPIFY_ACCESS_TOKEN } from 'constants/apiKeys';
import React, { createContext, useContext } from 'react';
import Client from 'shopify-buy';

// Initialize the client
const shopifyClient = Client.buildClient({
  domain: 'techhype-business-card.myshopify.com',
  storefrontAccessToken: SHOPIFY_ACCESS_TOKEN
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
