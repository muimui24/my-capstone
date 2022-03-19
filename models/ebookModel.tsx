export interface ebook {
  ebooks: {
    id: number;
    title: string;
    author: string;
    category: string;
  }[];
}

export interface FormData {
  title: string;
  author: string;
  category: string;
  id: number;
}
