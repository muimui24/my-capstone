import React from "react";
import type { NextPage } from "next";
import { useState } from "react";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { PrismaClient } from "@prisma/client";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import CustomizedTables from "./userEbook";

import { Pagination } from "@mui/material";
import { title } from "process";

const sessionInfo = async () => {
  const ses = await getSession();
  return ses?.user?.name;
};

const Home = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = React.useState(false);
  const styles = {
    paperContainer: {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://i.imgur.com/GnngaBa.png')`,
      height: "600px",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#fff",
      fontSize: "3rem",
    },
  };
  console.log(sessionInfo());
  if (status === "loading") {
    return <h1>loading</h1>;
  }
  if (session == undefined) {
    signIn();
    // return null;
  }

  return <></>;
};
export default Home;
