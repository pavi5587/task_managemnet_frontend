import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../apiServices";
import LoginImg from "../assets/images/loginImg.jpg";
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
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles({
  container: {
    flexGrow: 1,
    background: "#af37f3",
    width: "100%",
    height: "100vh",
  },
  gridContainer: {
    height: "99vh",
  },
  registerBox: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  registerContainer: {
    width: 500,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
    marginTop: "8%",
    borderRadius: "10px !important",
  },
  registerTitle: {
    fontSize: "30px !important",
    fontWeight: "bold !important",
  },
  registerButton: {
    marginTop: "25px !important",
    background: "#af37f3 !important",
    height: "50px !important",
    width: "100% !important",
  },
  registerButtonContainer: {
    width: "100% !important",
    display: "flex !important",
    justifyContent: "center !important",
    alignItems: "center !important",
  },
  textField: {
    marginTop: "20px !important",
  },
  Radio: {
    textAlign: "left",
    width: "100%",
    marginTop: "15px !important",
  },
});

const Register = () => {
  const classes = useStyles();
  const navigate = useNavigate();
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

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const postRegisterData = async (formData) => {
    try {
      const data = await register(formData);
      navigate("/login");
      toast.success("Registered Successfully", { position: "top-right" });
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      toast.error(error?.response?.data?.message, { position: "top-right" });
    }
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    postRegisterData(formData);
  };

  return (
    <Box className={classes.container}>
      <Grid container spacing={2} className={classes.gridContainer}>
        <Grid size={6} className={classes.gridContainer}>
          <img src={LoginImg} height={"100%"} width={"100%"} />
        </Grid>
        <Grid size={6}>
          <Box className={classes.registerBox}>
            <Paper className={classes.registerContainer}>
              <Typography className={classes.registerTitle}>
                REGISTER
              </Typography>

              <TextField
                label="Enter Name"
                name="name"
                type="text"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
                className={classes.textField}
              />
              <TextField
                label="Enter Email"
                name="email"
                type="email"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
                className={classes.textField}
              />
              <TextField
                label="Enter Mobile Number"
                name="mobileNumber"
                type="text"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
                className={classes.textField}
              />
              <TextField
                label="Enter Password"
                name="password"
                type="password"
                variant="outlined"
                fullWidth
                required
                onChange={handleChange}
                className={classes.textField}
              />
              <TextField
                label="Enter City Name"
                name="city"
                type="text"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                className={classes.textField}
              />
              <TextField
                label="Enter State Name"
                name="state"
                type="text"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                className={classes.textField}
              />
              <TextField
                label="Enter Country Name"
                name="country"
                type="text"
                variant="outlined"
                fullWidth
                onChange={handleChange}
                className={classes.textField}
              />

              <FormControl className={classes.Radio}>
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

              <div className={classes.registerButtonContainer}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  className={classes.registerButton}
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
