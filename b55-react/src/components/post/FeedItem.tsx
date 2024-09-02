import {
  CommentBankOutlined,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  CardActionArea,
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
import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";

interface FeedItemProps {
  id?: string;
  avatar?: string;
  name?: string;
  username?: string;
  updatedAt: string;
  image?: string;
  text?: string;
  like?: [];
  comment?: number;
}

const FeedItem: React.FC<FeedItemProps> = ({
  id,
  avatar,
  name,
  username,
  updatedAt,
  text,
  like,
  image,
  comment,
}) => {
  
  const navigate = useNavigate()
  
  const now = new Date();

  const postDate = new Date(updatedAt);
  
  const inMilisecond = now.getTime() - postDate.getTime()

  const inMinute = Math.floor(inMilisecond / 1000 / 60)

  
  

  function formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return `${days}d`;
    } else if(hours > 0) {
      return `${hours}hr`;
    } else {
      return `${minutes}m`;
    }
  }

  
  
  
  
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
                @{username} • {formatTime(inMinute)} ago
              </Typography>
            </Box>
            {/* <Box bgcolor={""} height={"fit-content"} >
            <MoreMenu id={id} />
            </Box> */}
          </Box>

          <CardActionArea onClick={() => navigate(`/post/${id}`) }>
            
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
          </CardActionArea>

          {/* INTERACTION BUTTON */}
          <Box sx={{ display: "flex", alignItems: "center", padding: "0" }}>
            <Stack
              direction={"row"}
              spacing={1}
              flexWrap={"wrap"}
              width={"72px"}
            >
              {/* <Checkbox
                size="medium"
                style={{ width: "", padding: 0 }}
                icon={<FavoriteBorder sx={{ padding: "0" }} />}
                checkedIcon={<Favorite />}
              /> */}
                <LikeButton postId={id} initialLikes={like?.length} />
              
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <IconButton aria-label="share" style={{ width: "", padding: 0 }} >

                <CommentBankOutlined />
              </IconButton>
              <Typography sx={{ color: theme.palette.text.secondary }}>
                {comment}
              </Typography>
            </Stack>
          </Box>
        </Box>
      </ListItem>
    </>
  );
};

export default FeedItem;
