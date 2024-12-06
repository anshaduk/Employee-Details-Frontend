import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import {myContext} from '../contextAPI/UserContext';

const Login = () => {
  const [picture,setPicture] = useContext(myContext)
  console.log(picture);
  
  const [user, setUser] = useState(null); // Stores the user token
  const [profile, setProfile] = useState(null); // Stores user profile details
  const navigate = useNavigate();

  // Google Login function
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });

  // Fetch Google profile info
  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setProfile(res.data);
          setPicture(res.data.picture)
          navigate('/register'); 
        })
        .catch((err) => console.log(err));
    }
  }, [user, navigate, setPicture]);

  // Logout function
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div className="h-[100vh] flex items-center justify-center bg-blue-200">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Left Section */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-blue-500 text-white justify-center items-center p-10">
          <blockquote className="text-3xl italic font-semibold">
            "The only way to do great work is to love what you do."
          </blockquote>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-10 bg-gray-100">
          <div className="w-full max-w-md">
            <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Employee Login</h2>
            
            {/* Google Sign-In Button */}
            {profile ? (
              <div className="text-center">
                <img src={profile.picture} alt="user profile" className="w-16 h-16 rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-medium">Welcome, {profile.name}!</h3>
                <p className="text-sm text-gray-600 mb-4">{profile.email}</p>
                <button
                  onClick={logOut}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={login}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Sign in with Google 🚀
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
