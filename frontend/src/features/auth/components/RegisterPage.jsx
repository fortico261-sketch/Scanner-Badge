import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/auth.api';

const TAB_CONFIG = {
  admin: {
    label: 'Administrateur',
    subtitle: 'Créer un compte administrateur',
    placeholder: 'admin@example.com',
  },
  employee: {
    label: 'Employé',
    subtitle: 'Créer un compte employé',
    placeholder: 'employe@example.com',
  },
};

export default function RegisterPage() {
  const [tab, setTab] = useState('admin');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleTabChange(newTab) {
    setTab(newTab);
    setError(null);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!nom.trim() || !email.trim() || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      await register({ nom: nom.trim(), email: email.trim(), password });
      navigate('/login');
    } catch (err) {
      setError(err?.message || 'Erreur lors de la création du compte');
    }
  }

  const current = TAB_CONFIG[tab];

  return (
    <div className="login-screen">
      <div className="login-panel">
        <header className="login-hero">
          <h1>Inscription</h1>
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
              <label>Nom complet</label>
              <div className="input-icon">
                <span>👤</span>
                <input
                  type="text"
                  placeholder="Jean Dupont"
                  value={nom}
                  onChange={e => setNom(e.target.value)}
                />
              </div>
            </div>
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
            <div className="form-group">
              <label>Confirmer le mot de passe</label>
              <div className="input-icon">
                <span>🔒</span>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="bg-blue-600 text-white btn-full">
              Créer un compte
            </button>
          </form>
          <div className="login-footer">
            <Link to="/login">Déjà un compte ? Se connecter</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
