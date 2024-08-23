
import { Box, Container, Typography} from "@mui/material";
import LogoBrand from "../../components/commons/LogoBrand";
import InputField from "../../components/commons/InputField";
import CommonButton from "../../components/commons/CommonButton";
import { useNavigate } from "react-router-dom";


function Reset() {

  const navigate = useNavigate();
  
  return (

    <Container sx={{ backgroundColor: "", height: "100vh" }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        
        <Container maxWidth="xs"
            sx={{ display: "flex", 
                flexDirection: "column", 
                backgroundColor: "",
                margin: "auto auto",
            }}
        >
        <LogoBrand />
        <Typography variant="h6" sx={{margin: "0 -10px 0 0"}}>Reset password</Typography>
        <InputField placeholder="New Password*" type="text" />
        <InputField placeholder="Confirm New Password*" type="password" />
        <CommonButton text="Confirm" />
        </Container>
      </Box>
    </Container>
  );
}

export default Reset;
