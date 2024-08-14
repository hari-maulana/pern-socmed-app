import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { theme } from "../../Themes";

interface UserBarProps {
    avatar?: string;
    name?: string;
    username?: string;
    status?: string;
}

const UserBar : React.FC<UserBarProps> = ({ avatar, name, username, status}) => {
  return (
    <>
      <Box display={"flex"} margin={"10px 10px"} justifyContent={"space-between"} alignItems={"center"}>
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
      </Box>
    </>
  );
};

export default UserBar;
