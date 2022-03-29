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
import { borrowBooks, cancelRequest } from "../models/bookModel";
import { GetServerSideProps } from "next";
import * as userController from "../controller/usersController";
import * as borrowController from "../controller/borrowContoller";
import { Session } from "inspector";
import { title } from "process";
import { Book } from "@mui/icons-material";
import moment from "moment";
import { useState } from "react";

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
  const [form, setForm] = useState<cancelRequest>({
    id: 0,
  });

  const handleSubmit = (data: cancelRequest) => {
    borrowController.cancel(data.id);
    console.log(data.id);
  };

  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { data: session, status } = useSession();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleClickOpen = (id: number) => {
    setOpen(true);
    setForm({
      id: id,
    });
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
  if (session?.user?.name == "admin") {
    return router.push("/");
  }

  const deleteBook = (id: string) => {
    userController.deleteBook(id);
    refreshData();
  };
  const filtered = borrows.filter(
    (x) => x.user.email === (session?.user?.email ?? "") && !x.isCancelled
  );

  const formatDate = (date: string): string => {
    return moment(date, "YYYY-MM-DDTHH:mm:ss.sssZ").format(
      "MMMM Do YYYY, h:mm:ss a"
    );
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Confirm Cancel </DialogTitle>
        <DialogContent>Cancel Request?</DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              {
                handleSubmit(form);
              }
            }}
          >
            Confirm
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <h2>My Request</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="left">Book Title</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>

              <StyledTableCell align="left">Approval Date</StyledTableCell>
              <StyledTableCell align="left">Issued Date</StyledTableCell>
              <StyledTableCell align="left">Returned Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((borrow) => (
              <StyledTableRow key={borrow.id}>
                <StyledTableCell component="th" scope="row">
                  {!borrow.isApproved &&
                  borrow.isIssued &&
                  borrow.isReject &&
                  borrow.isReturned ? (
                    <Button
                      onClick={() => {
                        {
                          handleClickOpen(borrow.id);
                        }
                      }}
                    >
                      Cancel
                    </Button>
                  ) : null}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {borrow.book.title}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {!borrow.isApproved && !borrow.isReject ? (
                    <div>Pending..</div>
                  ) : borrow.isApproved &&
                    !borrow.isReject &&
                    !borrow.isIssued &&
                    !borrow.isReturned ? (
                    <div>Request Approved</div>
                  ) : !borrow.isApproved &&
                    borrow.isReject &&
                    !borrow.isIssued &&
                    !borrow.isReturned ? (
                    <div>Rejected</div>
                  ) : borrow.isApproved &&
                    borrow.isIssued &&
                    !borrow.isReject &&
                    !borrow.isReturned ? (
                    <div>Issued</div>
                  ) : borrow.isApproved &&
                    borrow.isIssued &&
                    borrow.isReturned &&
                    !borrow.isReject ? (
                    <div>Returned</div>
                  ) : null}{" "}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {borrow.isApproved ? formatDate(borrow.approvalDate) : "-"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {borrow.isIssued ? formatDate(borrow.issuedDate) : "-"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {borrow.isReturned ? formatDate(borrow.DateReturned) : "-"}
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
  const borrows: borrowBooks = await borrowController.getAllByUserEmail();
  return {
    props: {
      borrows,
    },
  };
};
