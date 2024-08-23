import { theme } from '../../Themes'
import { Box } from '@mui/material'
import SuggestedUser from '../../components/user/SuggestedUser'
import ProfileCard from '../../components/profile/ProfileCard'
import ProfileTabs from '../../components/profile/ProfileTabs'

const Profile = () => {
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
      <ProfileCard />
    </Box>
    {/* CONTENT */}
    <ProfileTabs />
    
  </Box>

  {/* RightSidebar */}
  <Box
    display={"flex"}
    flexDirection={"column"}
    bgcolor={""}
    sx={{
      paddingTop: "1rem",
      position: 'sticky',
      top: 0,
      height: '100vh',
      width: '30%', 
    }}
  >
    <Box border={"1px solid"} borderRadius={"5px"} sx={{ padding: "10px", borderColor: theme.palette.divider, marginTop: "1rem" }}>
        <SuggestedUser />
    </Box>
  </Box>
  </>
  )
}

export default Profile