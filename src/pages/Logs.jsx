import React, { useEffect, useState } from "react";
import {
  Sheet,
  Typography,
  List,
  ListItem,
  ListItemContent,
  Box,
} from "@mui/joy";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Sidebar from "../components/Sidebar";

function Logs() {
  const logs = useSelector((state) => state.logs);

  return (
    <>
      <Sidebar />
      <Sheet
        sx={{
          maxWidth: 800,
          margin: "auto",
          mt: 12,
          p: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
      >
        <Typography level="h4" component="h1" sx={{ mb: 2 }}>
          Registry of removed cellphones
        </Typography>
        {logs.length > 0 ? (
          <List>
            {logs.map((product) => (
              <ListItem key={product.id}>
                <ListItemContent>
                  <Typography level="body1">
                    {product.name} - Deleted at:{" "}
                    {new Date(product.updatedAt).toLocaleString()}
                  </Typography>
                </ListItemContent>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No deleted products yet</Typography>
        )}

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ArrowBackIcon />
          <Link style={{ textDecoration: "none" }} to={"/"}>
            Back
          </Link>
        </Box>
      </Sheet>
    </>
  );
}

export default Logs;
