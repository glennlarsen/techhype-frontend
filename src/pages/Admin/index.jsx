import React, { useContext, useState, useEffect } from "react";
import useApi from "utils/useApi";
import { useNavigate } from "react-router-dom";
import AuthContext from "utils/AuthContext";
import { Button, Card } from "techhype-components";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const Admin = () => {
  const { post, get } = useApi(); // Destructure the post function for making get requests
  const [user, setUser] = useState(null);
  console.log(user);
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("Auth: ", auth);

  useEffect(() => {
    // Redirect to /login if not authenticated
    if (!auth) {
      navigate("/login");
    }
  }, [auth, navigate]);

  // Function to handle user logout
  const handleLogout = () => {
    // Clear the token and any user-related data from local storage
    setAuth(null);

    // Redirect to the login page or any other desired location
    navigate("/");
  };

  useEffect(() => {
    if (auth) {
      // Include the token in the headers
      const headers = {
        authorization: `Bearer ${auth}`,
      };

      getUser(headers);
    }
  }, []);

  const getUser = async (headers) => {
    console.log("headers: ", headers);
    try {
      const response = await get("/users", headers); // Include the headers in the request
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
      }}
    >
      <h1 style={{ textAlign: "center" }}>Dashboard</h1>

      <Grid
        container
        padding={4}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid xs={6}>
          <Card>Account</Card>
        </Grid>
        <Grid xs={6}>
          <Card>My Cards</Card>
        </Grid>
        <Grid xs={6}>
          <Card>Card Profiles</Card>
        </Grid>
        <Grid xs={6}>
          <a href="/">
            <Card>Back to Techhype</Card>
          </a>
        </Grid>
      </Grid>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2em",
        }}
      >
        <strong>User Info:</strong>
        <ul>
          <li>First Name: {user ? user.FirstName : "Not available"}</li>
          <li>Last Name: {user ? user.LastName : "Not available"}</li>
          <li>Email: {user ? user.Email : "Not available"}</li>
          <li>Verified: {user && user.Verified ? "Yes" : "Not available"}</li>
          <li>Id: {user ? user.id : "Not available"}</li>
          <li>
            Cards:{" "}
            {user && user.Cards.length > 0 ? user.Cards : "No Cards available."}
          </li>
        </ul>

        {/* Logout Button */}
        <Button
          style={{ background: "#6b1d1d", color: "white" }}
          size="small"
          onClick={handleLogout}
        >
          Logout
        </Button>
        <a
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "white",
            marginTop: "2em",
          }}
          href="/"
        >
          Go back to home page
        </a>
      </div>
    </div>
  );
};

export default Admin;
