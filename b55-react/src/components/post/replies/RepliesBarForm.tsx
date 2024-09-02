import { Button, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { theme } from '../../../Themes';

interface Props {
  userId?: string;
  postId?: string;
}

const RepliesBarForm: React.FC<Props> = ({ userId, postId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments`, {
        content,
        userId,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'row', gap: '5px', padding: '16px', borderBottom: `1px solid ${theme.palette.divider}` }} onSubmit={handleSubmit}>
      <TextField
            variant="outlined"
            placeholder="Reply"
            value={content}
            
            onChange={(e) => setContent(e.target.value)}
            sx={{
              width: "80%",
              "& .MuiOutlinedInput-root": {
                padding: "6px 15px", // Adjust padding as needed
                backgroundColor: theme.palette.divider, // Background color
                borderRadius: "10px", // Border radius
                "& input": {
                  padding: "0 4px", // Adjust padding for input field
                },
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "green", // Focused border color
                },
              },
            }}
        
          />
      <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            textTransform: "none",
            fontSize: "14px",
            borderRadius: "15px",
            width: "75px",
          }}
        >
          Reply
        </Button>

  
    </form>
  );
};

export default RepliesBarForm;











// import React, { useRef, useState } from "react";
// import {
//   Avatar,
//   Box,
//   Button,
//   IconButton,
//   ListItem,
//   ListItemAvatar,
//   TextField,
// } from "@mui/material";
// import {
//   AddPhotoAlternateOutlined,
//   CancelOutlined,
//   EmojiEmotionsOutlined,
//   LocationOnOutlined,
// } from "@mui/icons-material";
// import { useUser } from "../../../stores/UserContext";
// import { theme } from "../../../Themes";
// import { toast } from "react-toastify";
// import PostHandler from "../postHandler";

// interface Props {
//   content?: string
//   postId?: string
// }


// const RepliesBarForm = ({content, postId}) => {
//   const { user } = useUser();
//   const [file, setFile] = useState<File | null>(null);
//   const [prevImage, setPrevImage] = useState<string | ArrayBuffer | null>(null);
//   const [content, setContent] = useState<string>("");

//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleButtonClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const targetFile = event.target.files?.[0];
//     if (targetFile) {
//       setFile(targetFile);

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPrevImage(reader.result);
//       };
//       reader.readAsDataURL(targetFile);
//     }
//   };

//   const onSubmit = async (/*e: React.FormEvent*/) => {
//     //e.preventDefault();

//     if (!content) {
//       toast.error("Replies cannot be empty");
//       return;
//     }

//     await PostHandler(content, file);
//     toast.success("Post has been created");
//     setContent("");
//     setPrevImage(null);
//     setFile(null);
//   };

//   return (
//     <form
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         gap: "5px",
//         padding: "16px",
//         borderBottom: `1px solid ${theme.palette.divider}`,
//       }}
//       onSubmit={onSubmit}
//     >
//       <Box display="flex" alignItems="center">
//         <Avatar alt="User Profile" src={user?.profilePict} />
//         <TextField
//           multiline
//           maxRows={24}
//           id="standard-basic"
//           label="What is on your mind?"
//           variant="standard"
//           value={content}
//           sx={{ width: "100%", marginLeft: "10px" }}
//           onChange={(e) => setContent(e.target.value)}
//         />
//       </Box>

//       {prevImage && (
//         <ListItem
//           alignItems="flex-start"
//           sx={{
//             borderBottom: 1,
//             borderColor: theme.palette.divider,
//             padding: 0,
//             paddingBottom: "10px",
//           }}
//         >
//           <ListItemAvatar />
//           <Box width="100%">
//             <Box display="flex" justifyContent="flex-end">
//               <IconButton onClick={() => setPrevImage(null)}>
//                 <CancelOutlined />
//               </IconButton>
//             </Box>
//             <Box>
//               <img
//                 src={prevImage as string}
//                 alt="Preview"
//                 width="100%"
//                 height="240px"
//                 style={{
//                   borderRadius: "5px",
//                   objectFit: "contain",
//                   border: `1px solid ${theme.palette.divider}`,
//                 }}
//               />
//             </Box>
//           </Box>
//         </ListItem>
//       )}

//       <Box display="flex" justifyContent="space-between" alignItems="center">
//         <Box>
//           <input
//             type="file"
//             ref={fileInputRef}
//             style={{ display: "none" }}
//             onChange={handleFileChange}
//           />
//           <IconButton
//             color="primary"
//             aria-label="upload file"
//             component="span"
//             onClick={handleButtonClick}
//           >
//             <AddPhotoAlternateOutlined />
//           </IconButton>
          
//         </Box>
//         <Button
//           variant="contained"
//           color="primary"
//           type="submit"
//           sx={{
//             textTransform: "none",
//             fontSize: "14px",
//             borderRadius: "15px",
//             width: "75px",
//           }}
//         >
//           Reply
//         </Button>
//       </Box>
//     </form>
//   );
// };

// export default RepliesBarForm;
