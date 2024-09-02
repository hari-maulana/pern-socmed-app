import axios from "axios";
import { toast } from "react-toastify"


const PostHandler = async (content: string, file: File | null) => {
    const token = localStorage.getItem("token");
    let picturePath = "";

    const postContent = async () => {
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/posts`,
                { content, picturePath },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(res.data.message);

        } catch (error) {
            toast.error("Failed to post");
        }
    };

    if (file) {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/upload`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            picturePath = `http://localhost:3000${res.data.filePath}`;
            toast.success(res.data.message);
            toast.success(picturePath);

            await postContent();
        } catch (error) {
            toast.error("Failed to upload image");
        }
    } else {
        await postContent();
    }
};

export default PostHandler;
