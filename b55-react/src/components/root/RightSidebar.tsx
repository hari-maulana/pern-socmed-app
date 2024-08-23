import {
  Box,
  Icon,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { theme } from "../../Themes";
import SuggestedUser from "../user/SuggestedUser";
import ProfileCard from "../profile/ProfileCard";
import DevelopedBy from "./DevelopedBy";


const RightSidebar: React.FC = () => {



  return (
    <><Box
    display={"flex"}
    flexDirection={"column"}
    bgcolor={""}
    sx={{
      paddingTop: "1rem",
      position: 'sticky',
      top: 0,
      height: '100vh', // Full height of the viewport
      width: '30%', // Adjust width as needed
      //backgroundColor: 'background.paper',
    }}
  >
    <ProfileCard />
    <Box border={"1px solid"} borderRadius={"5px"} sx={{ padding: "10px", borderColor: theme.palette.divider, marginTop: "1rem" }}>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>Suggested for you</Typography>
        <SuggestedUser />
    </Box>

    <DevelopedBy />
  </Box>
    </>
  );
};

export default RightSidebar;
