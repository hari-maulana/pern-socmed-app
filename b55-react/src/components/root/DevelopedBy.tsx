import { Box, Icon, Link, Stack, Typography } from '@mui/material'
import { theme } from '../../Themes'
import { Facebook, GitHub, Instagram, LinkedIn } from '@mui/icons-material'

const DevelopedBy = () => {
  return (
    <>
        <Box border={"1px solid"} borderRadius={"5px"} sx={{ padding: "10px", borderColor: theme.palette.divider, marginTop: "1rem" }}>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography variant="body2" marginRight={"0.4rem"} fontWeight={"300"} color={"text.secondary"}>
            Developed by
          </Typography>
          <Typography variant="body2" marginRight={"0.4rem"}>
            Hari Maulana
          </Typography>
          <Typography variant="body2" marginRight={"0.4rem"}>
          •
          </Typography>

          <Link onClick={() => window.open("https://github.com/hari-maulana", "_blank")} sx={{textDecoration: "none", ":hover": {color: "#F6EEDF"}}}><Icon><GitHub fontSize="small" /></Icon></Link>
          <Link onClick={() => window.open("#")} sx={{textDecoration: "none", ":hover": {color: "#F6EEDF"}}}><Icon><LinkedIn fontSize="small" /></Icon></Link>
          <Link onClick={() => window.open("#")} sx={{textDecoration: "none", ":hover": {color: "#F6EEDF"}}}><Icon><Facebook fontSize="small" /></Icon></Link>
          <Link onClick={() => window.open("#")} sx={{textDecoration: "none", ":hover": {color: "#F6EEDF"}}}><Icon><Instagram fontSize="small" /></Icon></Link>
        </Stack>
        <Stack gap={"0.5rem"} direction={"row"} alignItems={"center"} flexWrap={"wrap"}>
        <Typography variant="caption" fontWeight={"300"}>
          Powered by
        </Typography>
        <Typography variant="caption" color={"orangered"} fontWeight={"bold"}>
          DumbWays
        </Typography>
        <Typography variant="caption" fontWeight={"300"}>
        Indonesia • #1 Coding Bootcamp
        </Typography>
        </Stack>
      </Box>
    </>
  )
}

export default DevelopedBy