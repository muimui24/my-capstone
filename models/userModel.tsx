export interface user {
  users: {
    id: string;
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
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  contactNumber: string;
  role: string;
  userName: string;
  password: string;
}
