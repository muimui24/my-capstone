import { m_books } from "@prisma/client";
import { json } from "node:stream/consumers";
import { useState } from "react";
import { FormData, borrowBook } from "../models/bookModel";

export async function create(data: FormData) {
  try {
    fetch(`https://olemr.herokuapp.com/api/book`, {
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
export async function deleteBook(id: number) {
  try {
    fetch(`https://olemr.herokuapp.com/api/book/${id}`, {
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
export async function updateBook(id: number, data: FormData) {
  try {
    fetch(`https://olemr.herokuapp.com/api/book/${id}`, {
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
    const res = await fetch(`https://olemr.herokuapp.com/api/book`, {
      method: "GET",
    });
    const x = await res.json();
    return x;
  } catch (error) {
    console.log(error);
  }
}
export async function borrow(data: borrowBook) {
  try {
    console.log(JSON.stringify(data));
    console.log("here");
    fetch(`https://olemr.herokuapp.com/api/borrow`, {
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
