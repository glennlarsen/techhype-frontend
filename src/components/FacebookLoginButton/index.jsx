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
    // Load Facebook SDK
    const loadFacebookSDK = () => {
      console.log('Loading Facebook SDK...');
      if (window.FB) {
        console.log('Facebook SDK already loaded.');
        initializeFacebookSDK();
      } else {
        window.fbAsyncInit = initializeFacebookSDK;
        const script = document.createElement('script');
        script.src = "https://connect.facebook.net/en_US/sdk.js";
        script.async = true;
        script.defer = true;
        script.onload = () => console.log('Facebook SDK script loaded.');
        document.body.appendChild(script);
      }
    };

    // Initialize Facebook SDK
    const initializeFacebookSDK = () => {
      console.log('Initializing Facebook SDK...');
      window.FB.init({
        appId: '3880683602256013',
        cookie: true,
        xfbml: true,
        version: 'v20.0'
      });

      window.FB.AppEvents.logPageView();
      window.FB.XFBML.parse();
      checkLoginState();
    };

    // Check if the Facebook SDK is loaded
    loadFacebookSDK();

    // Make checkLoginState globally accessible
    window.checkLoginState = checkLoginState;
  }, []);

  // Handle status change callback
  const statusChangeCallback = async (response) => {
    console.log('Facebook login status response', response);
    if (response.status === 'connected') {
      console.log('User is logged in with Facebook');
      const { accessToken } = response.authResponse;
      console.log('accessToken:', accessToken);

      // Send the accessToken to your backend for validation and to get a JWT
      try {
        const backendResponse = await post('/auth/facebook', { accessToken });
        console.log('backend response:', backendResponse);
         console.log('User is logged in with Facebook');
        if (backendResponse.status === 'success') {
          localStorage.setItem('token', backendResponse.data.token);
          await fetchUserData();
          navigate('/dashboard');
        } else {
          console.log('Facebook login failed:', backendResponse.message);
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
