import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import {
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
} from "@mui/material";
import axios from "axios";
import LoginImg from "../assets/images/loginImg.jpg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    country: "",
    city: "",
    state: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    axios
      .post("http://localhost:8000/api/register", formData)
      .then((res) => {
        navigate("/login");
        toast.success("Registered Successfully", { position: "top-right" });
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message, { position: "top-right" });
        console.log("err", err);
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
                width: 800,
                padding: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                marginTop: "20%",
                borderRadius: "10px",
              }}
            >
              <Typography sx={{ fontSize: "30px", fontWeight: "bold" }}>
                REGISTER
              </Typography>
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    label="Enter Name"
                    name="name"
                    type="text"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleChange}
                    sx={{ mt: 5 }}
                  />

                  <TextField
                    label="Enter Mobile Number"
                    name="mobileNumber"
                    type="text"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleChange}
                    sx={{ mt: 5 }}
                  />
                  <TextField
                    label="Enter City Name"
                    name="city"
                    type="text"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleChange}
                    sx={{ mt: 5 }}
                  />
                  <TextField
                    label="Enter Country Name"
                    name="country"
                    type="text"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleChange}
                    sx={{ mt: 5 }}
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    label="Enter Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleChange}
                    sx={{ mt: 5 }}
                  />
                  <TextField
                    label="Enter Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleChange}
                    sx={{ mt: 5 }}
                  />
                  <TextField
                    label="Enter State Name"
                    name="state"
                    type="text"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={handleChange}
                    sx={{ mt: 5 }}
                  />
                  <FormControl sx={{ mt: 5 }}>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup
                      row
                      value={formData?.gender}
                      name="gender"
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Grid>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    mt: 2,
                    background: "#af37f3",
                    height: "50px",
                    width: "35%",
                  }}
                  onClick={handleSubmit}
                >
                  Register
                </Button>
              </div>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
