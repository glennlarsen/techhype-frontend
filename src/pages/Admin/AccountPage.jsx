import React, { useContext, useState, useEffect } from "react";
import useApi from "utils/useApi";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "techhype-components";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AdminMenu from "components/AdminMenu";
import { useUser } from 'utils/UserContext';


const AccountPage = () => {
  const { post, get } = useApi(); // Destructure the post function for making get requests
  const { user, updateUser, logoutUser } = useUser();
  console.log(user);
  const navigate = useNavigate();


  useEffect(() => {
    // Redirect to /login if not authenticated
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Function to handle user logout
  const handleLogout = () => {
    logoutUser(() => navigate('/login'));  // Navigate to login after logout
  };



  return (
    <AdminMenu onLogout={handleLogout}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Konto</h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2em",
          }}
        >
          <strong>Din bruker Info:</strong>
          <ul>
            <li>First Name: {user ? user.FirstName : "Not available"}</li>
            <li>Last Name: {user ? user.LastName : "Not available"}</li>
            <li>Email: {user ? user.Email : "Not available"}</li>
            <li>Verified: {user && user.Verified ? "Yes" : "Not available"}</li>
            <li>Id: {user ? user.id : "Not available"}</li>
            <li>
              Cards:{" "}
              {user && user.Cards.length > 0
                ? user.Cards.map((card) => (
                    <div key={card.id}>
                      <p>Card Name: {card.Name}</p>
                      <p>Active: {card.Active ? "Yes" : "No"}</p>
                      <p>Designed: {card.Designed ? "Yes" : "No"}</p>
                      {/* Ensure that CardProfiles is also correctly rendered if it's an array */}
                      {card.CardProfiles &&
                        card.CardProfiles.map((profile) => (
                          <p key={profile.id}>Profile Name: {profile.Name}</p>
                        ))}
                    </div>
                  ))
                : "No Cards available."}
            </li>
          </ul>
          <a
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "black",
              marginTop: "2em",
            }}
            href="/"
          >
            Go back to home page
          </a>
        </div>
      </div>
    </AdminMenu>
  );
};

export default AccountPage;
