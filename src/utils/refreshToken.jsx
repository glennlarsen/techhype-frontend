const refreshToken = async () => {
  const API_URL = process.env.REACT_APP_API_URL;
  try {
    const refresh_token = localStorage.getItem("refreshToken"); // get your refresh token
    const response = await fetch(`${API_URL}/refresh-token`, {
      // your backend endpoint
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token }),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("auth", data.token); // update the token
      return data.token;
    } else {
      throw new Error("Failed to refresh token");
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    // Handle error, redirect to login, etc.
  }
};

export default refreshToken;
