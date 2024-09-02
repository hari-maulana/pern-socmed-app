import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import SuggestedUser from '../user/SuggestedUser';
import { CardActionArea, ImageList, Typography } from '@mui/material';
import StandardImageList from './ImageList';
import { usePost } from '../../stores/PostContext';
import { toast } from 'react-toastify';
import FeedItem from '../post/FeedItem';
import { useUser } from '../../stores/UserContext';
import { theme } from '../../Themes';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function BasicTabs() {
  const { allPost } = usePost();
  const { user } = useUser();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Posts" {...a11yProps(0)} sx={{ width: "50%" }}/>
          <Tab label="Media" {...a11yProps(1)} sx={{ width: "50%" }}/>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      <div>
        {allPost.map((singlePost: any) => (
          singlePost.author.username === user?.username ? (<div key={singlePost.id}>
            <CardActionArea onClick={() => toast.success("Wow so easy !")}>

            <FeedItem
              avatar={singlePost.author.profilePict}
              name={singlePost.author.name}
              username={singlePost.author.username}
              updatedAt={singlePost.updatedAt}
              text={singlePost.content}
              image={singlePost.picturePath}
            />
            </CardActionArea>
          </div>)
          
          
          : (
            <Typography key={singlePost.id} sx={{fontSize: "14px", color: theme.palette.text.secondary, marginTop: "1rem"}}>You can only see posts you created</Typography>
          )

        ))}
      </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <StandardImageList />
      </CustomTabPanel>
      
    </Box>
  );
}

export default BasicTabs;
