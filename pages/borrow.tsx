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
import { borrowBooks, cancelRequest, returnRequest } from "../models/bookModel";
import { useState } from "react";
import { GetServerSideProps } from "next";
import * as userController from "../controller/usersController";
import * as borrowController from "../controller/borrowContoller";
import { Session } from "inspector";
import { title } from "process";
import { Book } from "@mui/icons-material";
import moment, { now } from "moment";

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
  const [returnform, setreturnform] = useState<returnRequest>({
    id: 0,
    bookCondtion: "",
  });
  const [form, setForm] = useState<cancelRequest>({
    id: 0,
  });

  const handleSubmit = (data: cancelRequest) => {
    borrowController.approve(data.id);
    refreshData();
    console.log(data.id);
  };
  const handleSubmitI = (data: cancelRequest) => {
    borrowController.issue(data.id);
    refreshData();
    console.log(data.id);
  };
  const handleSubmitR = (data: returnRequest) => {
    borrowController.returnBook(data.id, data);
    refreshData();
    console.log(data.id);
  };
  const handleSubmitRj = (data: cancelRequest) => {
    borrowController.reject(data.id);
    refreshData();
    console.log(data.id);
  };

  const handleClickOpen = (id: number) => {
    setOpen(true);
    setForm({
      id: id,
    });
  };
  const handleClickOpenI = (id: number) => {
    setOpenI(true);
    setForm({
      id: id,
    });
  };
  const handleClickOpenR = (id: number) => {
    setOpenR(true);
    setreturnform({
      id: id,

      bookCondtion: "",
    });
  };
  const handleClickOpenRj = (id: number) => {
    setOpenRj(true);
    setForm({
      id: id,
    });
  };
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [openI, setOpenI] = React.useState(false);
  const [openR, setOpenR] = React.useState(false);
  const [openRj, setOpenRj] = React.useState(false);
  const { data: session, status } = useSession();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseI = () => {
    setOpenI(false);
  };
  const handleCloseR = () => {
    setOpenR(false);
  };
  const handleCloseRj = () => {
    setOpenRj(false);
  };
  if (status === "loading") {
    return <h1>loading</h1>;
  }
  if (session == undefined) {
    signIn();
  }
  if (session?.user?.name !== "admin") {
    return router.push("/");
  }
  const deleteBook = (id: string) => {
    userController.deleteBook(id);
    refreshData();
  };
  const filtered = borrows.filter((x) => !x.isCancelled);

  const formatDate = (date: string): string => {
    return moment(date, "YYYY-MM-DDTHH:mm:ss.sssZ").format(
      "MMMM Do YYYY, h:mm:ss a"
    );
  };

  return (
    <>
      <h2>Book Requests</h2>

      <Dialog open={open}>
        <DialogTitle>Approve Request?</DialogTitle>
        <DialogContent> </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              {
                handleSubmit(form);
                handleClose();
              }
            }}
          >
            Confirm
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openRj}>
        <DialogTitle>Issued?</DialogTitle>
        <DialogContent> </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              {
                handleSubmitRj(form);
                handleCloseRj();
              }
            }}
          >
            Confirm
          </Button>
          <Button onClick={handleCloseRj}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openI}>
        <DialogTitle>Issued?</DialogTitle>
        <DialogContent> </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              {
                handleSubmitI(form);
                handleCloseI();
              }
            }}
          >
            Confirm
          </Button>
          <Button onClick={handleCloseI}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openR}>
        <DialogTitle>Issued?</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="fname"
            label="Book Condition"
            type="text"
            fullWidth
            value={returnform.bookCondtion}
            onChange={(e) =>
              setreturnform({ ...returnform, bookCondtion: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              {
                handleSubmitR(returnform);
                handleClose();
              }
            }}
          >
            Confirm
          </Button>
          <Button onClick={handleCloseR}>Close</Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="left">Borrower</StyledTableCell>
              <StyledTableCell align="left">Dated Borrow</StyledTableCell>
              <StyledTableCell align="left">Book Title</StyledTableCell>

              <StyledTableCell align="left">Date of Approval</StyledTableCell>
              <StyledTableCell align="left">Date Issued</StyledTableCell>
              <StyledTableCell align="left">Date of Returned</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((borrow) => (
              <StyledTableRow key={borrow.id}>
                <StyledTableCell component="th" scope="row">
                  {!borrow.isApproved && !borrow.isReject ? (
                    <div>
                      <Button
                        onClick={() => {
                          handleClickOpen(borrow.id);
                        }}
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => {
                          handleClickOpenRj(borrow.id);
                        }}
                      >
                        Reject
                      </Button>
                    </div>
                  ) : !borrow.isApproved &&
                    borrow.isReject ? null : borrow.isApproved &&
                    !borrow.isIssued ? (
                    <Button
                      onClick={() => {
                        handleClickOpenI(borrow.id);
                      }}
                    >
                      Issued
                    </Button>
                  ) : borrow.isApproved && !borrow.isIssued ? (
                    <Button
                      onClick={() => {
                        handleClickOpenI(borrow.id);
                      }}
                    >
                      Issued
                    </Button>
                  ) : borrow.isApproved &&
                    borrow.isIssued &&
                    !borrow.isReturned ? (
                    <Button
                      onClick={() => {
                        handleClickOpenR(borrow.id);
                      }}
                    >
                      Return
                    </Button>
                  ) : null}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {borrow.user.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {formatDate(borrow.creationDate)}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {borrow.book.title}
                </StyledTableCell>

                <StyledTableCell align="center">
                  {borrow.isApproved ? formatDate(borrow.approvalDate) : "-"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {borrow.isIssued ? formatDate(borrow.issuedDate) : "-"}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {borrow.isReturned ? formatDate(borrow.DateReturned) : "-"}
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
                  ) : null}
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
