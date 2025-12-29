import { createSignal, createEffect } from 'solid-js';

const AUTH_TOKEN_KEY = 'auth_token';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);
  const [user, setUser] = createSignal(null);
  const [loading, setLoading] = createSignal(true);

  createEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      setIsAuthenticated(true);
      // Optionally fetch user profile here
    }
    setLoading(false);
  });

  const login = (token, userData) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setIsAuthenticated(false);
    setUser(null);
  };

  const getToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

  return { isAuthenticated, user, loading, login, logout, getToken };
}
