import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import NoteIcon from "@mui/icons-material/Note";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import Avatar from "@mui/material/Avatar";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardMedia } from "@mui/material";
import Grid from "@mui/material/Grid";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import ProfileCard from "./ProfileCard";
import Peer from "./Peer";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: open ? drawerWidth : 0,
  width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
  Primarytransition: theme.transitions.create(["width", "margin"], {
    //change transition to primarytransition so check in future if any error occurs here.
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...((open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }) || {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Dashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const modetheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light", // Toggle between dark and light mode
    },
  });

  const colortheme = createTheme({
    palette: {
      customcolor: {
        main: "#FFFFFF",
        contrastText: "#000000",
      },
    },
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={modetheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }), // Hide menu button when drawer is open
              }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ flexGrow: 1 }} />
            <Button
              color="customcolor"
              onClick={() => {
                setDarkMode(!darkMode);
              }}
            >
              {darkMode ? <Brightness7Icon /> : <NightlightRoundIcon />}
            </Button>

            {/* Profile Picture */}
            <Avatar alt="Profile" src="" sx={{ ml: 2, cursor: "pointer" }} />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {/* This is the logic of making dashboard */}
          <List>
            {["Home", "Playlist", "Notes", "Peer", "Categories"].map((text) => (
              <ListItem key={text} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    ...(open
                      ? { justifyContent: "initial" }
                      : { justifyContent: "center" }),
                  }}
                  onClick={() => {
                    // Handle navigation based on the text
                    if (text === "Home") {
                      navigate("/");
                    }
                    if (text == "Peer") {
                      navigate("/dashboard/peer");
                    }
                  
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                      ...(open ? { mr: 3 } : { mr: "auto" }),
                    }}
                  >
                    {/* Rendering different icons based on the text */}
                    {text === "Home" && <HomeIcon />}
                    {text === "Playlist" && <PlaylistAddIcon />}
                    {text === "Notes" && <NoteIcon />}
                    {text === "Peer" && <PeopleIcon />}
                    {text === "Categories" && <CategoryIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={{ ...(open ? { opacity: 1 } : { opacity: 0 }) }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Outlet/>
      </Box>
    </ThemeProvider>
  );
}
