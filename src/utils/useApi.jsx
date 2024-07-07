// useApi.js
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "utils/AuthContext";
import refreshToken from "./refreshToken";

const API_URL = process.env.REACT_APP_API_URL;
console.log("API_URL:", API_URL); // Add this line for debugging

const useApi = () => {
  const navigate = useNavigate();
  const [, setAuth] = useContext(AuthContext);

  const authFetch = async (url, options = {}) => {
    let response = await fetch(`${API_URL}${url}`, {
      ...options,
      credentials: 'include', // Necessary to include cookies with the request
    });

    if (response.status === 401) {
      // Attempt to refresh token
      const refreshed = await refreshToken();
      if (refreshed) {
        // Retry the original request with the new access token
        response = await fetch(`${API_URL}${url}`, {
          ...options,
          credentials: 'include',
        });
      } else {
        navigate('/login'); // Redirect to login on refresh token failure
      }
    }
    return response;
  };

  const get = async (url) => {
    const response = await authFetch(url, {
      method: 'GET',
    });
    console.log("response: " + JSON.stringify(response));
    return response.json();
  };

  const post = async (url, body) => {
    const response = await authFetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    console.log("response: ", response);
    return response.json();
  };

  return { get, post };
};

export default useApi;
