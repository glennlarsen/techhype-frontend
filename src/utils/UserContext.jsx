import React, { createContext, useContext, useState, useEffect } from "react";
import RefreshToken from "./refreshToken";

const UserContext = createContext({
  user: null,
  updateUser: () => {},
  logoutUser: () => {},
  fetchUserData: () => {}, // Adding a method to fetch user data
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = async () => {
    // Remove items from storage after successful logout
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (response.ok) {
        setUser(null);
        if (window.FB) {
          window.FB.logout();
        }
      } else {
        const errorData = await response.json();
        console.error("Failed to logout", errorData);
        throw new Error(errorData.message || "Failed to logout");
      }
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "GET",
        credentials: "include", // Ensure cookies are included
        headers: {
          Authorization: `Bearer ${token}`, // Use token in Authorization header
        },
      });
      const data = await response.json(); // Always parse JSON to check for error details
      console.log("user data response:", data);

      if (response.ok) {
        updateUser(data.data.result.user);
      } else {
        console.error("Failed to fetch user data", data);
        throw new Error(data.message || "Failed to fetch user data");
      }
    } catch (error) {
      console.error("Fetch user data error:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    // Optional: Refresh the token periodically
    const intervalId = setInterval(() => {
      RefreshToken();
    }, 3600000); // 1 hour

    return () => clearInterval(intervalId);
  }, []);

  return (
    <UserContext.Provider
      value={{ user, updateUser, logoutUser, fetchUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
