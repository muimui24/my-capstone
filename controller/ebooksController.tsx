import { m_books } from "@prisma/client";
import { json } from "node:stream/consumers";
import { useState } from "react";
import { FormData } from "../models/ebookModel";

export async function create(data: FormData) {
  try {
    fetch("http://localhost:3000/api/ebook", {
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
    fetch("http://localhost:3000/api/e-book/" + id, {
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
    fetch("http://localhost:3000/api/e-book/" + id, {
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
    const res = await fetch("http://localhost:3000/api/ebook", {
      method: "GET",
    });
    const x = await res.json();
    console.log(x);
    return x;
  } catch (error) {
    console.log(error);
  }
}
