import * as React from "react";
import { styled } from "@mui/material/styles";
import Head from "next/head";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
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
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import { DisplaySettings, SelectAll } from "@mui/icons-material";
import { Search } from "@material-ui/icons";
import Link from "next/link";
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

export default function CustomizedTables(this: any, { ebooks }: ebook) {
  // const [filter, setFilter] = useState<ebook[]>();
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const [searchInput, setSearchInput] = useState("");
  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue);
  };
  const filtered = ebooks.filter((item) => {
    if (age === "category") {
      return item.category.toLowerCase().includes(searchInput.toLowerCase());
    } else if (age === "author") {
      return item.author.toLowerCase().includes(searchInput.toLowerCase());
    } else if (age === "title") {
      return item.title.toLowerCase().includes(searchInput.toLowerCase());
    }
    return item.title.toLowerCase().includes(searchInput.toLowerCase());
  });

  function onEdit(books: any) {
    setForm({
      title: books.title,
      author: books.author,
      category: books.category,
      id: books.id,
      description: books.description,
      downloadLink: books.downloadLink,
      image: books.image,
      publisher: books.publisher,
    });
    handleClickOpen();
  }
  const [form, setForm] = useState<FormData>({
    title: "",
    author: "",
    category: "",
    id: 0,
    downloadLink: "",
    description: "",
    image: "",
    publisher: "",
  });

  const handleSubmit = (data: FormData) => {
    try {
      if (data.id) {
        ebookController.updateBook(data.id, data);
      } else {
        ebookController.create(data);
      }
      handleClose();
      setForm({
        title: "",
        author: "",
        category: "",
        id: 0,
        downloadLink: "",
        description: "",
        image: "",
        publisher: "",
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
    ebookController.deleteBook(id);
    refreshData();
  };
  return (
    <div>
      <h2>E-BOOKS</h2>
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
            value={age}
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

      <div className="mb-3 col-4 mx-auto"></div>
      <br />
      <Container sx={{ display: "flex", width: "100%" }}>
        <Head>
          <title>Ebooks</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
        <Grid container>
          {filtered.map((books) => (
            <Grid margin={1.5} item xs={10} sm={6} md={3} key={books.id}>
              {" "}
              <Card sx={{ maxWidth: "100%" }}>
                <CardActionArea>
                  <CardMedia
                    sx={{
                      height: 200,
                    }}
                    image={books.image}
                    title={books.title}
                  />
                  <CardContent>
                    <Typography
                      sx={{ display: "flex" }}
                      gutterBottom
                      variant="h6"
                      component="h5"
                    >
                      {books.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {books.description}
                      <br />
                      By:{books.author}
                      <br />
                      Publisher:{books.publisher}
                      <br />
                      Category: {books.category}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions
                  sx={{
                    display: "flex",
                    margin: "0 10px",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    alignItems="center"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button href={books.downloadLink}>DOWNLOAD</Button>
                  </Box>
                  <Box></Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
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
