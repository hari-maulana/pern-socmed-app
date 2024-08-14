import { Button, Typography } from '@mui/material'
import { theme } from '../../Themes';
interface CommonButtonProps {
  text: string;
}
const CommonButton: React.FC<CommonButtonProps> = ({ text }) => {
  return (
    <Button className="button" type="submit" sx={{textTransform: "none", marginTop: "20px", backgroundColor: theme.palette.primary.main, fontWeight: "bold", borderRadius: "20px", ":hover": {backgroundColor: "#F6EEDF", color: "#242a2a"}}}>
      <Typography variant='h6' sx={{color: theme.palette.background.paper}}>{text}</Typography>  </Button>
  )
};

export default CommonButton;