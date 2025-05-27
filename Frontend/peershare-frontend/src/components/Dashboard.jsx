import { useState, useEffect } from "react";
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
   useMediaQuery,
   Button,
} from "@mui/material";
import { styled, useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PeopleIcon from "@mui/icons-material/People";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import { Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import AddBoxIcon from "@mui/icons-material/AddBox";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { MdHowToVote } from "react-icons/md";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { toast } from "react-toastify";

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
   const location = useLocation();
   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
   const [mobileOpen, setMobileOpen] = useState(false);
   const [darkMode, setDarkMode] = useState(false);
   const [activePath, setActivePath] = useState("");

   const modetheme = createTheme({
      palette: {
         mode: darkMode ? "dark" : "light",
      },
   });

   useEffect(() => {
      // Update active path when location changes
      setActivePath(location.pathname);
   }, [location]);

   const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
   };

   const menuItems = [
      { text: "Home", path: "/", icon: <HomeIcon /> },
      { text: "Playlist", path: "/dashboard/playlist", icon: <PlaylistAddIcon /> },
      { text: "Peer", path: "/dashboard/peer", icon: <PeopleIcon /> },
      { text: "My playlists", path: "/dashboard/my-playlists", icon: <CollectionsBookmarkIcon /> },
      {
         text: "Top Voted Playlists",
         path: "/dashboard/top-voted-playlist",
         icon: <MdHowToVote className="text-2xl scale-125" />,
      },
      { text: "Contribute Playlist", path: "/dashboard/contribute-playlist", icon: <AddBoxIcon /> },
      { text: "AI Summarizer", path: "/dashboard/ai-summarizer", icon: <AutoAwesomeIcon /> },
   ];

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
            {menuItems.map((item) => (
               <ListItem key={item.text} disablePadding>
                  <ListItemButton
                     selected={activePath === item.path}
                     onClick={() => {
                        navigate(item.path);
                        if (isMobile) setMobileOpen(false);
                     }}
                     sx={{
                        "&.Mui-selected": {
                           backgroundColor:
                              theme.palette.mode === "dark"
                                 ? theme.palette.primary.dark
                                 : theme.palette.primary.light,
                           color: theme.palette.primary.contrastText,
                           "&:hover": {
                              backgroundColor:
                                 theme.palette.mode === "dark"
                                    ? theme.palette.primary.dark
                                    : theme.palette.primary.light,
                           },
                        },
                     }}>
                     <ListItemIcon
                        sx={{ color: activePath === item.path ? theme.palette.primary.contrastText : "inherit" }}>
                        {item.icon}
                     </ListItemIcon>
                     <ListItemText primary={item.text} />
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
      toast.success("Logout successful");
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
                  {localStorage.getItem("profilePhoto").length === 0 ? (
                     <AccountCircleIcon
                        sx={{ ml: 2 }}
                        className="cursor-pointer scale-150"
                        onClick={() => navigate(`profile/${localStorage.getItem("rollNo")}`)}
                     />
                  ) : (
                     <img
                        src={`${localStorage.getItem("profilePhoto")}`}
                        className="cursor-pointer w-10 h-10 overflow-hidden rounded-full border-2 border-white"
                        onClick={() => navigate(`profile/${localStorage.getItem("rollNo")}`)}
                     />
                  )}
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
