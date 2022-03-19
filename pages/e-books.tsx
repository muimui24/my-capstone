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
import { ebook, FormData } from "../models/ebookModel";
import { useState } from "react";
import { GetServerSideProps } from "next";
import * as ebookController from "../controller/ebooksController";

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

export default function CustomizedTables({ ebooks }: ebook) {
  function onEdit(book: any) {
    setForm({
      title: book.title,
      author: book.author,
      category: book.category,
      id: book.id,
    });
    handleClickOpen();
  }
  const [form, setForm] = useState<FormData>({
    title: "",
    author: "",
    category: "",

    id: 0,
  });

  const handleSubmit = (data: FormData) => {
    try {
      if (data.id) {
        ebookController.updateBook(data.id, data);
      } else {
        ebookController.create(data);
      }
      handleClose();
      setForm({ title: "", author: "", category: "", id: 0 });
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
    ebookController.deleteBook(id);
    refreshData();
  };
  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Book Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="author"
            label="Author"
            type="text"
            fullWidth
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="category"
            label="Category"
            type="text"
            fullWidth
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
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
      <h2>E-BOOKS</h2>
      <Button
        variant="outlined"
        startIcon={<AddCircleIcon />}
        sx={{ m: "6px" }}
        onClick={handleClickOpen}
      >
        Add Book
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
              <StyledTableCell>Book Title</StyledTableCell>
              <StyledTableCell align="right">Author</StyledTableCell>

              <StyledTableCell align="right">Category</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right">id</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ebooks.map((books) => (
              <StyledTableRow key={books.id}>
                <StyledTableCell component="th" scope="row">
                  <Button onClick={() => onEdit(books)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => deleteBook(books.id)}>
                    <DeleteIcon type="button" sx={{ color: "#ef5350" }} />
                  </Button>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {books.title}
                </StyledTableCell>
                <StyledTableCell align="right">{books.author}</StyledTableCell>

                <StyledTableCell align="right">
                  {books.category}
                </StyledTableCell>
                <StyledTableCell align="right">hackdog</StyledTableCell>
                <StyledTableCell align="right">{books.id}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const ebooks = await ebookController.getAll();

  return {
    props: {
      ebooks,
    },
  };
};
