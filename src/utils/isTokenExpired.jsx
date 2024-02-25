// Utility function to decode JWT token and check expiration
const isTokenExpired = (token) => {
    if (!token) {
      return true;
    }
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000; // current time in seconds
    return decodedToken.exp < currentTime;
  };

  export default isTokenExpired;