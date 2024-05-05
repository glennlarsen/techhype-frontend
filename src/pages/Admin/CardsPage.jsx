import React, { useContext, useState, useEffect } from "react";
import useApi from "utils/useApi";
import { useNavigate } from "react-router-dom";
import AuthContext from "utils/AuthContext";
import { Button, Card } from "techhype-components";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AdminMenu from "components/AdminMenu";

const CardsPage = () => {
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
    <AdminMenu onLogout={handleLogout}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Kort</h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2em",
          }}
        >
          <div>
            {user && user.Cards.length > 0 ? (
              user.Cards.map((card) => (
                <div key={card.id}>
                  {card.Designed ? (
                    <>
                      <strong>{card.Name}</strong>
                      <p>Aktiv: {card.Active ? "Yes" : "No"}</p>
                      <p>Designet: {card.Designed ? "Yes" : "No"}</p>
                      {/* Ensure that CardProfiles is also correctly rendered if it's an array */}
                      {card.CardProfiles &&
                        card.CardProfiles.map((profile) => (
                          <p key={profile.id}>Profile Name: {profile.Name}</p>
                        ))}
                      <Button>Edit</Button>
                    </>
                  ) : (
                    <Button>Design kortet ditt</Button>
                  )}
                </div>
              ))
            ) : (
              <>
                <Button>Kjøp Kort</Button>
                <span>
                  Allerede kjøpt kort? Det kan ta noen timer før kortet ditt
                  kommer opp på kontoen din, vennligst vent inntill 6 timer før
                  du tar kontakt med oss.
                </span>
              </>
            )}
          </div>

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
    </AdminMenu>
  );
};

export default CardsPage;
