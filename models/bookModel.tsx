export interface book {
  books: {
    id: number;
    title: string;
    author: string;
    category: string;
    code: string;
  }[];
}

export interface FormData {
  title: string;
  author: string;
  category: string;
  code: string;
  id: number;
}
export interface borrowBook {
  quantity: number;
  bookId: number;
  bookCode: string;
  email: string;
}
export interface borrowBooks {
  borrows: {
    quantity: number;
    bookId: number;
    bookCode: string;
    email: string;
  };
}
