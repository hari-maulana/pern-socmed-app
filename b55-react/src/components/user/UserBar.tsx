import { Avatar, Box,Typography } from "@mui/material";
import React from "react";
import { theme } from "../../Themes";
import FollowButton from "../follows/FollowButton";
import { useUser } from "../../stores/UserContext";

interface UserBarProps {
     id?: string;
    avatar?: string;
    name?: string;
    username?: string;
    status?: string;
}

const UserBar : React.FC<UserBarProps> = ({id, avatar, name, username, status}) => {

  const { user } = useUser();

  return (
    <>
      <Box display={"flex"} margin={"10px 10px"} justifyContent={"space-between"} alignItems={"center"} sx={{ height: "60px", paddingBottom: "10px"}}>
        <Box display={"flex"}>
          <Box>
            {/* Avatar */}
            <Avatar
              alt="Remy Sharp"
              src={avatar}
            />
          </Box>

          <Box ml={2}>
            {/* Name and username */}
            <Typography variant="body1">{name}</Typography>
            <Typography variant="body2" color={theme.palette.text.secondary}>
              @{username}
            </Typography>
            <Typography variant="body2">{status}</Typography>
          </Box>
        </Box>

        <Box>
          {/* Follow Button */}
          <Box bgcolor={""}>
          <FollowButton userId={user?.id ?? ""} followingId={id ?? ""} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default UserBar;
