import React from "react";
import { Typography, Box } from "@mui/joy";
import { keyframes } from "@emotion/react";

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

function TitleApp() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 7,
        marginTop:15,
        padding: "2rem",
        background: "linear-gradient(45deg, #6a11cb 0%, #2575fc 100%)",
        borderRadius: "15px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
      }}
    >
      <Typography
        level="h1"
        sx={{
          fontSize: { xs: "2.5rem", md: "3.5rem" },
          fontWeight: "bold",
          color: "white",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          letterSpacing: "0.1em",
          marginBottom: "0.5rem",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        CellZone
      </Typography>
      <Typography
        level="h2"
        sx={{
          fontSize: { xs: "1rem", md: "1.25rem" },
          color: "rgba(255,255,255,0.8)",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          background: "linear-gradient(to right, #f6d365 0%, #fda085 100%)",
          backgroundClip: "text",
          textFillColor: "transparent",
          animation: `${shimmer} 5s infinite linear`,
          backgroundSize: "1000px 100%",
          marginTop: "0.5rem",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        Discover Your Perfect Device
      </Typography>
    </Box>
  );
}

export default TitleApp;
