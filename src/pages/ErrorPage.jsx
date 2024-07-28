import React from "react";
import { Box, Typography, Button } from "@mui/joy";
import { Link } from "react-router-dom";

const ErrorPage = ({ message = "Sorry, we couldn't find that page!" }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f0f0f0",
        padding: 3,
      }}
    >
      <img
        src="https://img.freepik.com/vector-gratis/gradiente-pop-up-ui-ux-design_23-2149104851.jpg?t=st=1722186034~exp=1722189634~hmac=dde569b0f9769c464cc1f917ca48c641c7254b907dd2eb9f61f6441bee56483a&w=826"
        alt="404 error"
        style={{
          width: "550px",
          height: "550px",
          marginBottom: "20px",
          borderRadius: 10,
        }}
      />
      <Typography
        level="h1"
        fontSize="3rem"
        fontWeight="bold"
        color="primary"
        mb={2}
      >
        404
      </Typography>
      <Typography level="h2" fontSize="2rem" mb={3}>
        {message}
      </Typography>
      <Typography level="body1" fontSize="1.2rem" mb={3}>
        It seems like the page you're looking for is out of range. Please check
        the URL or go back to the homepage.
      </Typography>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Button variant="solid" color="primary">
          Go to Home
        </Button>
      </Link>
    </Box>
  );
};

export default ErrorPage;
