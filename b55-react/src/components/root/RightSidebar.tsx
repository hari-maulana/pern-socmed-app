import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Icon,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { theme } from "../../Themes";
import { Facebook, GitHub, Instagram, LinkedIn } from "@mui/icons-material";
import { useUser } from "../../stores/UserContext";
import UserList from "../commons/UserList";
import SuggestedUser from "../user/SuggestedUser";


const RightSidebar: React.FC = () => {
  const { user } = useUser(); // disini sebenarnya const { user } = useContext(UserContext);



  return (
    <>
      <Box border={"1px solid"} borderRadius={"5px"} sx={{ padding: "10px", borderColor: theme.palette.divider }}>
        <Box>
          <Typography marginBottom={"0.75rem"}>
            Profile
          </Typography>
          <CardActionArea>
              <CardMedia
                component="img"
                height="70px"
                image="https://static.vecteezy.com/system/resources/previews/010/513/877/original/beautiful-gradient-background-in-yellow-white-and-brown-smooth-and-soft-texture-free-vector.jpg"
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                  border: "",
                }}
              />
              <CardMedia
                component="img"
                height="70px"
                image="https://www.pngkey.com/png/detail/22-223848_businessman-vector-person-logo-png.png"
                alt="people"
                sx={{
                  width: "70px",
                  position: "absolute",
                  zIndex: "1",
                  left: "24px",
                  top: "36px",
                  borderRadius: "50%",
                  border: "6px solid",
                  borderColor: theme.palette.background.default,
                }}
              />
              <CardContent sx={{ marginTop: "20px" }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ marginBottom: "-2px" }}
                >
                  {user ? <p>{user.name}</p> : <small>Please register/login</small>}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: "" }}
                >
                  {user ? <p>{user.email}</p> : <small>Please register/login</small>}
                </Typography>
                <Typography variant="body2" color="">
                  Lorem ipsum dolor sit amet consectetur
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Box display={"flex"} justifyContent={"space-between"} sx={{ width: "100%" }}>
                <Box display={"flex"}>
                  <Typography variant="body2" sx={{color: "primary.main"}}>100</Typography>
                  <Typography variant="body2" sx={{ marginRight: "10px", marginLeft: "10px", fontWeight: "200" }}>Following</Typography>
                  <Typography variant="body2" sx={{color: "primary.main"}} >0</Typography>
                  <Typography variant="body2" sx={{ marginLeft: "10px", fontWeight: "200" }}>Followers</Typography>
                </Box>
                <Box bgcolor={""}>
                  <Button
                    size="small"
                    sx={{
                      marginLeft: "auto",
                      border: "1px solid",
                      borderColor: "white",
                      color: "white",
                      borderRadius: "15px",
                      textTransform: "none",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    Edit Profile
                  </Button>
                </Box>
              </Box>
            </CardActions>

        </Box>
      </Box>

      <Box border={"1px solid"} borderRadius={"5px"} sx={{ padding: "10px", borderColor: theme.palette.divider, marginTop: "1rem" }}>
        <SuggestedUser />
      </Box>

      <Box border={"1px solid"} borderRadius={"5px"} sx={{ padding: "10px", borderColor: theme.palette.divider, marginTop: "1rem" }}>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography variant="body2" marginRight={"0.4rem"} fontWeight={"300"} color={"text.secondary"}>
            Developed by
          </Typography>
          <Typography variant="body2" marginRight={"0.4rem"}>
            Hari Maulana
          </Typography>
          <Typography variant="body2" marginRight={"0.4rem"}>
          •
          </Typography>

          <Link onClick={() => window.open("https://github.com/hari-maulana", "_blank")} sx={{textDecoration: "none", ":hover": {color: "#F6EEDF"}}}><Icon><GitHub fontSize="small" /></Icon></Link>
          <Link onClick={() => window.open("#")} sx={{textDecoration: "none", ":hover": {color: "#F6EEDF"}}}><Icon><LinkedIn fontSize="small" /></Icon></Link>
          <Link onClick={() => window.open("#")} sx={{textDecoration: "none", ":hover": {color: "#F6EEDF"}}}><Icon><Facebook fontSize="small" /></Icon></Link>
          <Link onClick={() => window.open("#")} sx={{textDecoration: "none", ":hover": {color: "#F6EEDF"}}}><Icon><Instagram fontSize="small" /></Icon></Link>
        </Stack>
        <Stack gap={"0.5rem"} direction={"row"} alignItems={"center"} flexWrap={"wrap"}>
        <Typography variant="caption" fontWeight={"300"}>
          Powered by
        </Typography>
        <Typography variant="caption" color={"orangered"} fontWeight={"bold"}>
          DumbWays
        </Typography>
        <Typography variant="caption" fontWeight={"300"}>
        Indonesia • #1 Coding Bootcamp
        </Typography>
        </Stack>
      </Box>










    </>
  );
};

export default RightSidebar;
