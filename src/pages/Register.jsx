import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Sheet,
  Typography,
} from "@mui/joy";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically send the email and password to your server
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Sheet
      sx={{
        display: "flex",
        alignItems: "center",
        minHeight: "90dvh",
        background: "transparent",
      }}
    >
      <Sheet
        sx={{
          width: 300,
          mx: "auto",
          my: 4,
          py: 3,
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
        variant="outlined"
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PersonAddIcon />
          <Typography level="h4" component="h1">
            Register
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>Firstname</FormLabel>
            <Input
              name="firstname"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Lastname</FormLabel>
            <Input
              name="lastname"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button sx={{ mt: 1 }} type="submit">
              Register
            </Button>
            <Typography sx={{ mt: 1 }} type="submit">
              <Link  style={{
                      textDecoration: "none",
                      color: "#1976d2",
                      fontWeight: "bold",
                    }} to={"/login"}>Already have an account?</Link>
            </Typography>
          </Box>
        </form>
      </Sheet>
    </Sheet>
  );
}

export default Register;
