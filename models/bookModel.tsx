import { Select } from '@material-ui/core';
import { RelationshipList } from 'aws-sdk/clients/configservice';
import { RelationshipValue } from 'aws-sdk/clients/iottwinmaker';
import { RelationalDatabaseList } from 'aws-sdk/clients/lightsail';
import { title } from 'process';

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
    isIssued: boolean;
    issuedDate: string;
    userId: string;
    DateReturned: string;
    creationDate: string;
    approvalDate: string;
    isApproved: boolean;
    isCancelled: boolean;
    cancelledDate: string;
    targetreturnDate: string;
    isReturned: boolean;
    isReject: boolean;
    reasonForRejection: string;
    rejectionDate: string;
    id: number;
    book: {
      title: string;
    };
    user: {
      name: string;
      email: string;
    };
  }[];
}
