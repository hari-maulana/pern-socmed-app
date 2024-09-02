import { Box, Typography } from "@mui/material";
import { theme } from "../../Themes";
import RightSidebar from "../../components/root/RightSidebar";
import Post from "../../components/post/createPost/PostBarForm";
import Feed from "../../components/root/Feed";
import BasicTabs from "../../components/profile/ProfileTabs";
import FollowsTabs from "../../components/follows/FollowsTabs";


const Follows = () => {
  return (
    <>
      {/* LeftSidebar */}

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
        <Box
          position={"sticky"}
          top={"0px"}
          sx={{
            backgroundColor: theme.palette.background.default,
            margin: "0",
            zIndex: "1",
            padding: "1rem",
            borderBottom: "1px solid",
            borderColor: theme.palette.divider,
            width: "100%",
            top: 0,
          }}
        >
          <Typography variant="h6" fontWeight={"bold"}>
            Home
          </Typography>
          
          
        </Box>
        <FollowsTabs />
      </Box>

      {/* RightSidebar */}
      <RightSidebar />
    </>
  );
};

export default Follows;
