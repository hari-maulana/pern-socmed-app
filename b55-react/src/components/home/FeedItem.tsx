import { Favorite, FavoriteBorder, Share } from "@mui/icons-material";
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
  name?: string;
  username?: string;
  time?: string;
  //image?: string;
  text?: string;
  like?: number;
  //comment?: number;
  share?: number;
}

const FeedItem: React.FC<FeedItemProps> = ({
  name,
  username,
  time,
  text,
  like,
  share,
}) => {
  return (
    <>
      <ListItem
        alignItems="flex-start"
        sx={{
          borderBottom: 1,
          borderColor: theme.palette.divider,
        }}
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="{image}" />
        </ListItemAvatar>
        <Box>
          <Stack direction={"row"} spacing={1} flexWrap={"wrap"}>
            <Typography>{name}</Typography>
            <Typography sx={{ color: theme.palette.text.secondary }}>
              @{username}
            </Typography>
            <Typography sx={{ color: theme.palette.text.secondary }}>
              • {time} ago
            </Typography>
          </Stack>

          <ListItemText
            primary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline", marginTop: "100px" }}
                  component="span"
                  variant="body2"
                >
                  {" "}
                  {text}
                  {/* */}
                </Typography>
              </React.Fragment>
            }
          />

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
                {share}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </ListItem>
    </>
  );
};

export default FeedItem;
