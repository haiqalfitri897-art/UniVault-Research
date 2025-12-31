import { createSignal, onMount } from 'solid-js';

const AUTH_TOKEN_KEY = 'auth_token';
const USER_KEY = 'user';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = createSignal(false);
  const [user, setUser] = createSignal(null);
  const [loading, setLoading] = createSignal(true);

  // Initialize auth state on mount
  onMount(() => {
    checkAuthState();
    setLoading(false);
  });

  const checkAuthState = () => {
    // Check for existing token
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      setIsAuthenticated(true);
      // Optionally fetch user profile here
    } else {
      // Check for guest user
      const storedUser = localStorage.getItem(USER_KEY);
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
        } catch (e) {
          // Invalid user data, skip
        }
      }
    }
  };

  const login = (token, userData) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    setIsAuthenticated(true);
    setUser(userData);
  };

  const loginAsGuest = () => {
    const guestUser = { role: 'guest', name: 'Guest User' };
    localStorage.setItem(USER_KEY, JSON.stringify(guestUser));
    setUser(guestUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setIsAuthenticated(false);
    setUser(null);
  };

  const getToken = () => localStorage.getItem(AUTH_TOKEN_KEY);
  const isGuest = () => user()?.role === 'guest';

  return { isAuthenticated, user, loading, login, loginAsGuest, logout, getToken, isGuest };
}
