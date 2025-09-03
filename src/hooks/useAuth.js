import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true); // add

  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };

  const [authTokens, setAuthTokens] = useState(getToken());

  // Check if token is expired
  const isTokenExpired = (token) => {
    if (!token) return true;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      return true;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const tokens = getToken();      
      if (!tokens) {
        setIsLoading(false);
        return;
      }
      if (isTokenExpired(tokens.access)) {
        try {
          await refreshAccessToken(tokens.refresh);
        } catch (error) {
          console.log("Token refresh failed, logging out");
          logoutUser();
        }
      } else {        
        await fetchUserProfile(tokens); // Token is valid, fetch user profile
      }      
      setIsLoading(false);
    };
    initAuth();
  }, []); // Run only once on mount

  useEffect(() => {
    // Only fetch if we're loading tokens from localStorage (page refresh scenario), Don't fetch if we just logged in (user will already be set)
    if (authTokens  && !user) fetchUserProfile(authTokens);
  }, [authTokens, user]);


  const refreshAccessToken = async (refreshToken) => {
    try {
      const response = await apiClient.post("/auth/jwt/refresh/", {
        refresh: refreshToken
      });      
      const newTokens = {
        ...authTokens,
        access: response.data.access
      };      
      setAuthTokens(newTokens);
      localStorage.setItem("authTokens", JSON.stringify(newTokens));
      await fetchUserProfile(newTokens);      
      return newTokens; // ---
    } catch (error) {
      throw error;
    }
  };

  // Fetch user Profile
  const fetchUserProfile = async (tokens = null) => {
    const tokensToUse = tokens || authTokens;
    if (!tokensToUse?.access) return;
    
    try {
      const response = await apiClient.get("/auth/users/me/", {
        headers: { Authorization: `JWT ${tokensToUse.access}` },
      });
      setUser(response.data);
    } catch (error) {
      console.log("Error Fetching user", error);
      // If unauthorized, try to refresh token
      if (error.response?.status === 401 && tokensToUse.refresh) {
        try {
          await refreshAccessToken(tokensToUse.refresh);
        } catch (refreshError) {
          console.log("Token refresh failed, logging out");
          logoutUser();
        }
      }
    }
  };

  /*
 with token, get request at: https://drf-phimart.vercel.app/api/auth/users/me/ 
 response: 
 {
    "id": 1,
    "email": "admin@example.com",
    "first_name": "",
    "last_name": "",
    "address": null,
    "phone_number": null
} 
  */

  // Login User
  const loginUser = async (userData) => {
    setErrorMsg("");
    try {
      const response = await apiClient.post("/auth/jwt/create/", userData);
      console.log(response.data);
      
      const newTokens = response.data;
      setAuthTokens(newTokens); // beware its async. so cant use it directly below it now.
      localStorage.setItem("authTokens", JSON.stringify(newTokens));

      // Pass the fresh tokens directly instead of relying on state
      await fetchUserProfile(newTokens);
    } catch (error) {      
	  setErrorMsg(error.response?.data?.detail || "Login failed");
    } finally {
      setIsLoading(false);
    }
  }; // fetchUserProfile maybe called twice, alternatively use .then chaining instead of await

/*
^
"/auth/jwt/create/" : usually provided by djangorestframework-simplejwt
userData:
{
  "email": "string",
  "password": "string"
}
*/


  // Register User
  const registerUser = async (userData) => {
    setErrorMsg("");
    try {
      await apiClient.post("/auth/users/", userData);
      return {
        success: true,
        message: "Registration successfull. Check your email to activate your account.",
      };
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = Object.values(error.response.data) // ---------
          .flat()
          .join("\n");
        setErrorMsg(errorMessage);
        return { success: false, message: errorMessage };
      }
      setErrorMsg("Registratation failed. Please try again");
      return {
        success: false,
        message: "Registratation failed. Please try again",
      };
    }
  };

  // Logout User
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
  };

  return { user, errorMsg, isLoading, loginUser, registerUser, logoutUser, authTokens };
};

export default useAuth;



/*
alternative fix:
// useAuth.js
useEffect(() => {
  if (!authTokens) return;         // ← guard
  fetchUserProfile();
}, [authTokens]);

// fetchUserProfile
const fetchUserProfile = async () => {
  if (!authTokens?.access) return; // ← extra guard
  try {
    const { data } = await apiClient.get("/auth/users/me/", {
      headers: { Authorization: `JWT ${authTokens.access}` },
    });
    setUser(data);
  } catch (e) {
    console.error("Error fetching user", e);
  }
};
*/