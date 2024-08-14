import { Typography } from '@mui/material'
import { theme } from '../../Themes'

const LogoBrand = () => {
  return (
    <>
        <Typography fontSize={"40px"} fontFamily={"arial"} sx={{margin: "0", padding: "0", color: theme.palette.text.secondary}}>
        hexag<span style={{color: theme.palette.primary.main}}>⬡</span>n
        </Typography>
    </>
  )
}

export default LogoBrand