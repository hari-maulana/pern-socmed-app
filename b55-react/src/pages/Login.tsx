import React, { useState, FormEvent } from "react";
import { Box, Container, Typography, Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import LogoBrand from "../components/commons/LogoBrand";
import InputField from "../components/commons/InputField";
import CommonButton from "../components/commons/CommonButton";

const Login: React.FC = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        emailOrUsername,
        password,
      });

      setSuccess(response.data.user.name);
      localStorage.setItem("token", response.data.token);

      const token = localStorage.getItem("token")
      console.log(token);
      

      if (token) {
        setTimeout(() => {
          navigate('/')
        }, 1500);  
      }

      
      // ;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error); //wtf this confusing let be it
        console.log(error);
        
      } else {
        console.error("An unexpected error occurred:", error);
        // pesan error untuk user
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <Container sx={{ height: "100vh" }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Container maxWidth="xs" sx={{ display: "flex", flexDirection: "column", margin: "auto auto" }}>
          <LogoBrand />
          <Typography variant="h4" sx={{ margin: "15px 0" }}>
            Ascend your Journey to the Next Level!
          </Typography>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
            <InputField
              placeholder="Email/Username*"
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />

            <InputField
              placeholder="Password*"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Typography alignSelf="end" sx={{ marginTop: "5px" }}>
              <Link onClick={() => navigate("/auth/forgot")} color="#ffffff" sx={{ ":hover": { color: "#F6EEDF", cursor: "pointer" } }}>
                Forgot password?
              </Link>
            </Typography>

            <CommonButton text="Login" />
          </form>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>Welcome, {success}!</p>}

          <Typography variant="h6" sx={{ margin: "15px 0" }}>
            Don't have any account yet?{" "}
            <Link onClick={() => navigate("/auth/register")} sx={{ color: "FFD31D", textDecoration: "none", ":hover": { color: "#F6EEDF", cursor: "pointer" } }}>
              Register
            </Link>
          </Typography>
        </Container>
      </Box>
    </Container>
  );
};

export default Login;
