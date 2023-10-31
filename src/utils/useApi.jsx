// useApi.js
import { useState, useEffect } from 'react';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const useApi = () => {
  const get = async (url) => {
    try {
      const response = await fetch(`${BASE_URL}${url}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('API request failed.');
    }
  };

  const post = async (url, body) => {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('API request failed.');
    }
  };

  // Add other methods like put and delete as needed

  return { get, post };
};

export default useApi;
