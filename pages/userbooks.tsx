import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Divider, Box } from "@mui/material";
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
import { prisma } from "../lib/prisma";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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
  const [searchBy, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const [searchInput, setSearchInput] = useState("");
  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue);
  };
  const filtered = books.filter((item) => {
    if (searchBy === "category") {
      return item.category.toLowerCase().includes(searchInput.toLowerCase());
    } else if (searchBy === "author") {
      return item.author.toLowerCase().includes(searchInput.toLowerCase());
    } else if (searchBy === "title") {
      return item.title.toLowerCase().includes(searchInput.toLowerCase());
    }
    return item.title.toLowerCase().includes(searchInput.toLowerCase());
  });

  const { data: session, status } = useSession();

  const [form, setForm] = useState<borrowBook>({
    quantity: 0,
    bookCode: "",
    bookId: 0,
    email: session?.user?.email ?? "",
  });

  const [selectedBookId, setBook] = useState<number>();

  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleClickOpen = (id: number) => {
    setOpen(true);
    setBook(id);
  };
  const handleSubmit = (data: borrowBook) => {
    try {
      console.log(selectedBookId);
      const bookDetailIndex = books.findIndex((x) => x.id === selectedBookId);
      const bookDetail = books[bookDetailIndex];

      if (data.quantity > 0) {
        data.bookCode = bookDetail.code;
        data.bookId = bookDetail.id;
        bookController.borrow(data);
      }

      handleClose();
      const user = session?.user?.email;
      // setForm({ quantity: 0, bookCode: "", bookId: 0, userId: user?.id ?? '' });
      refreshData();
    } catch (error) {
      console.log(error);
    }
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

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          sx={{ width: "75%", display: "flex" }}
          placeholder="Search..."
          type="text"
          onChange={(e) => searchItems(e.target.value)}
        />
        <FormControl sx={{ width: "25%", display: "flex" }}>
          <InputLabel id="demo-simple-select-label">Filter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={searchBy}
            label="Filter"
            onChange={handleChange}
          >
            <MenuItem selected value="title">
              By Title
            </MenuItem>
            <MenuItem value="category">By Category</MenuItem>
            <MenuItem value="author">By Author</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Dialog open={open}>
        <DialogTitle>Book Details - </DialogTitle>
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
                handleSubmit(form);
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
  console.log(books);
  return {
    props: {
      books,
    },
  };
};
