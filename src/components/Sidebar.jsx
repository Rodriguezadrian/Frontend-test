import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  LinearProgress,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Button, ListItemButton, ListItemContent } from "@mui/joy";
import { Link } from "react-router-dom";
import { logout } from "../redux/userSlice";
import { resetInfo } from "../redux/logsSlice";
import axios from "axios";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deletedProducts, setDeletedProducts] = useState([]);
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleDeleteDB = async () => {
    try {
      setLoading(true);
      setProgress(0);

      const interval = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 90) {
            clearInterval(interval);
            return 90;
          }
          return Math.min(oldProgress + 10, 90);
        });
      }, 500);

      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/database/destroy`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      clearInterval(interval);
      setProgress(100);
      console.log("Database erased successfully");
      setDeletedProducts(response.data);
    } catch (error) {
      setProgress(0);
      console.log(`Error erasing the database`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleRunDB = async () => {
    try {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/database/run-seeders`,
        method: "post",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log("Database created successfully");
    } catch (error) {
      console.log(`Error creating the database`, error);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      dispatch(logout());
      dispatch(resetInfo());
    } catch (error) {
      console.log(error);
    }
  };

  const drawer = (
    <Box
      sx={{
        width: 250,
        padding: 2,
        backgroundColor: "#bdb3ff",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <List>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link
          onClick={() => toggleDrawer()}
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem>
            <ListItemText>
              <Button className="button-navbar">Home</Button>
            </ListItemText>
          </ListItem>
        </Link>
        <Link
          onClick={() => toggleDrawer()}
          to="/add"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem>
            <ListItemText>
              <Button className="button-navbar">New Cell</Button>
            </ListItemText>
          </ListItem>
        </Link>
        <Link
          onClick={() => toggleDrawer()}
          to="/logs"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem>
            <ListItemText>
              <Button className="button-navbar">Logs</Button>
            </ListItemText>
          </ListItem>
        </Link>
      </List>
      <Box>
        <List>
          <ListItem onClick={() => handleRunDB()}>
            <Button color="success">Run Database</Button>
          </ListItem>
          <ListItem onClick={() => handleDeleteDB()}>
            <Button color="danger">Delete Database</Button>
          </ListItem>
          {loading && (
            <ListItem>
              <Box
                sx={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                <Box sx={{ width: "100%", mr: 1 }}>
                  <LinearProgress variant="determinate" value={progress} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >{`${Math.round(progress)}%`}</Typography>
                </Box>
              </Box>
            </ListItem>
          )}
        </List>
        {user.token ? (
          <ListItem>
            <ListItemContent>
              <Button className="logout-button" onClick={handleLogout}>
                <LogoutIcon />
                Log out
              </Button>
            </ListItemContent>
          </ListItem>
        ) : (
          <ListItem>
            <ListItemButton>
              <ListItemContent>
                <Typography level="title-sm">
                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    to={"/login"}
                  >
                    Login
                  </Link>
                </Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        )}
      </Box>
    </Box>
  );

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background:"#6c36f1" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">CellZone</Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        onClose={toggleDrawer}
        anchor="left"
        sx={{ width: 250, flexShrink: 0 }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
