import {
  Avatar,
  Box,
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { theme } from "../../Themes";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface User {
  userId: string;
  profilePict?: string;
  username?: string;
  name?: string;
  bio?: string;
}

interface Props {
  user?: User;
}

const ProfileCard: React.FC<Props> = ({ user }) => {
  const profilePict = user?.profilePict;

  const navigate = useNavigate();

  return (
    <Box
      border={"1px solid"}
      borderRadius={"5px"}
      sx={{ padding: "10px", borderColor: theme.palette.divider }}
    >
      <Box>
        <Box display={"flex"} alignItems={"center"} mb={2}>
            <IconButton onClick={() => navigate("/")}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" fontWeight={"bold"}>
              {user?.name}
            </Typography>
          </Box>

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
          <Avatar
            src={profilePict ? profilePict : ""}
            sx={{
              width: "60px",
              height: "60px",
              position: "absolute",
              zIndex: "1",
              left: "12px",
              top: "36px",
              border: "6px solid",
              borderColor: theme.palette.background.default,
            }}
          />

          <CardContent
            sx={{ marginTop: "40px", backgroundColor: "", padding: "0" }}
          >
            <Typography
              gutterBottom
              variant="body1"
              fontWeight={"bold"}
              component="div"
              sx={{ marginBottom: "0" }}
            >
              {user?.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              @{user?.username}
            </Typography>
            <br />
            <Typography variant="body2" color="">
              {user?.bio}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            sx={{ width: "100%" }}
          >
            <Box display={"flex"}>
              <Typography variant="body2" sx={{ color: "primary.main" }}>
                100
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  marginRight: "10px",
                  marginLeft: "10px",
                  fontWeight: "200",
                }}
              >
                Following
              </Typography>
              <Typography variant="body2" sx={{ color: "primary.main" }}>
                0
              </Typography>
              <Typography
                variant="body2"
                sx={{ marginLeft: "10px", fontWeight: "200" }}
              >
                Followers
              </Typography>
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
                Follow
              </Button>
            </Box>
          </Box>
        </CardActions>
      </Box>
    </Box>
  );
};

export default ProfileCard;
