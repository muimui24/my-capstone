import React from "react";
import type { NextPage } from "next";
import { useState } from "react";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { PrismaClient } from "@prisma/client";

const sessionInfo = async () => {
  const ses = await getSession();
  return ses?.user?.name;
};

const Home = () => {
  const { data: session, status } = useSession();
  const [open, setOpen] = React.useState(false);
  console.log(sessionInfo());
  if (status === "loading") {
    return <h1>loading</h1>;
  }
  if (session == undefined) {
    signIn();
    // return null;
  }

  return <div></div>;
};
export default Home;
