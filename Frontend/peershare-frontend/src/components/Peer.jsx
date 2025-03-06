import React from "react";
import { Box, styled } from "@mui/material";
import ProfileCard from "./ProfileCard";


export default function Peer() {
    
    const DrawerHeader = styled("div")(({ theme }) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
      }));

  return (
    <>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader/>
        <Box sx={{ p: 3, margin: "auto", maxWidth: "1300px" }}>
          <ProfileCard/>
        </Box>
      </Box>
      
    </>
  );
}
