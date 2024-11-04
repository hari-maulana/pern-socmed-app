import { Box, IconButton, Typography } from "@mui/material";
import { theme } from "../../../Themes";
import RightSidebar from "../../root/RightSidebar";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import FeedItem from "../FeedItem";
import axios from "axios";
import { useEffect, useState } from "react";
import Replies from "../replies/Replies";
import RepliesBarForm from "../replies/RepliesBarForm";
import { useUser} from "../../../stores/UserContext";

const PostDetailPage = () => {

  const { user } = useUser();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<any>(null); // Adjust the type according to your post structure

  const fetchPostById = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/${id}`
      );
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  useEffect(() => {
    fetchPostById();
  }, [id]); // Add `id` as a dependency so it refetches if the id changes

  if (!post) return <div>Loading...</div>;
  return (
    <>
      {/* LeftSidebar */}
      <Box
        bgcolor={""}
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          maxHeight: "100vh",
          width: "50%",
          margin: "0 16px 0 16px",
          borderLeft: "1px solid",
          borderRight: "1px solid",
          borderColor: theme.palette.divider,
          scrollbarWidth: "none", // Hide scrollbar for Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for Chrome, Safari, and Opera
          },
        }}
      >
        <Box
          position={"sticky"}
          top={"0px"}
          sx={{
            backgroundColor: theme.palette.background.default,
            margin: "0",
            zIndex: "1",
            padding: "1rem",
            borderBottom: "1px solid",
            borderColor: theme.palette.divider,
            width: "100%",
            top: 0,
          }}
        >
          <Box display={"flex"} alignItems={"center"}>
            <IconButton onClick={() => navigate("/")}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6" fontWeight={"bold"}>
              Status
            </Typography>
          </Box>
        </Box>

        <FeedItem
          avatar={post.author.profilePict}
          name={post.author.name}
          username={post.author.username}
          updatedAt={post.updatedAt}
          text={post.content}
          image={post.picturePath}
          like={post.likes.length}
          comment={post.comments.length}
        />
        <RepliesBarForm postId={post.id} userId={user?.id} />
        {
          <div>
          {post.comments
            .slice()
            .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((replies: any) => (
              <div key={replies.id}>
                <Replies
                  id={replies.id}
                  content={replies.content}
                  createdAt={replies.createdAt}
                />
              </div>
            ))}
        </div>
        
        }
        
      </Box>

      {/* RightSidebar */}
      <RightSidebar />
    </>
  );
};

export default PostDetailPage;
