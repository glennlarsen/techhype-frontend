// src/hooks/useProducts.js

import { useState, useEffect } from 'react';
import { useShopify } from 'context/ShopifyContext';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const shopify = useShopify();

  useEffect(() => {
    shopify.product.fetchAll()
      .then((fetchedProducts) => {
        setProducts(fetchedProducts);
        console.log(fetchedProducts)
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [shopify]); // Dependency array ensures this runs once


  return { products, loading, error };
};

export default useProducts;
