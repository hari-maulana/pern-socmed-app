import { Box, Container } from "@mui/material";
import LeftSidebar from "../components/root/LeftSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { useUser } from "../stores/UserContext";


interface DecodedToken {
  userId: string;
}


const RootLayout = () => {
  const [, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user, setUser } = useUser(); // Moved inside the component
  const [ isLogin, setIsLogin ] = useState(false)


  const token = localStorage.getItem("token");
  console.log(token);
  

  useEffect(() => {
    // Fetch user data dari server dari user ymag sudah login
    const fetchUserData = async () => {
      if (token) {
        try {
          const decodedToken = jwtDecode<DecodedToken>(token);
          if (decodedToken.userId) {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/me`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setIsLogin(true);
            setUser(response.data);
          } 
        } catch (err) {
          console.error("Error fetching user data:", err);
          setError("Failed to fetch user data.");
        }
      } else {
        navigate("/auth/login");
      }
    };
  
    fetchUserData();
  }, [token, navigate, setUser]);

  console.log(user); 
  /*
  type yang dibuat di type.d.ts hanya menentukan data output, tidak berpengaruh oleh data yang dikirim dari server, walaupun data yang dikirim dari server kurang atau lebih, misalkan dari server dikirim data bio tapi di tipe tidak ada maka itu tidak akan berpengaruh
  */
  
  if (isLogin) {
  return (
     <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'row' }}>
      {/* Sidebar */}
      <Box
        bgcolor={""}
        sx={{
          position: 'sticky',
          top: 0,
          height: '100vh', // Full height of the viewport
          width: '20%', // Adjust width as needed
          //backgroundColor: 'background.paper', // Use MUI theme for background
        }}
      >
        <LeftSidebar />
      </Box>

      <Outlet />

      
    </Container>
  );
}
};

export default RootLayout;
