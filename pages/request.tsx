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
import { borrowBooks } from "../models/bookModel";
import { useState } from "react";
import { GetServerSideProps } from "next";
import * as userController from "../controller/usersController";
import * as borrowController from "../controller/borrowContoller";

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

export default function CustomizedTables({ borrows }: borrowBooks) {
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
    id: "",
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
        id: "",
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

  const deleteBook = (id: string) => {
    userController.deleteBook(id);
    refreshData();
  };
  if (session?.user?.name !== "admin") {
    return router.push("/");
  }
  return (
    <>
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
            {borrows.map((borrow) => (
              <StyledTableRow key={borrow.id}>
                <StyledTableCell component="th" scope="row">
                  <Button onClick={() => onEdit(user)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => deleteBook(borrow.)}>
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
  const borrows = await borrowController.getAllByUserEmail();

  return {
    props: {
      borrows,
    },
  };
};
