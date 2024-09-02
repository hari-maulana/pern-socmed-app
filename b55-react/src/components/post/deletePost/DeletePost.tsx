import { Button, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'

interface Props {
    id: string | undefined
}

const DeletePost = ({ id }: Props) => {
    const deletePost = async () => {
        try {
          const response = await axios.delete(`${import.meta.env.VITE_API_URL}/posts/${id}`);
          console.log(response);
          window.location.reload();
        } catch (error) {
          console.error(error);
        }
    }

  return (
    <>
    <Typography onClick={deletePost} color='error'>Delete</Typography>
    </>
  )
}

export default DeletePost