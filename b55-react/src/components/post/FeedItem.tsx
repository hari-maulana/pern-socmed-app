import {
  Favorite,
  FavoriteBorder,
  MoreHoriz,
  Share,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Checkbox,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { theme } from "../../Themes";

interface FeedItemProps {
  avatar?: string;
  name?: string;
  username?: string;
  updatedAt: string;
  image?: string;
  text?: string;
  like?: number;
}

const FeedItem: React.FC<FeedItemProps> = ({
  avatar,
  name,
  username,
  updatedAt,
  text,
  like,
  image,
}) => {
  
  const now = new Date();

  const postDate = new Date(updatedAt);
  
  const inMilisecond = now.getTime() - postDate.getTime()

  const inHour = Math.floor(inMilisecond / 1000 / 60 / 60)
  
  
  
  
  return (
    <>
      <ListItem
        alignItems="flex-start"
        sx={{
          borderBottom: 1,
          borderColor: theme.palette.divider,
          padding: "16px",
        }}
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={avatar} />
        </ListItemAvatar>
        <Box width={"100%"}>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Box display={"flex"}>
              <Typography fontWeight={"bold"} fontSize={"15px"}>
                {name}
              </Typography>
              <Typography
                fontSize={"15px"}
                marginLeft={"5px"}
                sx={{ color: theme.palette.text.secondary }}
              >
                @{username} • {inHour}hr ago
              </Typography>
            </Box>
            <Box>
              <MoreHoriz />
            </Box>
          </Box>

          <ListItemText
            primary={
              <React.Fragment>
                <Typography
                  fontSize={"15px"}
                  sx={{ display: "inline", marginTop: "100px" }}
                  component="span"
                  variant="body2"
                >
                  {text}
                </Typography>
              </React.Fragment>
            }
          />

          {/* IMAGE */}
          <Box>
            {image && (
              <img
                src={image}
                alt=""
                width="100%"
                height="240px"
                style={{
                  borderRadius: "5px",
                  objectFit: "contain",
                  border: "1px solid",
                  borderColor: theme.palette.divider,
                }}
              />
            )}
          </Box>

          {/* INTERACTION BUTTON */}
          <Box sx={{ display: "flex", alignItems: "center", padding: "0" }}>
            <Stack
              direction={"row"}
              spacing={1}
              flexWrap={"wrap"}
              width={"72px"}
            >
              <Checkbox
                size="medium"
                style={{ width: "", padding: 0 }}
                icon={<FavoriteBorder sx={{ padding: "0" }} />}
                checkedIcon={<Favorite />}
              />
              <Typography sx={{ color: theme.palette.text.secondary }}>
                {like}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <IconButton aria-label="share" style={{ width: "", padding: 0 }}>
                <Share />
              </IconButton>
              <Typography sx={{ color: theme.palette.text.secondary }}>
                
              </Typography>
            </Stack>
          </Box>
        </Box>
      </ListItem>
    </>
  );
};

export default FeedItem;
