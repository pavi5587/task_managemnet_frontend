import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTask, updateTask } from "../apiServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskForm = (props) => {
  const { status, handleClose, getTasksData, data } = props;
  console.log("data", data);
  const formattedStartDate = dayjs(data?.startDate).format("YYYY-MM-DD");
  const formattedEndDate = dayjs(data?.endDate).format("YYYY-MM-DD");
  console.log("dfdsfsd", formattedStartDate, formattedEndDate);

  const [formData, setFormData] = useState({
    name: status == "Edit" ? data.name : "",
    description: status == "Edit" ? data.description : "",
    startDate: status == "Edit" ? data.startDate : "",
    endDate: status == "Edit" ? data.endDate : "",
    totalTask: status == "Edit" ? data.totalTask : "",
    status: status == "Edit" ? data.status : "",
  });

  const [startDate, setStartDate] = useState(dayjs(formattedStartDate));
  const [endDate, setEndDate] = useState(dayjs(formattedEndDate));

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  console.log("formData", formData, startDate, endDate);

  const handleCreateTask = async (formDatas) => {
    try {
      const createdTask = await createTask(formDatas);
      console.log("createdTask", createdTask);
      toast.success("Login Successfully", { position: "top-right" });
      handleClose();
      getTasksData();
    } catch (error) {
      console.error("Failed to create task:", error);
      toast.error(error?.response?.data?.message, { position: "top-right" });
    }
  };

  const handleUpdateTask = async (taskId, formDatas) => {
    try {
      const updatedTask = await updateTask(taskId, formDatas);
      toast.success("Task Updated Successfully", { position: "top-right" });
      handleClose();
      getTasksData();
    } catch (error) {
      console.error("Failed to update task:", error);
      toast.error(error?.response?.data?.message, { position: "top-right" });
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const startDateNew = dayjs(startDate).format("DD/MM/YYYY");
    const endDateNew = dayjs(endDate).format("DD/MM/YYYY");
    const formDatas = {
      ...formData,
      startDate: startDateNew,
      endDate: endDateNew,
    };

    if (status == "Edit") {
      handleUpdateTask(data?._id, formDatas);
    } else {
      handleCreateTask(formDatas);
    }
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid size={8}>
          <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
            Add Task
          </Typography>
        </Grid>
        <Grid size={4} display={"flex"} justifyContent={"end"}>
          <CloseIcon onClick={handleClose} sx={{ cursor: "pointer" }} />
        </Grid>
      </Grid>
      <Box sx={{ flexGrow: 1, mt: 3 }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              label="Task Name"
              name="name"
              type="text"
              value={formData?.name}
              variant="outlined"
              fullWidth
              required
              onChange={handleChange}
              sx={{ mt: 5 }}
            />
            <Box sx={{ mt: 5 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                    }}
                    sx={{ width: "100%" }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <FormControl fullWidth sx={{ mt: 5 }}>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={formData.status}
                name="status"
                onChange={handleChange}
              >
                <MenuItem value={"In Progress"}>In Progress</MenuItem>
                <MenuItem value={"Completed"}>Completed</MenuItem>
                <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={6}>
            <TextField
              label="Description"
              name="description"
              type="text"
              variant="outlined"
              fullWidth
              value={formData?.description}
              required
              onChange={handleChange}
              sx={{ mt: 5 }}
            />
            <Box sx={{ mt: 5 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    sx={{ width: "100%", mt: 5 }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <TextField
              label="Task Total"
              name="totalTask"
              type="text"
              value={formData?.totalTask}
              variant="outlined"
              fullWidth
              required
              onChange={handleChange}
              sx={{ mt: 5 }}
            />
          </Grid>
        </Grid>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              mt: 5,
              width: "20%",
              height: "40px",
              backgroundColor: "#4CAF50",
              color: "white",
              "&:hover": { backgroundColor: "#45A049" },
            }}
            onClick={handleSubmit}
          >
            {status == "Edit" ? "Update" : "Save"}
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default TaskForm;
