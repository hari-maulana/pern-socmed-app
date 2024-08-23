import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Post } from './types';



interface PostContextType {
    post: Post | null;
    setPost: (post: Post | null) => void;
    allPost: Post[];
    setAllPost: (allPost: Post[]) => void;
}

const postContext = createContext<PostContextType | null>(null);

interface PostProviderProps {
    children: ReactNode;
}

const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
    const [post, setPost] = useState<Post | null>(null);
    const [allPost, setAllPost] = useState<Post[]>([]);
    return (
        <postContext.Provider value={{ post, setPost, allPost, setAllPost }}>
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

