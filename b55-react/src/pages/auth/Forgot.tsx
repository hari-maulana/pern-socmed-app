
import { Box, Container, Typography, Link } from "@mui/material";
import LogoBrand from "../../components/commons/LogoBrand";
import InputField from "../../components/commons/InputField";
import CommonButton from "../../components/commons/CommonButton";
import { useNavigate } from "react-router-dom";


function Forgot() {
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
        <Typography variant="h6" sx={{margin: "0 -10px 0 0"}}>Forgot password</Typography>
        <InputField placeholder="Email*" type="email" value={""} onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
            throw new Error("Function not implemented.");
          } } />
        <Typography variant="h6" sx={{margin: "15px 0"}}>Already have an account? <Link onClick={() => navigate("/auth/login")} sx={{color: "FFD31D", textDecoration: "none", ":hover": {color: "#F6EEDF", cursor: "pointer"}}}>Login</Link></Typography>
        <CommonButton text="Confirm" />
        </Container>
      </Box>
    </Container>
  );
}

export default Forgot;
