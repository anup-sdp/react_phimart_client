import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const getToken = () => {
    const token = localStorage.getItem("authTokens");
    return token ? JSON.parse(token) : null;
  };

  const [authTokens, setAuthTokens] = useState(getToken());

  useEffect(() => {
    if (authTokens) fetchUserProfile(authTokens); // uses authTokens from state when available
  }, [authTokens]);

  // Fetch user Profile
  const fetchUserProfile = async (tokens = null) => {
	const tokensToUse = tokens || authTokens;
    if (!tokensToUse) return;
    try {		
      const response = await apiClient.get("/auth/users/me", {headers: { Authorization: `JWT ${tokensToUse.access}` },});
      setUser(response.data);
    } catch (error) {
      console.log("Error Fetching user", error);
    }
  };

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
      setErrorMsg(error.response.data?.detail);
    }
  };

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
        message:
          "Registration successfull. Check your email to activate your account.",
      };
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = Object.values(error.response.data)
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

  return { user, errorMsg, loginUser, registerUser, logoutUser };
};

export default useAuth;