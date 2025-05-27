import { Box, styled } from "@mui/material";
import ProfileCard from "./ProfileCard";


export default function Peer() {

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ p: 3, margin: "auto", maxWidth: "1300px" }}>
          <ProfileCard/>
        </Box>
      </Box>
      
    </>
  );
}
