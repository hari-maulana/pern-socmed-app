import React, { useState } from "react";
import axios from "axios";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { theme } from "../../Themes";
import { red } from "@mui/material/colors";

interface LikeButtonProps {
  postId?: string;
  initialLikes: number | undefined;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, initialLikes }) => {
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false); // optional: track if the post is already liked

  const handleToggleLike = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/toggle-like`, {
        userId: 1, // Replace with actual userId
        postId: postId,
      });

      // Update like count based on current state
      if (isLiked) {
        setLikeCount((prev) => (prev || 0) - 1);
      } else {
        setLikeCount((prev) => (prev || 0) + 1);
      }

      // Toggle the like status
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <>
      <Box display={"flex"} alignItems={"center"}>
        <IconButton onClick={handleToggleLike}>
          {isLiked || initialLikes ? (
            <Favorite sx={{ color: red[700] }} />
          ) : (
            <FavoriteBorder />
          )}
        </IconButton>
        <p>{likeCount}</p>
      </Box>
    </>
  );
};

export default LikeButton;
