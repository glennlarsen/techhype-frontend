import React, { useContext, useState, useEffect } from "react";
import useApi from "utils/useApi";
const Admin = () => {
  const { post, get } = useApi(); // Destructure the post function for making get requests
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    if (token) {
      // Include the token in the headers
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      getUser(headers);
    }
  }, []);

  const getUser = async (headers) => {
    console.log("headers: ", headers);
    try {
      const response = await get("/users", { headers }); // Include the headers in the request
      console.log("response user: ", response);
      if (response.data.result) {
        setUser(response.data.result.user);
      } else {
        console.log("user failed:", response);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("user error:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2em",
          fontSize: "3rem",
          fontWeight: "bold",
        }}
      >
        You are logged in! Admin Dashboard comming soon here!
      </span>
      <span>User Info:</span>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <a
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
        }}
        href="/"
      >
        Go back to home page
      </a>
    </div>
  );
};

export default Admin;
