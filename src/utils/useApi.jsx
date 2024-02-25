// useApi.js
import { useState, useEffect } from "react";
import isTokenExpired from "utils/isTokenExpired";
import refreshToken from "./refreshToken";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const useApi = () => {
  const navigate = useNavigate();
  const get = async (url, customHeaders = {}) => {
    let token = localStorage.getItem("auth");
    if (isTokenExpired(token)) {
      token = await refreshToken(); // refresh the token
      if (!token) {
        navigate("/login");
        // handle case where token couldn't be refreshed
        // maybe redirect to login
        return;
      }
    }

    try {
      const response = await fetch(`${API_URL}${url}`, {
        headers: {
          "Content-Type": "application/json",
          ...customHeaders, // Merge custom headers with the default headers
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("API request failed.");
    }
  };

  const post = async (url, body) => {
    try {
      const response = await fetch(`${API_URL}${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("API request failed.");
    }
  };

  // Add other methods like put and delete as needed

  return { get, post };
};

export default useApi;
