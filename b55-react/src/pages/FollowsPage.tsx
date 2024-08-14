import { Box, Typography } from '@mui/material'
import { theme } from '../Themes'
import RightSidebar from '../components/root/RightSidebar'

const FollowsPage = () => {
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
              Title
            </Typography>
          </Box>
          Content
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

export default FollowsPage