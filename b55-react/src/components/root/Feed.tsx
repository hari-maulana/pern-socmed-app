import FeedItem from "../post/FeedItem";
import { usePost } from "../../stores/PostContext";
import { useEffect } from "react";

const Feed = () => {
  const { allPost, fetchAllPosts } = usePost();

  useEffect(() => {
    fetchAllPosts();
  }, []);



  return (
    <>
      <div>
        {allPost.map((singlePost: any) => (
          
          <div key={singlePost.id}>

            <FeedItem
              id={singlePost.id}
              avatar={singlePost.author.profilePict}
              name={singlePost.author.name}
              username={singlePost.author.username}
              updatedAt={singlePost.updatedAt}
              text={singlePost.content}
              image={singlePost.picturePath}
              like={singlePost.likes}
              comment={singlePost.comments.length}
            />
          </div>

        ))}
      </div>

      <FeedItem
        avatar="https://randomuser.me/api/portraits/women/17.jpg"
        name="John Doe"
        username="johndoe"
        updatedAt="2024-08-16T15:41:51.649Z"
        text="This is a test post"
        image="https://storyblok-image.ef.com/unsafe/1200x600/filters:focal(597x227:598x228):quality(90)/f/60990/1200x666/021de58ca1/persons-atau-people.png"
      />
    </>
  );
};

export default Feed;
