// RefreshToken.js
const RefreshToken = async () => {
  const API_URL = process.env.REACT_APP_API_URL;
  try {
    const response = await fetch(`${API_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: 'include', // To include cookies in the request
    });
    const data = await response.json();
    if (response.ok) {
      return true; // Indicate that the refresh was successful
    } else {
      throw new Error(data.message || "Failed to refresh token");
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false; // Indicate that the refresh failed
  }
};

export default RefreshToken;


