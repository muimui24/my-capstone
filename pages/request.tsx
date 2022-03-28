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
import { Session } from "inspector";

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
var userEmail: string = "";

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
  } else {
    userEmail = session?.user?.email ?? "";
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
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="right">Book ID</StyledTableCell>
              <StyledTableCell align="right">Book Code</StyledTableCell>

              <StyledTableCell align="right">Approved</StyledTableCell>
              <StyledTableCell align="right">Cancelled</StyledTableCell>
              <StyledTableCell align="right">Issued</StyledTableCell>
              <StyledTableCell>Returned</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {borrows.map((borrow) => (
              <StyledTableRow key={borrow.bookId}>
                <StyledTableCell component="th" scope="row">
                  {/* <Button onClick={() => deleteBook(borrow.id)}>
                    <DeleteIcon type="button" sx={{ color: "#ef5350" }} />
                  </Button> */}
                  {borrow.bookCode}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {borrow.bookId}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {borrow.bookCode}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {borrow.isApproved ? "gregnth" : "rrrr"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {borrow.isCancelled}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {borrow.isIssued}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {borrow.isReturned}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const borrows = await borrowController.getAllByUserEmail(String(userEmail));

  return {
    props: {
      borrows,
    },
  };
};
