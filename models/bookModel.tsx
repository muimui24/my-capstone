export interface book {
  books: {
    id: number;
    title: string;
    author: string;
    category: string;
    code: string;
  }[];
}

export interface m_books {
  m_books: {
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
