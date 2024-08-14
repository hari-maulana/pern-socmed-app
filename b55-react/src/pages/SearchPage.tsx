import { Box, Button, Typography } from '@mui/material'
import { theme } from '../Themes'
import RightSidebar from '../components/root/RightSidebar'
import React, { useState } from 'react';
import SearchBar from '../components/commons/SearchBar';
import UserBar from '../components/commons/UserBar';
import UserList from '../components/commons/UserList';

const users = [
  { username: 'john_doe' },
  { username: 'jane_smith' },
  { username: 'alex_jones' },
  { username: 'chris_evans' },
  // Add more users as needed
];





const SearchPage: React.FC = () => {

  return (
    <>
     <Box flex={4} bgcolor={""} style={{ height: "200vh" }}>
          <Box
            position={"sticky"}
            top={"0px"}
            sx={{
              backgroundColor: theme.palette.background.default,
              marginTop: "0",
              zIndex: "1",
              padding: "1rem",
              borderBottom: "1px solid",
              borderColor: theme.palette.divider,
              width: "100",
            }}
          >
            <Typography fontSize={"1.2rem"} fontWeight={"bold"}>
            <SearchBar users={users} />
            </Typography>
          </Box>
            
          <UserList />
          
          




        </Box>
            {/*  */}
        <Box flex={3} bgcolor={""}>
          <Box
            position={"sticky"}
            top={"0px"}
            sx={{
              backgroundColor: "",
              marginTop: "0",
              zIndex: "1",
              width: "100",
              height: "100vh",
              borderLeft: "1px solid",
              borderColor: theme.palette.divider,
              paddingTop: "1rem",
              paddingLeft: "2rem",
              paddingRight: "2rem",
            }}
          >
            <RightSidebar />
          </Box>
        </Box>
    </>
  )
}

export default SearchPage