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
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { book, FormData, borrowBook } from "../models/bookModel";
import { useState } from "react";
import { GetServerSideProps } from "next";
import * as bookController from "../controller/booksController";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { m_books } from "@prisma/client";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#2196f3",
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

export default function CustomizedTables({ books }: book) {
  const [form, setForm] = useState<borrowBook>({
    quantity: 0,
    bookCode: "",
    bookId: 0,
  });
  let selectedBookId: number = 0;

  const handleSubmit = (data: borrowBook, bookId: number) => {
    try {
      const bookDetailIndex = books.findIndex((x) => x.id === bookId);
      const bookDetail = books[bookDetailIndex];

      if (data.quantity > 0) {
        data.bookCode = bookDetail.code;
        data.bookId = bookDetail.id;
        bookController.borrow(data);
      }
      handleClose();
      setForm({ quantity: 0, bookCode: "", bookId: 0 });
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

  const handleClickOpen = (id: number) => {
    setOpen(true);
    selectedBookId = id;
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

  return (
    <>
      <Head>
        <title>Books</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <h2>LIBRARY BOOKS</h2>

      <Dialog open={open}>
        <DialogTitle>Book Details - {selectedBookId}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type=""
            fullWidth
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: Number(e.target.value ?? 0) })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              {
                handleSubmit(form, selectedBookId);
              }
            }}
          >
            Submit
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Divider />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Action</StyledTableCell>
              <StyledTableCell>Book Title</StyledTableCell>
              <StyledTableCell align="right">Author</StyledTableCell>
              <StyledTableCell align="right">BookCode</StyledTableCell>
              <StyledTableCell align="right">Category</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <StyledTableRow key={book.id}>
                <StyledTableCell align="left">
                  <Button onClick={() => handleClickOpen(book.id)}>
                    Request Borrow
                  </Button>
                </StyledTableCell>

                <StyledTableCell component="th" scope="row">
                  {book.title}
                </StyledTableCell>
                <StyledTableCell align="right">{book.author}</StyledTableCell>
                <StyledTableCell align="right">{book.code}</StyledTableCell>
                <StyledTableCell align="right">{book.category}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const books = await bookController.getAll();

  return {
    props: {
      books,
    },
  };
};
