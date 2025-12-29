import { createSignal, createEffect, Show } from 'solid-js';
import { Router, Route, Navigate } from '@solidjs/router';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
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
          <Route path="/" component={() => <Show when={isAuthenticated()} fallback={<Navigate href="/login" />}><Dashboard /></Show>} />
          <Route path="/login" component={() => <Show when={!isAuthenticated()} fallback={<Navigate href="/" />}><Login /></Show>} />
          <Route path="/register" component={() => <Show when={!isAuthenticated()} fallback={<Navigate href="/" />}><Register /></Show>} />
          <Route path="*" component={() => <Navigate href="/" />} />
        </Router>
      </div>
    </Show>
  );
}
