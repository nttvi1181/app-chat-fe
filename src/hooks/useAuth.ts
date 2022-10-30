import { DataSignIn, DataSignUp } from "../types";
import { useState } from "react";
import UserService from "../services/userApi";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const onLogout = () => {
    localStorage.removeItem("_token");
    localStorage.removeItem("_refresh_token");
    navigate("/login");
  };
  const onRegister = async (value: DataSignUp) => {
    try {
      setLoading(true);
      const { data } = await UserService.register(value);
      localStorage.setItem("_token", data.accessToken);
      localStorage.setItem("_refresh_token", data.refreshAccessToken);
      navigate("/");
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };
  const onLogin = async (value: DataSignIn) => {
    try {
      setLoading(true);
      const { data } = await UserService.login(value);
      localStorage.setItem("_token", data.accessToken);
      localStorage.setItem("_refresh_token", data.refreshAccessToken);
      navigate("/");
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  return { loading, error, onLogin, onLogout, onRegister };
};

export default useAuth;
