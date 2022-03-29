import { signIn, signOut, useSession } from "next-auth/react";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/router";
import { red } from "@mui/material/colors";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { getSession } from "next-auth/react";
import MessageIcon from "@mui/icons-material/Message";
import BookIcon from "@mui/icons-material/Book";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import {
  ExtendList,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import router from "next/router";
import * as React from "react";
import { useState, useEffect } from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";

const sessionInfo = async () => {
  const ses = await getSession();
  return ses?.user?.name;
};

export default function MenuList(open: any) {
  // const ses = await sessionInfo();
  const { data: session, status } = useSession();
  // useEffect(() => {
  //   ses;
  // }, []);
  if (session?.user?.name === "admin") {
    return (
      <List>
        <ListItemButton
          onClick={() => router.push("/")}
          key="home"
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <HomeRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        <ListItemButton
          onClick={() => router.push("/e-books")}
          key="E-Books"
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <LibraryBooksRoundedIcon />
          </ListItemIcon>
          <ListItemText
            primary="Manage E-Books"
            sx={{ opacity: open ? 1 : 0 }}
          />
        </ListItemButton>
        <ListItemButton
          onClick={() => router.push("/books")}
          key="Books"
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <MenuBookOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Books" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        <ListItemButton
          onClick={() => router.push("/users")}
          key="Manage Accounts"
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Users" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        <ListItemButton
          onClick={() => router.push("/borrow")}
          key="Manage Accounts"
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <MessageIcon />
          </ListItemIcon>
          <ListItemText primary="Requests" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        <ListItemButton
          onClick={() => router.push("/userEbook")}
          key="Manage Accounts"
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary="Ebooks" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        <ListItemButton
          onClick={() => router.push("/userbooks")}
          key="Manage Accounts"
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <BookOnlineIcon />
          </ListItemIcon>
          <ListItemText primary="Libray Books" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </List>
    );
  } else {
    return (
      <List>
        <ListItemButton
          onClick={() => router.push("/")}
          key="home"
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <HomeRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        <ListItemButton
          onClick={() => router.push("/userbooks")}
          key="Books"
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <MenuBookOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Books" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
        <ListItemButton
          onClick={() => router.push("/userEbook")}
          key="EBooks"
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <LibraryBooksRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="E-Books" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>

        <ListItemButton
          onClick={() => router.push("/request")}
          key="Manage Accounts"
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center",
            }}
          >
            <MessageIcon />
          </ListItemIcon>
          <ListItemText primary="Requests" sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </List>
    );
  }
}
