import React, { useContext, useState, useEffect } from "react";
import useApi from "utils/useApi";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "techhype-components";

import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AdminMenu from "components/AdminMenu";
import { useUser } from "utils/UserContext";
import RefreshToken from "utils/refreshToken";

const Admin = () => {
  const { get } = useApi(); // Use only the get method from useApi
  const { user, updateUser, logoutUser, fetchUserData } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
        // Redirect to /login if not authenticated
    if (!user) {
      console.log("No user found, redirecting to login");
      navigate("/login");
    } 
  }, [user, navigate]);


  // Function to handle user logout
  const handleLogout = async () => {
    sessionStorage.clear();
    try {
      await logoutUser(); // Ensure this completes before proceeding
      console.log('User successfully logged out.');
      
      // Navigate to login page
      navigate("/login");
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle error appropriately, e.g., show an error message
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
        <h1 style={{ textAlign: "center" }}>Dashboard</h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "800px",
          }}
        >
          <p>
            Hei {user ? user.FirstName : "Not available"}, Velkommen til din
            Techhype side. Her har du kontroll på din Konto, samt dine
            visittkort. Etter du har kjøpt et kort så kan du sende oss ønsket
            design på kortets utside rett fra din side. Klikk på "Kort" oppe i
            menyen for å komme i gang. Husk at du må kjøpe et visittkort før du
            kan sende oss ditt design. Ta gjerne kontakt med oss om du trenger
            hjelp eller om du har spesielle ønsker. Kjøper du større kvantum for
            bedrift, vennligst kontakt oss så kan vi ordne en god deal.
          </p>

          <span style={{ fontWeight: "bold", marginTop: "2em" }}>
            Oversikt:
          </span>
          <ul>
            <li>Antall visittkort: {user ? user.Cards.length : "Ingen"}</li>
            <li>Din E-post: {user ? user.Email : "Not available"}</li>
            <li>Epost Verifisert: {user && user.Verified ? "Ja" : "Nei"}</li>
            <li>Antall taps siste 30 dager: {user ? "0" : "Not available"}</li>
          </ul>

          {/* Logout Button */}
          <Button
            style={{ background: "#6b1d1d", color: "white" }}
            size="small"
            onClick={handleLogout}
          >
            Logg ut
          </Button>
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

export default Admin;
