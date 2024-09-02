import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import { Post } from './types'; // Assuming you have a types file

interface PostContextType {
    post: Post | null;
    setPost: (post: Post | null) => void;
    allPost: Post[];
    setAllPost: (allPost: Post[]) => void;
    fetchAllPosts: () => Promise<void>;
}

const postContext = createContext<PostContextType | null>(null);

interface PostProviderProps {
    children: ReactNode;
}

const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
    const [post, setPost] = useState<Post | null>(null);
    const [allPost, setAllPost] = useState<Post[]>([]);


    // const fetchAllPost = async () => {
    //     const token = localStorage.getItem("token");
    //     try {
    //       const response = await axios.get(
    //         `${import.meta.env.VITE_API_URL}/posts`,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         }
    //       );
    //       const sortedPosts = response.data.sort(
    //         (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    //       );
    //       setAllPost(sortedPosts);
    //     } catch (error) {
    //       console.error("Error fetching post data:", error);
    //     }
    //   };

    // Function to fetch all posts
    const fetchAllPosts = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const sortedPosts = response.data.sort(
                (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
              );
            setAllPost(sortedPosts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    return (
        <postContext.Provider value={{ post, setPost, allPost, setAllPost, fetchAllPosts }}>
            {children}
        </postContext.Provider>
    );
};

const usePost = () => {
    const context = useContext(postContext);
    if (!context) {
        throw new Error('usePost must be used within a PostProvider');
    }
    return context;
};

export { PostProvider, usePost };
