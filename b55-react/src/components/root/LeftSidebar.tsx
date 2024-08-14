import { Box, Typography, useTheme } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import {
  Home as HomeIcon,
  HomeOutlined as HomeOutlinedIcon,
  PersonSearch as PersonSearchIcon,
  PersonSearchOutlined as PersonSearchOutlinedIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  AccountCircle as AccountCircleIcon,
  LogoutOutlined
} from '@mui/icons-material';
import LogoBrand from "../commons/LogoBrand";
import CommonButton from "../commons/CommonButton";
//import MyFormTitle from "../common/MyFormTitle";

const NAV_ITEMS = [
   {
      name: "Home",
      path: "/",
      icon: {
         active: <HomeIcon />,
         nonactive: <HomeOutlinedIcon />,
      },
   },
   {
      name: "Search",
      path: "/search",
      icon: {
         active: <PersonSearchIcon />,
         nonactive: <PersonSearchOutlinedIcon />,
      },
   },
   {
      name: "Follows",
      path: "/follows",
      icon: {
         active: <FavoriteIcon />,
         nonactive: <FavoriteBorderIcon />,
      },
   },
   {
      name: "Profile",
      path: "/profile",
      icon: {
         active: <AccountCircleIcon />,
         nonactive: <AccountCircleIcon />,
      },
   },
];

const Leftsidebar = () => {
   const theme = useTheme();

   return (
      <>
      <Box display={"flex"} flexDirection={"column"}>

         <LogoBrand />
         <br />
         {NAV_ITEMS.map((item) => {
            return (
               <NavLink
                  key={item.name}
                  to={item.path}
                  style={{ textDecoration: "none" }}
               >
                  {({ isActive }) => (
                     <Box
                        sx={{
                           display: "flex",
                           alignItems: "center",
                           mb: 1,
                           gap: 1,
                        }}
                     >
                        <Box
                           component="span"
                           sx={{
                              color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                              fontSize: "30px",
                           }}
                        >
                           {isActive ? item.icon.active : item.icon.nonactive}
                        </Box>
                        <Typography
                           color={isActive ? "primary" : theme.palette.text.primary}
                           sx={{ fontSize: "1.2rem" }}
                        >
                           {item.name}
                        </Typography>
                     </Box>
                  )}
               </NavLink>
            );
         })}
         <CommonButton text="Create Post" />
         <Box position={"fixed"} bottom={10} display={"flex"}>
         <LogoutOutlined />
         <Typography sx={{ marginLeft: "10px", ":hover": { color: "red", cursor: "pointer" } }}>
            <Link onClick={() => window.location.href = "auth/login"} style={{ color: theme.palette.text.primary, textDecoration: "none"}} to={""}>Logout</Link>
         </Typography>
         </Box>
      </Box>
      </>
   );
};

export default Leftsidebar;
