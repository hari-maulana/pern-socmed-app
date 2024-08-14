import { Box, Button, Input, TextField, Typography } from '@mui/material'
import { theme } from '../Themes'
import RightSidebar from '../components/root/RightSidebar'
import { useContext, useState } from 'react'
import { useUser } from '../stores/UserContext'
import Post from '../components/commons/Post'
import Feed from '../components/root/Feed'
//import Feed from '../components/root/Feed'





const Homepage: React.FC =  () => {
  const [count, setCount] = useState("Hello World")
  const { user } = useUser();

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
            <Typography fontSize={"1.2rem"} fontWeight={"bold"} mb={"1rem"}>
              Home
            </Typography>
            <Post />
          </Box>
          

          {/* {user ? <h1>Welcome, {user.name}!</h1> : <h1>Please log in.</h1>}
            
            <Typography>
            Huruf {count}
            </Typography>
            <button type="button" onClick={function() {
              return setCount("Sekarang ganti!")
            }}>
              Ganti
            </button> */}
            {/* <button
              type="button"
              onClick={() => setCount(count + 15)}
            >Tambah</button>
            <button
              type="button"
              onClick={() => setCount(count - 15)}
            >Kurang</button>
           */}


















          <Feed />
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

export default Homepage