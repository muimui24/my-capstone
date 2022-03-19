import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SearchIcon from "@mui/icons-material/Search";
import { signIn, signOut, useSession } from "next-auth/react";
import { user, FormData } from "../models/userModel";
import { useState } from "react";
import { GetServerSideProps } from "next";
import * as userController from "../controller/usersController";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#607d8b",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomizedTables({ users }: user) {
  function onEdit(user: any) {
    setForm({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      middleName: user.middleName,
      contactNumber: user.contactNumber,
      role: user.role,
      userName: user.userName,
      password: user.password,
    });
    handleClickOpen();
  }
  const [form, setForm] = useState<FormData>({
    id: 0,
    firstName: "",
    lastName: "",
    middleName: "",
    contactNumber: "",
    role: "",
    userName: "",
    password: "",
  });

  const handleSubmit = (data: FormData) => {
    try {
      if (data.id) {
        userController.updateBook(data.id, data);
      } else {
        userController.create(data);
      }
      handleClose();
      setForm({
        id: 0,
        firstName: "",
        lastName: "",
        middleName: "",
        contactNumber: "",
        role: "",
        userName: "",
        password: "",
      });
      refreshData();
    } catch (error) {
      console.log(error);
    }
  };
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { data: session, status } = useSession();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  if (status === "loading") {
    return <h1>loading</h1>;
  }
  if (session == undefined) {
    signIn();
  }

  const deleteBook = (id: number) => {
    userController.deleteBook(id);
    refreshData();
  };
  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Users Management</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="fname"
            label="First Name"
            type="text"
            fullWidth
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="mname"
            label="Middle Name"
            type="text"
            fullWidth
            value={form.middleName}
            onChange={(e) => setForm({ ...form, middleName: e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="lname"
            label="Last Name"
            type="text"
            fullWidth
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="pnumber"
            label="Phone Number"
            type="text"
            fullWidth
            value={form.contactNumber}
            onChange={(e) =>
              setForm({ ...form, contactNumber: e.target.value })
            }
          />
          <TextField
            autoFocus
            margin="dense"
            id="role"
            label="Role"
            type="text"
            fullWidth
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="uname"
            label="User Name"
            type="text"
            fullWidth
            value={form.userName}
            onChange={(e) => setForm({ ...form, userName: e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              {
                handleSubmit(form);
              }
            }}
          >
            SUBMIT
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <h2>E-BOOKS</h2>
      <Button
        variant="outlined"
        startIcon={<AddCircleIcon />}
        sx={{ m: "6px" }}
        onClick={handleClickOpen}
      >
        ADD BOOK
      </Button>
      <Button variant="outlined" startIcon={<SearchIcon />} sx={{ m: "6px" }}>
        Search BOOK
      </Button>
      <Divider />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Action</StyledTableCell>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="right">First Name</StyledTableCell>
              <StyledTableCell align="right">Middle Name</StyledTableCell>

              <StyledTableCell align="right">Last Name</StyledTableCell>
              <StyledTableCell align="right">Cellphone Number</StyledTableCell>
              <StyledTableCell align="right">Role</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell component="th" scope="row">
                  <Button onClick={() => onEdit(user)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => deleteBook(user.id)}>
                    <DeleteIcon type="button" sx={{ color: "#ef5350" }} />
                  </Button>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {user.id}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {user.firstName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {user.middleName}
                </StyledTableCell>
                <StyledTableCell align="right">{user.lastName}</StyledTableCell>
                <StyledTableCell align="right">
                  {user.contactNumber}
                </StyledTableCell>
                <StyledTableCell align="right">{user.role}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const users = await userController.getAll();

  return {
    props: {
      users,
    },
  };
};
