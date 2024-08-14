import { Avatar, Box, Button, IconButton, TextField } from '@mui/material'
import React, { useRef } from 'react'
import { AddPhotoAlternateOutlined } from '@mui/icons-material'

const Post = () => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file);
      // Handle the file upload logic here
    }
  };




    const handlePostClick = () => {
        // Your posting logic here
      };

  return (
    <>
    <Box display="flex" flexDirection="row" p= {1} height={"3rem"} justifyContent={"space-between"}>
        <Box flex={8} display={"flex"} alignItems={"center"}>
            <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
            <TextField multiline rows={1} id="standard-basic" label="What is on your mind?" variant="standard" sx={{ width: "100%", marginLeft: "10px" }} />
        </Box>

        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
        />
        <IconButton
            color="primary"
            aria-label="upload file"
            component="span"
            onClick={handleButtonClick}
        >
            <AddPhotoAlternateOutlined />
        </IconButton>
        </Box>
        <Box display={"flex"} alignItems={"center"}>
            <Button variant="contained" color="primary" onClick={handlePostClick} sx={{ textTransform: 'none', fontSize: '14px', borderRadius: '15px', height:'90%' }}>
                Post
            </Button>
        </Box>

    </Box>
    </>
  )
}

export default Post