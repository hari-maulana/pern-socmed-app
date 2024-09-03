import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  ListItem,
  TextField,
} from "@mui/material";
import {
  AddPhotoAlternateOutlined,
  CancelOutlined,
  EmojiEmotionsOutlined,
  LocationOnOutlined,
} from "@mui/icons-material";
import { theme } from "../../../Themes";
import { toast } from "react-toastify";
import PostHandler from "../postHandler";
import { usePost } from "../../../stores/PostContext";

const PostModalForm = ({ handleClose }: { handleClose: () => void }) => {
  const { fetchAllPosts } = usePost();
  const [file, setFile] = useState<File | null>(null);
  const [prevImage, setPrevImage] = useState<string | ArrayBuffer | null>(null);
  const [content, setContent] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = event.target.files?.[0];
    if (targetFile) {
      setFile(targetFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPrevImage(reader.result);
      };
      reader.readAsDataURL(targetFile);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!content) {
        toast.error("Post cannot be empty");
        return;
      }
  
      await PostHandler(content, file);
      toast.success("Post has been created");
      setContent("");
      setPrevImage(null);
      setFile(null);
    } catch (error) {
      console.error(error);
      
    } finally {
      handleClose();
      fetchAllPosts()}
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
      }}
      onSubmit={onSubmit}
    >
      <Box display="flex" alignItems="center">
        <TextField
          multiline
          rows={4}
          id="standard-basic"
          label="What's happening?"
          variant="standard"
          value={content}
          sx={{ width: "100%", marginLeft: "10px" }}
          onChange={(e) => setContent(e.target.value)}
        />
      </Box>

      {prevImage && (
        <ListItem
          alignItems="flex-start"
          sx={{
            borderColor: theme.palette.divider,
            padding: 0,
            paddingBottom: "10px",
          }}
        >
          <Box width="100%">
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={() => setPrevImage(null)}>
                <CancelOutlined />
              </IconButton>
            </Box>
            <Box>
              <img
                src={prevImage as string}
                alt="Preview"
                width="100%"
                height="240px"
                style={{
                  borderRadius: "5px",
                  objectFit: "contain",
                  border: `1px solid ${theme.palette.divider}`,
                }}
              />
            </Box>
          </Box>
        </ListItem>
      )}

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
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
          <IconButton color="primary">
            <EmojiEmotionsOutlined />
          </IconButton>
          <IconButton color="primary">
            <LocationOnOutlined />
          </IconButton>
        </Box>
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
          Post
        </Button>
      </Box>
    </form>
  );
};

export default PostModalForm;

