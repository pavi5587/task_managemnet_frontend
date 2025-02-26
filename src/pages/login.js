import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Typography, TextField, Button, Box, Paper } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LoginImg from "../assets/images/loginImg.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);
    axios
      .post("http://localhost:8000/api/login", formData)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        toast.success("Login Successfully", { position: "top-right" });
        navigate("/task");
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(err?.response?.data?.message, { position: "top-right" });
      });
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        background: "#af37f3",
        width: "100%",
        height: "100vh",
      }}
    >
      <Grid container spacing={2} sx={{ height: "99vh" }}>
        <Grid size={6} sx={{ height: "99vh" }}>
          <img src={LoginImg} height={"100%"} width={"100%"} />
        </Grid>
        <Grid size={6}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Paper
              sx={{
                width: 450,
                padding: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                marginTop: "30%",
                borderRadius: "10px",
              }}
            >
              <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
                LOGIN
              </Typography>
              <TextField
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
                sx={{ mt: 2, mb: 2 }}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2, background: "#af37f3", height: "50px" }}
                onClick={handleSubmit}
              >
                Login
              </Button>
              <Typography mt={2}>
                Don't have an account?{" "}
                <span
                  style={{
                    color: "#1976d2",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  onClick={() => navigate("/register")}
                >
                  Signup
                </span>
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
