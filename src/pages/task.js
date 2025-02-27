import React, { useState, useEffect } from "react";
import TaskForm from "../components/taskForm";
import { getTasks, deleteTask, getSearchTasks } from "../apiServices";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Modal,
  TablePagination,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";

const useStyles = makeStyles({
  container: {
    margin: "80px !important",
  },
  taskTitle: {
    fontSize: "25px !important",
    fontWeight: "bold !important",
    textAlign: "left !important",
  },
  createTaskButton: {
    width: "100% !important",
    height: "55px !important",
    backgroundColor: "#2196F3 !important",
    color: "white !important",
    "&:hover": { backgroundColor: "#1976D2" },
  },
  tableContainer: {
    width: "100% !important",
    overflow: "hidden !important",
    marginTop: "40px !important",
  },
  tableHead: { background: "#af37f3 !important", color: "white !important" },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    height: "40px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Task = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tasks, setTasks] = useState([]);
  const [editTaskData, setEditTaskData] = useState([]);

  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);

    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const getTasksData = async () => {
    try {
      const data = await getTasks(page + 1, rowsPerPage);
      setTasks(data);
    } catch (error) {
      toast.error(error?.response?.data?.message, { position: "top-right" });
    }
  };

  const getSearchTaskData = async (name) => {
    try {
      const data = await getSearchTasks(name, page, rowsPerPage);
      setTasks(data);
    } catch (error) {
      toast.error(error?.response?.data?.message, { position: "top-right" });
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      toast.success("Task Deleted Successfully", { position: "top-right" });
      getTasksData();
    } catch (error) {
      toast.error(error?.response?.data?.message, { position: "top-right" });
    }
  };

  useEffect(() => {
    getTasksData();
  }, [page, rowsPerPage]);

  const handleEditTask = (task) => {
    setEditTaskData(task);
    handleOpenEdit();
  };
  console.log("search", search);
  return (
    <div className={classes.container}>
      <Grid container spacing={2}>
        <Grid size={8}>
          <Typography className={classes.taskTitle}>Task List</Typography>
        </Grid>
        <Grid size={2.5}>
          <TextField
            label="Search name or status"
            variant="outlined"
            fullWidth
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              getSearchTaskData(e.target.value);
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>
        <Grid size={1.5}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenAdd}
            className={classes.createTaskButton}
          >
            Create Task
          </Button>
          <Modal open={openAdd} onClose={handleCloseAdd}>
            <TaskForm
              handleClose={handleCloseAdd}
              getTasksData={getTasksData}
              status="Add"
            />
          </Modal>
        </Grid>
      </Grid>
      <Paper className={classes.tableContainer}>
        <TableContainer>
          <Table>
            <TableHead className={classes.tableHead}>
              <TableRow>
                <StyledTableCell>S.No</StyledTableCell>
                <StyledTableCell>Task Name</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Start Date</StyledTableCell>
                <StyledTableCell>End Date</StyledTableCell>
                <StyledTableCell>Total task</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks?.task?.map((row, index) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>{index + 1}</StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.description}</StyledTableCell>
                  <StyledTableCell>
                    {dayjs(row.startDate).format("DD/MM/YYYY")}
                  </StyledTableCell>
                  <StyledTableCell>
                    {dayjs(row.endDate).format("DD/MM/YYYY")}
                  </StyledTableCell>
                  <StyledTableCell>{row.totalTask}</StyledTableCell>
                  <StyledTableCell>{row.status}</StyledTableCell>
                  <StyledTableCell>
                    <Button onClick={() => handleEditTask(row)}>
                      <EditIcon sx={{ color: "blue" }} />
                    </Button>

                    <Button onClick={() => handleDeleteTask(row._id)}>
                      <DeleteIcon sx={{ color: "red" }} />
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal open={openEdit} onClose={handleCloseEdit}>
          <TaskForm
            handleClose={handleCloseEdit}
            getTasksData={getTasksData}
            status="Edit"
            data={editTaskData}
          />
        </Modal>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={tasks?.totalTask}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default Task;
