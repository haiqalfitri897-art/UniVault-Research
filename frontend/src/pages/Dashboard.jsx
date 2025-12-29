import { createSignal, createEffect, For, Show } from 'solid-js';
import { useAuth } from '../hooks/useAuth';
import { useAPI } from '../hooks/useAPI';
import StatCard from '../components/StatCard';
import ActivityFeed from '../components/ActivityFeed';
import ProjectList from '../components/ProjectList';
import '../styles/dashboard.css';

export default function Dashboard() {
  const { user, getToken, isGuest } = useAuth();
  const { get } = useAPI(getToken());
  
  const [dashboardData, setDashboardData] = createSignal(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal('');

  createEffect(async () => {
    // Skip API call for guest users
    if (isGuest()) {
      setLoading(false);
      return;
    }

    try {
      const data = await get('/dashboard');
      setDashboardData(data.data);
    } catch (err) {
      setError('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  });

  return (
    <main class="dashboard">
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <Show when={isGuest()} fallback={<p>Welcome back to your research workspace</p>}>
          <p>Exploring as Guest - Sign in to access your data</p>
        </Show>
      </div>

      <Show when={isGuest()} fallback={
        <Show when={loading()} fallback={
          <>
            {error() && <div class="error-alert">{error()}</div>}
            
            <Show when={dashboardData()}>
              {(data) => (
                <>
                  {/* Stats Section */}
                  <section class="stats-section">
                    <h2>Overview</h2>
                    <div class="stats-grid">
                      <StatCard 
                        title="Total Projects"
                        value={data().stats.totalProjects}
                        icon="📁"
                      />
                      <StatCard 
                        title="Active Research"
                        value={data().stats.activeResearch}
                        icon="🔬"
                      />
                      <StatCard 
                        title="Publications"
                        value={data().stats.publications}
                        icon="📄"
                      />
                      <StatCard 
                        title="Collaborators"
                        value={data().stats.collaborators}
                        icon="👥"
                      />
                    </div>
                  </section>

                  {/* Projects Section */}
                  <section class="projects-section">
                    <h2>Your Projects</h2>
                    <ProjectList projects={data().projects} />
                  </section>

                  {/* Activity Section */}
                  <section class="activity-section">
                    <h2>Recent Activity</h2>
                    <ActivityFeed activities={data().recentActivity} />
                  </section>
                </>
              )}
            </Show>
          </>
        }>
          <div class="loading">Loading your dashboard...</div>
        </Show>
      }>
        <div class="guest-placeholder">
          <div class="guest-content">
            <h2>Welcome to UniVault Research</h2>
            <p>You're browsing as a guest. This is a preview of our research management platform.</p>
            <div class="demo-grid">
              <div class="demo-card">
                <h3>📁 Organize Projects</h3>
                <p>Manage and organize your research projects in one place.</p>
              </div>
              <div class="demo-card">
                <h3>🔬 Track Research</h3>
                <p>Monitor your active research and keep detailed notes.</p>
              </div>
              <div class="demo-card">
                <h3>📄 Publications</h3>
                <p>Document and track your published work.</p>
              </div>
              <div class="demo-card">
                <h3>👥 Collaborate</h3>
                <p>Work together with colleagues on shared research.</p>
              </div>
            </div>
            <p class="guest-footer">Sign in or create an account to start using all features.</p>
          </div>
        </div>
      </Show>
    </main>
  );
}
