import client from '../../../shared/lib/client-http';

type Credentials = { email: string; password: string };

type AuthUser = {
  token: string;
  role: 'admin' | 'employee';
  email: string;
};

type RegisterData = {
  nom: string;
  email: string;
  password: string;
};

export async function login(
  credentials: Credentials,
  role: 'admin' | 'employee' = 'employee'
): Promise<AuthUser> {
  const response = await client.post('/auth/login', {
    email: credentials.email,
    password: credentials.password,
  });
  const token = response.token;
  localStorage.setItem('auth_token', token);
  localStorage.setItem('auth_role', role);
  localStorage.setItem('auth_email', credentials.email);
  return { token, role, email: credentials.email };
}

export async function register(data: RegisterData): Promise<AuthUser> {
  const response = await client.post('/auth/register', {
    nom: data.nom,
    email: data.email,
    password: data.password,
  });
  return {
    token: '',
    role: 'employee',
    email: response.email,
  };
}

export function logout() {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_role');
  localStorage.removeItem('auth_email');
}

export function getCurrentUser() {
  const token = localStorage.getItem('auth_token');
  const role = localStorage.getItem('auth_role');
  const email = localStorage.getItem('auth_email');
  if (!token || !role || !email) return null;
  return { token, role, email };
}