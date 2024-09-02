import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  Button,
  CardMedia,
  IconButton,
  ListItem,
  ListItemAvatar,
  TextField,
  Typography,
} from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import { useUser } from "../../stores/UserContext";
import { theme } from "../../Themes";
import axios from "axios";
import { toast } from "react-toastify";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  px: 1,
  pb: 1,
};

interface User {
  name: string;
  profilePict?: string;
}

export default function EditProfileModal() {
  const { user, setUser } = useUser();
  const [open, setOpen] = React.useState<boolean>(false);

  const [name, setName] = React.useState<string>(user?.name || "");
  const [username, setUsername] = React.useState<string>(user?.username || "");
  const [bio, setBio] = React.useState<string>(user?.bio || "");
  const [file, setFile] = React.useState<File | null>(null);
  const [prevImage, setPrevImage] = React.useState<string | ArrayBuffer | null>(
    null
  );

  //const fileInputRef = useRef<HTMLInputElement | null>(null);

  //   const handleButtonClick = () => {
  //     fileInputRef.current?.click();
  //   };

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBio(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(name, username, bio, file);

    const token = localStorage.getItem("token");

    const postContent = async (picturePath: string) => {
        try {
            const res = await axios.put(
                `${import.meta.env.VITE_API_URL}/users/${user?.id}`,
                { name, username, bio, profilePict: picturePath },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(res.data.message);

        } catch (error) {
            toast.error("Failed to edit profile");
        }
    };

    if (file) {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const picturePath = `http://localhost:3000${res.data.filePath}`;
            toast.success(res.data.message);
            toast.success(picturePath);

            // Pass picturePath to postContent after the image is uploaded
            await postContent(picturePath);

        } catch (error) {
            toast.error("Failed to upload image");
        }
    } else {
        // If there's no file, call postContent with an empty string or a default path
        await postContent('');
    }
};

  /////////////

  return (
    <div>
      <p onClick={handleOpen}>Edit Profile</p>
      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            sx={{ height: "60px", paddingBottom: "10px" }}
          >
            <Typography id="parent-modal-title" component="h2">
              Edit Profile
            </Typography>
            <IconButton onClick={handleClose}>
              <CancelOutlined />
            </IconButton>
          </Box>
          <CardMedia
            component="img"
            height="70px"
            image="https://static.vecteezy.com/system/resources/previews/010/513/877/original/beautiful-gradient-background-in-yellow-white-and-brown-smooth-and-soft-texture-free-vector.jpg"
            sx={{
              width: "100%",
              borderRadius: "5px",
              border: "",
              marginBottom: "3rem",
            }}
          />
          <Avatar
            src={prevImage as string}
            sx={{
              width: "75px",
              height: "75px",
              position: "absolute",
              zIndex: "1",
              left: "24px",
              top: "90px",
              border: "6px solid",
              borderColor: theme.palette.background.default,
            }}
          />
          <form onSubmit={handleSubmit}>

          <input
              type="file"
              // ref={fileInputRef}
              style={{marginBottom: "1rem"}}
              onChange={handleFileChange}
            />

            <TextField
              id="outlined-basic"
              value={name}
              onChange={handleNameChange}
              label="Name"
              variant="outlined"
              sx={{ marginBottom: "1rem", width: "100%" }}
            />

            

            

            <TextField
              id="outlined-basic"
              value={username}
              onChange={handleUsernameChange}
              label="Username"
              variant="outlined"
              sx={{ marginBottom: "1rem", width: "100%" }}
            />
            <TextField
              id="outlined-basic"
              value={bio}
              multiline
              rows={4}
              onChange={handleBioChange}
              label="Bio"
              variant="outlined"
              sx={{ width: "100%" }}
            />
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button
                onClick={handleClose}
                size="small"
                variant="contained"
                type="submit"
                sx={{
                  marginLeft: "auto",
                  color: theme.palette.background.default,
                  borderRadius: "15px",
                  textTransform: "none",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
              >
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
