export interface ebook {
  ebooks: {
    title: string;
    author: string;
    category: string;
    id: number;
    downloadLink: string;
    description: string;
    image: string;
    publisher: string;
  }[];
}

export interface FormData {
  title: string;
  author: string;
  category: string;
  id: number;
  downloadLink: string;
  description: string;
  image: string;
  publisher: string;
}

export interface searchEbook {
  display: {
    title: string;
    author: string;
    category: string;
    id: number;
    downloadLink: string;
    description: string;
    image: string;
    publisher: string;
  }[];
}
