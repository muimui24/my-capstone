import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import SearchIcon from '@mui/icons-material/Search';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface book {
  books: {
    id: number;
    title: string;
    author: string;
    category: string;
    code: string;
  }[];
}

interface m_books {
  m_books: {
    id: number;
    title: string;
    author: string;
    category: string;
    code: string;
  }[];
}

interface FormData {
  title: string;
  author: string;
  category: string;
  code: string;
  id: number;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#2196f3',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function CustomizedTables({ books }: book) {
  function onEdit(book: any) {
    setForm({
      title: book.title,
      author: book.author,
      category: book.category,
      code: book.code,
      id: book.id,
    });
    handleClickOpen();
    // updateBook(book.title, book);
  }
  const [form, setForm] = useState<FormData>({
    title: '',
    author: '',
    category: '',
    code: '',
    id: 0,
  });
  async function create(data: FormData) {
    try {
      console.log(data);
      fetch('http://localhost:3000/api/create', {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }).then(() => {
        if (data.id) {
          handleClose();
          setForm({ title: '', author: '', category: '', code: '', id: 0 });
          refreshData();
        } else handleClose();
        setForm({ title: '', author: '', category: '', code: '', id: 0 });
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteBook(id: number) {
    try {
      fetch('http://localhost:3000/api/book/' + id, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function updateBook(id: number, data: FormData) {
    try {
      fetch('http://localhost:3000/api/book/' + id, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      }).then(() => {
        refreshData();
        handleClose();
      });
    } catch (error) {
      console.log(error);
    }
  }
  const handleSubmit = (data: FormData) => {
    try {
      if (data.id) {
        updateBook(data.id, data);
      } else {
        create(data);
      }
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
  if (status === 'loading') {
    return <h1>loading</h1>;
  }
  if (session == undefined) {
    signIn();
  }
  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Add Book</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='title'
            label='Title'
            type='text'
            fullWidth
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            autoFocus
            margin='dense'
            id='author'
            label='Author'
            type='text'
            fullWidth
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />
          <TextField
            autoFocus
            margin='dense'
            id='category'
            label='Category'
            type='text'
            fullWidth
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <TextField
            autoFocus
            margin='dense'
            id=''
            label='Code'
            type='text'
            fullWidth
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
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
            Add
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <h2>LIBRARY BOOKS</h2>
      <Button
        variant='outlined'
        startIcon={<AddCircleIcon />}
        sx={{ m: '6px' }}
        onClick={handleClickOpen}
      >
        Add Book
      </Button>
      <Button variant='outlined' startIcon={<SearchIcon />} sx={{ m: '6px' }}>
        Search BOOK
      </Button>
      <Divider />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell>Action</StyledTableCell>
              <StyledTableCell>Book Title</StyledTableCell>
              <StyledTableCell align='right'>Author</StyledTableCell>
              <StyledTableCell align='right'>BookCode</StyledTableCell>
              <StyledTableCell align='right'>Category</StyledTableCell>
              <StyledTableCell align='right'></StyledTableCell>
              <StyledTableCell align='right'>id</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((books) => (
              <StyledTableRow key={books.id}>
                <StyledTableCell component='th' scope='row'>
                  <Button onClick={() => onEdit(books)}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => deleteBook(books.id)}>
                    <DeleteIcon type='button' sx={{ color: '#ef5350' }} />
                  </Button>
                </StyledTableCell>
                <StyledTableCell component='th' scope='row'>
                  {books.title}
                </StyledTableCell>
                <StyledTableCell align='right'>{books.author}</StyledTableCell>
                <StyledTableCell align='right'>{books.code}</StyledTableCell>
                <StyledTableCell align='right'>
                  {books.category}
                </StyledTableCell>
                <StyledTableCell align='right'>hackdog</StyledTableCell>
                <StyledTableCell align='right'>{books.id}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async () => {
  const books = await prisma.m_books.findMany({
    select: {
      id: true,
      title: true,
      author: true,
      category: true,
      code: true,
    },
  });

  return {
    props: {
      books,
    },
  };
};
