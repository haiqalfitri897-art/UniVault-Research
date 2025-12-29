import { createSignal, createEffect, For, Show } from 'solid-js';
import { useAuth } from '../hooks/useAuth';
import { useAPI } from '../hooks/useAPI';
import StatCard from '../components/StatCard';
import ActivityFeed from '../components/ActivityFeed';
import ProjectList from '../components/ProjectList';
import '../styles/dashboard.css';

export default function Dashboard() {
  const { user, getToken } = useAuth();
  const { get } = useAPI(getToken());
  
  const [dashboardData, setDashboardData] = createSignal(null);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal('');

  createEffect(async () => {
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
        <p>Welcome back to your research workspace</p>
      </div>

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
    </main>
  );
}
