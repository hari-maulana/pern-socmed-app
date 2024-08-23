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
import { useNavigate } from "react-router-dom";
import { useUser } from "../../stores/UserContext";

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
   const navigate = useNavigate()
   const { setUser } = useUser();

   return (
      <>
         <Box bgcolor={""} width={"80%"} sx={{ padding: "" }} display={"flex"} flexDirection={"column"}>

        
      
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
                        variant="h6"
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
            <Link onClick={() => {navigate("/auth/login"); localStorage.removeItem("token"); setUser(null)}} style={{ color: theme.palette.text.primary, textDecoration: "none"}} to={""}>Logout</Link>
         </Typography>
         </Box>
         </Box>
      </>
   );
};

export default Leftsidebar;
