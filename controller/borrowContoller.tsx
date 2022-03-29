import {
  FormData,
  borrowBook,
  borrowBooks,
  returnRequest,
} from "../models/bookModel";

export async function getAllByUserEmail() {
  try {
    const res = fetch(`hhttps://olemr.herokuapp.com/api/borrow`, {
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

export async function cancel(id: number) {
  try {
    fetch(`https://olemr.herokuapp.com/api/borrow/cancel/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    }).then((res) => {
      return res.body;
    });
  } catch (error) {
    console.log(error);
  }
}
export async function approve(id: number) {
  try {
    fetch(`https://olemr.herokuapp.com/api/borrow/approve/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    }).then((res) => {
      return res.body;
    });
  } catch (error) {
    console.log(error);
  }
}
export async function issue(id: number) {
  try {
    fetch(`https://olemr.herokuapp.com/api/borrow/Issue/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    }).then((res) => {
      return res.body;
    });
  } catch (error) {
    console.log(error);
  }
}
export async function reject(id: number) {
  try {
    fetch(`https://olemr.herokuapp.com/api/borrow/Reject/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    }).then((res) => {
      return res.body;
    });
  } catch (error) {
    console.log(error);
  }
}

export async function returnBook(id: number, data: returnRequest) {
  try {
    console.log(data);
    fetch(`https://olemr.herokuapp.comapi/borrow/return/${id}`, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    }).then((res) => {
      return res.body;
    });
  } catch (error) {
    console.log(error);
  }
}
