export interface User {
  $id: string;
  name: string;
  email: string;
  password: string; 
  role: string;
  image: string | null;
}

export interface UserState {
  user: User[];
  isLoading: boolean;
  isError: string | null;
}
