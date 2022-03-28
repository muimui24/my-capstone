import { FormData, borrowBook } from "../models/bookModel";

export async function getAllByUserEmail(email: string) {
  try {
    const res = fetch(`http://localhost:3000/api/borrow?email=${email}`, {
      method: "GET",
    });
    const x = await (await res).json();
    console.log(x);
    return x;
  } catch (error) {
    console.log(error);
  }
}
export async function updateBook(id: number, data: borrowBook) {
  try {
    fetch(`http://localhost:3000/api/book/${id}`, {
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
