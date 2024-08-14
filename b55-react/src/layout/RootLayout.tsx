import { Box } from "@mui/material";
import LeftSidebar from "../components/root/LeftSidebar";
import { theme } from "../Themes";
import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userId: string;
}

interface UserData {
  // Define the shape of userData here
  id: string;
  name: string;
  // Add other fields as necessary
}

const RootLayout = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode<DecodedToken>(token) : null;

  useEffect(() => {
    const fetchUserData = async () => {
      if (decodedToken && decodedToken.userId) {
        try {
          const response = await axios.get(`http://localhost:3000/users/${decodedToken.userId}`);
          setUserData(response.data);
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Failed to fetch user data.");
          // Navigasi ke halamnya login jika terjadi error
        }
      }
    };
    fetchUserData();
  }, [decodedToken]);

  console.log(userData);

  return (
    <>
      <Box display="flex">
        <Box flex={2}>
          <Box
            position="sticky"
            top="0"
            sx={{
              marginTop: "0",
              zIndex: 1,
              paddingTop: "5px",
              borderRight: "1px solid",
              borderColor: theme.palette.divider,
              width: "100%",
              height: "100vh",
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          >
            <LeftSidebar />
          </Box>
        </Box>
        <Outlet />
      </Box>
    </>
  );
};

export default RootLayout;
