import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getCurrentUser, login } from '../api/auth.api';

const TAB_CONFIG = {
  admin: {
    label: 'Administrateur',
    subtitle: 'Espace administration',
    placeholder: 'admin@example.com',
  },
  employee: {
    label: 'Employé',
    subtitle: 'Espace Employé',
    placeholder: 'employe@example.com',
  },
};

export default function LoginPage() {
  const [tab, setTab] = useState('admin');
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCurrentUser();
    if (user?.role === 'admin') {
      setRedirectToDashboard(false);
    }
  }, []);

  function handleTabChange(newTab) {
    setTab(newTab);
    setError(null);
    setEmail(newTab === 'admin' ? 'admin@example.com' : '');
    setPassword('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const user = await login({ email: email.trim(), password: password.trim() });
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'employee') {
        navigate('/employes');
      }
    } catch (err) {
      setError(err?.message || 'Email ou mot de passe invalide');
    }
  }

  if (redirectToDashboard) {
    return <Navigate to="/admin" replace />;
  }

  const current = TAB_CONFIG[tab];

  return (
    <div className="login-screen">
      <div className="login-panel">
        <header className="login-hero">
          <h1>Connexion</h1>
          
        </header>

        <div className="login-tabs">
          <button className={tab === 'admin' ? 'tab active' : 'tab'} type="button" onClick={() => handleTabChange('admin')}>
            Administrateur
          </button>
          <button className={tab === 'employee' ? 'tab active' : 'tab'} type="button" onClick={() => handleTabChange('employee')}>
            Employé
          </button>
        </div>

        <div className="login-card">
          <div className="login-card-header">
            <div>
              <div className="login-card-title">{current.label}</div>
              <div className="login-card-subtitle">{current.subtitle}</div>
            </div>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Adresse Email</label>
              <div className="input-icon">
                <span>📧</span>
                <input
                  type="email"
                  placeholder={current.placeholder}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Mot de passe</label>
              <div className="input-icon">
                <span>🔒</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="form-helpers">
              <label className="checkbox-label">
                <input type="checkbox" /> Se souvenir de moi
              </label>
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="bg-emerald-600 text-white btn-full">
              Se connecter
            </button>
          </form>
          <div className="login-footer">
            <a href="#">Mot de passe oublié ?</a>
            <a href="#">Créer un compte</a>
          </div>
        </div>
      </div>
    </div>
  );
}
