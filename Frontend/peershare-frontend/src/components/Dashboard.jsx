import { useState } from "react";
import {
   Box,
   CssBaseline,
   AppBar as MuiAppBar,
   Toolbar,
   IconButton,
   Drawer,
   List,
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   Divider,
   Avatar,
   useMediaQuery,
   Button,
} from "@mui/material";
import { styled, useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import NoteIcon from "@mui/icons-material/Note";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";



const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
   shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
   zIndex: theme.zIndex.drawer + 1,
}));

const DrawerHeader = styled("div")(({ theme }) => ({
   display: "flex",
   alignItems: "center",
   justifyContent: "space-between",
   padding: theme.spacing(0, 2),
   ...theme.mixins.toolbar,
}));

export default function Dashboard() {
   const theme = useTheme();
   const navigate = useNavigate();
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
   const [mobileOpen, setMobileOpen] = useState(false);
   const [darkMode, setDarkMode] = useState(false);

   const modetheme = createTheme({
      palette: {
         mode: darkMode ? "dark" : "light",
      },
   });

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   const drawerContent = (
      <>
         <DrawerHeader>
            <Box component="span" fontWeight="bold">
               Menu
            </Box>
            <IconButton onClick={handleDrawerToggle}>
               {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
         </DrawerHeader>
         <Divider />
         <List>
            {["Home", "Playlist", "Peer","My playlists" ].map((text) => (
               <ListItem key={text} disablePadding>
                  <ListItemButton
                     onClick={() => {
                        if (text === "Home") navigate("/");
                        if (text === "Peer") navigate("/dashboard/peer");
                        if (text === "Playlist") navigate("/dashboard/playlist");
                        if (text === "My playlists") navigate("/dashboard/my-playlists");
                     }}>
                     <ListItemIcon>
                        {text === "Home" && <HomeIcon />}
                        {text === "Playlist" && <PlaylistAddIcon />}
                        {text === "Peer" && <PeopleIcon />}
                        {text=="My playlists" && <CollectionsBookmarkIcon/>}
                     </ListItemIcon>
                     <ListItemText primary={text} />
                  </ListItemButton>
               </ListItem>
            ))}
         </List>
      </>
   );

   const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("rollNo");
      localStorage.removeItem("firstName");
      localStorage.removeItem("lastName");
      navigate("/");
      alert("Logout successful");
   }; 

   return (
      <ThemeProvider theme={modetheme}>
         <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed">
               <Toolbar>
                  <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                     <MenuIcon />
                  </IconButton>

                  <Box sx={{ flexGrow: 1 }} />

                  <Button color="inherit" onClick={() => setDarkMode(!darkMode)}>
                     {darkMode ? <Brightness7Icon /> : <NightlightRoundIcon />}
                  </Button>
                  <Button color="inherit" onClick={() => logout(!darkMode)}>
                     Logout
                  </Button>
                  <Avatar sx={{ ml: 2 }} />
               </Toolbar>
            </AppBar>

            {/* Drawer for Desktop and Mobile */}
            <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="menu">
               <Drawer
                  variant={isMobile ? "temporary" : "permanent"}
                  open={isMobile ? mobileOpen : true}
                  onClose={handleDrawerToggle}
                  ModalProps={{
                     keepMounted: true,
                  }}
                  sx={{
                     "& .MuiDrawer-paper": {
                        width: drawerWidth,
                     },
                  }}>
                  {drawerContent}
               </Drawer>
            </Box>

            {/* Main Content */}
            <Box
               component="main"
               sx={{
                  flexGrow: 1,
                  p: 3,
                  width: { sm: `calc(100% - ${drawerWidth}px)` },
               }}>
               <DrawerHeader />
               {localStorage.getItem("token") ? <Outlet /> : <Navigate to="/sign-in" replace />}
            </Box>
         </Box>
      </ThemeProvider>
   );
}
