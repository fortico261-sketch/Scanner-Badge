type Credentials = { email: string; password: string };

type AuthUser = {
  token: string;
  role: 'admin' | 'employee';
  email: string;
};

const ADMIN_CREDENTIALS = {
  email: 'admin@example.com',
  password: 'admin123',
};

export async function login(credentials: Credentials): Promise<AuthUser> {
  const { email, password } = credentials;

  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    const authUser = {
      token: 'admin-token',
      role: 'admin' as const,
      email,
    };
    localStorage.setItem('auth_token', authUser.token);
    localStorage.setItem('auth_role', authUser.role);
    localStorage.setItem('auth_email', authUser.email);
    return authUser;
  }

  if (email && password) {
    const authUser = {
      token: 'employee-token',
      role: 'employee' as const,
      email,
    };
    localStorage.setItem('auth_token', authUser.token);
    localStorage.setItem('auth_role', authUser.role);
    localStorage.setItem('auth_email', authUser.email);
    return authUser;
  }

  throw new Error('Email ou mot de passe invalide');
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
