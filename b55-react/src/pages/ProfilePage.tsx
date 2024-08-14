import { theme } from '../Themes'
import RightSidebar from '../components/root/RightSidebar'
import { Box, Typography } from '@mui/material'

const ProfilePage = () => {
  return (
    <>
           {/*  */}
       <Box flex={7} bgcolor={""}>
         <Box
           position={"sticky"}
           top={"0px"}
           sx={{
             backgroundColor: "",
             marginTop: "0",
             zIndex: "1",
             width: "100",
             height: "100vh",
             borderLeft: "1px solid",
             borderColor: theme.palette.divider,
             paddingTop: "1rem",
             paddingLeft: "2rem",
             paddingRight: "2rem",
           }}
         >
           <RightSidebar />
         </Box>
       </Box>
   </>
  )
}

export default ProfilePage