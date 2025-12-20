export type UserRole = 'PREVENCIONISTA' | 'COLABORADOR';

export type LoginRequest = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  is_staff: boolean;
};

export type LoginResponse = {
  access: string;
  refresh: string;
  user: User;
};
