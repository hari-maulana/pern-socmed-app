import axios from "axios";
import { usePost } from "../../stores/PostContext";

export const useFetchAllPosts = () => {
  const { setAllPost } = usePost();

  const fetchAllPost = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAllPost(response.data);
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  return { fetchAllPost };
};
