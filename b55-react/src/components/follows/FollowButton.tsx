import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { theme } from '../../Themes';

interface FollowButtonProps {
  userId: string;
  followingId: string;
}

const FollowButton = ({ userId, followingId }: FollowButtonProps) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = async () => {
    if (!followingId) {
      console.error('Following ID is empty.');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/${userId}/follow`, { followingId });
      
      // Toggle isFollowing based on whether the follow relation now exists
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Failed to follow/unfollow', error);
    }
  };

  const fetchIsFollowing = async () => {
    if (!followingId) {
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}/follow/${followingId}`);
      
      // Set isFollowing based on the presence of a follow relation
      setIsFollowing(!!response.data);
    } catch (error) {
      console.error('Failed to fetch following status', error);
    }
  };

  useEffect(() => {
    fetchIsFollowing();
  }, [followingId]); // Adding followingId as a dependency

  return (
    <Button onClick={toggleFollow} disabled={!followingId} size="small"
    sx={{
      marginLeft: "auto",
      border: "1px solid",
      borderColor: theme.palette.text.primary,
      color: theme.palette.text.primary,
      borderRadius: "15px",
      textTransform: "none",
      paddingLeft: "10px",
      paddingRight: "10px",
    }}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default FollowButton;
