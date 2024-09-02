

export interface User {
    id: string;
    profilePict?: string;
    name: string;
    username: string;
    email: string;
    bio?: string;
    followers?: [];
    following?: [];
    posts?: [];
  }

export interface Post {
  id: string;
  picturePath?: string;
  content: string;
  authorId: string;
  updatedAt: string;
  likes?: [];
  comments?: [];
  author?: IAuthor
  
}

interface IAuthor {
  ProfilePict?: string;
  name: string;
  username: string;
}