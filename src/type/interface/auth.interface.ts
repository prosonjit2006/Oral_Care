export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload extends LoginPayload {
  name: string;
  confirmpassword?:string; 
  role?: string;
  image?: File | null;
}

export interface User extends SignupPayload {
  $id: string;
}

export interface Authstate {
  isLoading: boolean;
  isError: string | null;
  isAuthenticate: boolean;
  role: string | null;
  user: User | null;
  imagePreview: string | null;
}
