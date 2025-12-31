import { Show } from 'solid-js';
import { Router, Route, Navigate } from '@solidjs/router';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MalaysiaHub from './pages/MalaysiaHub';
import UniversityProfile from './pages/UniversityProfile';
import ResearchDetail from './pages/ResearchDetail';
import Navigation from './components/Navigation';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { isAuthenticated, loading } = useAuth();

  return (
    <Show when={!loading()} fallback={<div class="loading">Loading...</div>}>
      <div class="app-container">
        <Show when={isAuthenticated()}>
          <Navigation />
        </Show>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/malaysia-hub" component={MalaysiaHub} />
          <Route path="/institution/:id" component={UniversityProfile} />
          <Route path="/research/:id" component={ResearchDetail} />
          <Route path="*" component={() => <Navigate href="/" />} />
        </Router>
      </div>
    </Show>
  );
}
