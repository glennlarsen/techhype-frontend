/* global FB */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from 'utils/useApi';
import { useUser } from 'utils/UserContext';

const FacebookLoginButton = () => {
  const navigate = useNavigate();
  const { post } = useApi();
  const { fetchUserData } = useUser();

  useEffect(() => {
    // Function to check FB SDK status
    const checkFB = () => {
      if (window.FB) {
        console.log('Facebook SDK is loaded.');
        window.FB.XFBML.parse();
        window.FB.getLoginStatus((response) => {
          console.log('Checking FB login status...');
          statusChangeCallback(response);
        });
      } else {
        console.log('Retrying FB SDK load check...');
        setTimeout(checkFB, 100);
      }
    };

    // Check if the Facebook SDK is loaded
    checkFB();

    // Make checkLoginState globally accessible
    window.checkLoginState = checkLoginState;
  }, []);

  // Handle status change callback
  const statusChangeCallback = async (response) => {
    console.log('Facebook login status response', response);
    if (response.status === 'connected') {
      console.log('User is logged in with Facebook');
      const { accessToken } = response.authResponse;

      // Send the accessToken to your backend for validation and to get a JWT
      try {
        const backendResponse = await post('/auth/facebook', { accessToken });
        if (backendResponse.status === 'success') {
          localStorage.setItem('token', backendResponse.data.token);
          await fetchUserData();
          navigate('/dashboard');
        } else {
          console.log('Facebook login failed:', backendResponse.data.message);
        }
      } catch (error) {
        console.error('Backend error:', error);
      }
    } else {
      console.log('User is not logged into Facebook');
    }
  };

  // Check login state function
  const checkLoginState = () => {
    console.log('FB.getLoginStatus called');
    window.FB.getLoginStatus((response) => {
      statusChangeCallback(response);
    });
  };

  return (
    <div>
      <div
        className="fb-login-button"
        data-width=""
        data-size="large"
        data-button-type="continue_with"
        data-layout="default"
        data-auto-logout-link="false"
        data-use-continue-as="true"
        data-scope="public_profile,email"
        data-onlogin="checkLoginState"
        style={{ display: 'inline-block' }}
      ></div>
    </div>
  );
};

export default FacebookLoginButton;
