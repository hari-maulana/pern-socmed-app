import { theme } from '../../Themes'
import { Box } from '@mui/material'
import ProfileTabs from '../../components/profile/ProfileTabs'
import RightSidebar from '../../components/root/RightSidebar'
import UserProfileCard from '../../components/user/UserProfileCard'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const token = localStorage.getItem("token");

const UserProfile = () => {
    const [user, setUser] = useState<any>(null);
    const { id } = useParams<{ id: string }>();

  const fetchUserDataById = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
          
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);    
    }
  };

  useEffect(() => {
    fetchUserDataById();
  }, []);

  console.log(user);
  


  return (
    <>
    
    {/* CONTAINER  */}
    <Box
    bgcolor={""}
    sx={{
      flexGrow: 1,
      overflowY: "auto",
      maxHeight: "100vh",
      width: "50%",
      margin: "0 16px 0 16px",
      borderLeft: "1px solid",
      borderRight: "1px solid",
      borderColor: theme.palette.divider,
      scrollbarWidth: 'none', // Hide scrollbar for Firefox
      '&::-webkit-scrollbar': {
        display: 'none', // Hide scrollbar for Chrome, Safari, and Opera
    },
    }}
  >
    {/* PROFILE CARD */}
    <Box
      position={"sticky"}
      top={"0px"}
      sx={{
        backgroundColor: theme.palette.background.default,
        margin: "0",
        zIndex: "1",
        padding: "0",
        borderBottom: "1px solid",
        borderColor: theme.palette.divider,
        width: "100%",
        top: 0,
      }}
    >
      <UserProfileCard user={user}  />
    </Box>
    {/* CONTENT */}
    <ProfileTabs />
    
  </Box>

  {/* RightSidebar */}
  <RightSidebar />
  </>
  )
}

export default UserProfile;