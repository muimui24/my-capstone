import { ok } from 'assert';
import { useState } from 'react';
import { FormData } from '../models/bookModel';

export async function create(data: FormData) {
  try {
    fetch('http://localhost:3000/api/create', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then(() => {
      return;
    });
  } catch (error) {
    console.log(error);
  }
}
export async function deleteBook(id: number) {
  try {
    fetch('http://localhost:3000/api/book/' + id, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    }).then(() => {
      return ok;
    });
  } catch (error) {
    console.log(error);
  }
}
export async function updateBook(id: number, data: FormData) {
  try {
    fetch('http://localhost:3000/api/book/' + id, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    }).then(() => {
      return data;
    });
  } catch (error) {
    console.log(error);
  }
}
