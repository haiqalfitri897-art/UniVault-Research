import { useNavigate } from '@solidjs/router';
import { useAuth } from '../hooks/useAuth';
import '../styles/navigation.css';

export default function Navigation() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav class="navbar">
      <div class="navbar-container">
        <a href="/" class="navbar-logo">
          <span class="logo-icon">🔬</span>
          UniVault Research
        </a>
        
        <ul class="nav-menu">
          <li class="nav-item">
            <a href="/" class="nav-link">Dashboard</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">Projects</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">Collaborate</a>
          </li>
        </ul>

        <button class="btn btn-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}
