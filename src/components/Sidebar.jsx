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

  const handleDeleteDB = async (e) => {
    try {
      setLoading(true);
      setProgress(20);
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/database/destroy`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setProgress(100);
      console.log("database erased successfully");
      setDeletedProducts(response.data);
    } catch (error) {
      setProgress(0);
      console.log(`Error erasing the database`, error);
    } finally {
      setLoading(false);
    }
  };
  const handleRunDB = async (e) => {
    try {
      setLoading(true);
      setProgress(20);
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/database/run-seeders`,
        method: "post",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setProgress(100);

      console.log("database created successfully");
    } catch (error) {
      setProgress(0);
      console.log(`Error creating the database`, error);
    } finally {
      setLoading(false);
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
        backgroundColor: "#f4f4f4",
        height: "100%",
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
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Link
          onClick={() => toggleDrawer()}
          to="/add"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem>
            <ListItemText primary="New" />
          </ListItem>
        </Link>
        <Link
          onClick={() => toggleDrawer()}
          to="/logs"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItem>
            <ListItemText primary="Logs" />
          </ListItem>
        </Link>

        <Box
          sx={{
            display: "flex",

            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <ListItem onClick={() => handleRunDB()}>
            <Button color="success">Run Database</Button>
          </ListItem>
          <ListItem onClick={() => handleDeleteDB()}>
            <Button color="danger">Delete Database</Button>
          </ListItem>
        </Box>
        {user.token ? (
          <ListItem>
            <ListItemButton>
              <LogoutIcon />
              <ListItemContent>
                <Typography onClick={handleLogout} level="title-sm">
                  Log out
                </Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem>
            <ListItemButton>
              <LoginOutlined />
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
      </List>
    </Box>
  );

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
