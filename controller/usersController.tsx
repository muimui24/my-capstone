import { m_books } from "@prisma/client";
import { json } from "node:stream/consumers";
import { useState } from "react";
import { FormData } from "../models/userModel";

export async function create(data: FormData) {
  try {
    fetch("https://olemr.herokuapp.com/api/user", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    }).then(() => {
      return;
    });
  } catch (error) {
    console.log(error);
  }
}
export async function deleteBook(id: string) {
  try {
    fetch("https://olemr.herokuapp.com/users/" + id, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((res) => {
      return res.json();
    });
  } catch (error) {
    console.log(error);
  }
}
export async function updateBook(id: string, data: FormData) {
  try {
    fetch("https://olemr.herokuapp.com/api/users/" + id, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    }).then(() => {
      return data;
    });
  } catch (error) {
    console.log(error);
  }
}
export async function getAll() {
  try {
    const res = await fetch("https://olemr.herokuapp.com/api/user", {
      method: "GET",
    });
    const x = await res.json();
    console.log(x);
    return x;
  } catch (error) {
    console.log(error);
  }
}
