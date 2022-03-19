export interface user {
  users: {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
    contactNumber: string;
    role: string;
    userName: string;
    password: string;
  }[];
}

export interface FormData {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  contactNumber: string;
  role: string;
  userName: string;
  password: string;
}
