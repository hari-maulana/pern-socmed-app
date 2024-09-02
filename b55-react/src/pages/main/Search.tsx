import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { theme } from "../../Themes";
import RightSidebar from "../../components/root/RightSidebar";
import UserList from "../../components/user/UserList";
import { PersonSearch } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import UserBar from "../../components/user/UserBar";

const Search = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const fetchSearchResult = async () => {
    if (!search) {
      setResults([]); // Clear results if search is empty
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/search/`, { query: search });
      setResults(response.data); // Save the results in state
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSearchResult();
  }, [search]);
  

  return (
    <>
      {/* Left Sidebar */}
      <Box
        bgcolor=""
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          maxHeight: "100vh",
          width: "50%",
          margin: "0 16px",
          borderLeft: "1px solid",
          borderRight: "1px solid",
          borderColor: theme.palette.divider,
          scrollbarWidth: "none", // Hide scrollbar for Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Hide scrollbar for Chrome, Safari, and Opera
          },
        }}
      >
        <Box
          position="sticky"
          top="0px"
          sx={{
            backgroundColor: theme.palette.background.default,
            zIndex: 1,
            padding: "1rem",
            width: "100%",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: "6px 15px", // Adjust padding as needed
                backgroundColor: theme.palette.divider, // Background color
                borderRadius: "10px", // Border radius
                "& input": {
                  padding: "0 4px", // Adjust padding for input field
                },
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "green", // Focused border color
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonSearch />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {results.length > 0 ? (
          <div>
            <Typography mb={2}>Search Results:</Typography>
            {results.map((user: any) => (

              <div key={user.id}>

                  <UserBar id={user.id} avatar={user.profilePict} name={user.name} username={user.username} status={user.bio}/>
              

              </div>
            ))}

          </div>
        ) : (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ height: "100vh", paddingTop: "100px" }}
          >
            <Box textAlign="center" sx={{ width: "50%" }}>
              <Typography>No result for "{search}"</Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                Try searching for something else or start a new search
              </Typography>
            </Box>
          </Box>
        )}
      </Box>

      {/* Right Sidebar */}
      <RightSidebar />
    </>
  );
};

export default Search;
