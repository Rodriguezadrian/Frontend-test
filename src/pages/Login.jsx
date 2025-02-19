import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Sheet,
  Typography,
} from "@mui/joy";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/userSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

function Login() {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("1234");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const isAdmin = email === "admin@gmail.com";
      const url = isAdmin
        ? `${import.meta.env.VITE_API_URL}/token/admin`
        : `${import.meta.env.VITE_API_URL}/token/user`;
      const response = await axios({
        url: url,
        method: "post",
        data: { email, password },
      });

      if (response.data.token) {
        dispatch(login(response.data));
        navigate("/");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        setError(error.response.data.msg);
      } else {
        setError("An error occurred. Please try again.");
      }
      console.log(error);
    }
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
          <LockIcon />
          <Typography level="h4" component="h1">
            Sign in
          </Typography>
        </Box>
        <form onSubmit={handleLogin}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
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
              Log in
            </Button>
            <Typography sx={{ mt: 1 }} type="submit">
              <Link
                style={{
                  textDecoration: "none",
                  color: "#1976d2",
                  fontWeight: "bold",
                }}
                to={"/register"}
              >
                Not registered yet?
              </Link>
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 2,
              p: 2,
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="body1" component="p" fontWeight="bold">
              Test Users:
            </Typography>
            <Divider />
            <Typography variant="body2" component="p">
              <strong>User:</strong> test@test.com
            </Typography>
            <Typography variant="body2" component="p">
              <strong>Password:</strong> 1234
            </Typography>
            <Divider />
            <Typography variant="body2" component="p">
              <strong>Admin:</strong> admin@gmail.com
            </Typography>
            <Typography variant="body2" component="p">
              <strong>Password:</strong> 1234
            </Typography>
          </Box>
        </form>
      </Sheet>
    </Sheet>
  );
}

export default Login;
