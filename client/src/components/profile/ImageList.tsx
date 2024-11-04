import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useUser } from '../../stores/UserContext';

function StandardImageList() {
  const { user } = useUser();

  // Filter out posts that don't have a picturePath
  const picturePaths = (user?.posts as { picturePath: string }[]).filter(post => post.picturePath) || [];

  return (
    <ImageList sx={{ width: "100%", height: "100%", position: "sticky" }} cols={3} rowHeight={164}>
      {picturePaths.map((post, index) => (
        <ImageListItem key={index}>
          <img
            srcSet={`${post.picturePath}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${post.picturePath}?w=164&h=164&fit=crop&auto=format`}
            alt={`Post image ${index}`}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default StandardImageList;
