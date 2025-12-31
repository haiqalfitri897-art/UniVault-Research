import { createSignal, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { useAuth } from '../hooks/useAuth';
import '../styles/home.css';

export default function Home() {
  const { isAuthenticated, isGuest, user } = useAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: '📁',
      title: 'Project Management',
      description: 'Organize and manage all your research projects in one central location.'
    },
    {
      icon: '🔬',
      title: 'Research Tracking',
      description: 'Monitor active experiments and research progress with detailed notes.'
    },
    {
      icon: '📊',
      title: 'Data Analytics',
      description: 'Visualize your research data and generate insightful reports.'
    },
    {
      icon: '👥',
      title: 'Team Collaboration',
      description: 'Work seamlessly with colleagues on shared research initiatives.'
    },
    {
      icon: '📄',
      title: 'Publication Manager',
      description: 'Track and manage your academic publications and citations.'
    },
    {
      icon: '🔐',
      title: 'Secure Storage',
      description: 'Keep your research data safe with enterprise-grade security.'
    }
  ];

  return (
    <div class="home-container">
      {/* Hero Section */}
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">
            <span class="gradient-text">UniVault Research</span>
          </h1>
          <p class="hero-subtitle">
            Your complete research management platform
          </p>
          <p class="hero-description">
            Organize projects, track experiments, collaborate with teams, and publish findings—all in one powerful workspace.
          </p>
          
          <Show 
            when={isAuthenticated() && !isGuest()} 
            fallback={
              <div class="hero-actions">
                <button 
                  class="btn btn-primary btn-lg"
                  onClick={() => navigate('/login')}
                >
                  Sign In with Google
                </button>
                <button 
                  class="btn btn-secondary btn-lg"
                  onClick={() => navigate('/dashboard')}
                >
                  Explore as Guest
                </button>
              </div>
            }
          >
            <div class="hero-actions">
              <button 
                class="btn btn-primary btn-lg"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </button>
            </div>
          </Show>
        </div>
      </section>

      {/* Features Section */}
      <section class="features-section">
        <div class="section-header">
          <h2>Everything You Need</h2>
          <p>Powerful features designed for modern research workflows</p>
        </div>
        
        <div class="features-grid">
          {features.map((feature) => (
            <div class="feature-card">
              <div class="feature-icon">{feature.icon}</div>
              <h3 class="feature-title">{feature.title}</h3>
              <p class="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section class="cta-section">
        <div class="cta-content">
          <h2>Ready to Transform Your Research?</h2>
          <p>Join researchers worldwide using UniVault to streamline their work</p>
          <Show 
            when={!isAuthenticated() || isGuest()}
            fallback={
              <button 
                class="btn btn-primary btn-lg"
                onClick={() => navigate('/dashboard')}
              >
                View Your Dashboard
              </button>
            }
          >
            <div class="cta-actions">
              <button 
                class="btn btn-primary btn-lg"
                onClick={() => navigate('/login')}
              >
                Get Started Free
              </button>
              <button 
                class="btn btn-outline btn-lg"
                onClick={() => navigate('/dashboard')}
              >
                Try Demo
              </button>
            </div>
          </Show>
        </div>
      </section>
    </div>
  );
}
