import '../styles/components.css';

export default function StatCard(props) {
  return (
    <div class="stat-card">
      <div class="stat-icon">{props.icon}</div>
      <div class="stat-content">
        <p class="stat-title">{props.title}</p>
        <p class="stat-value">{props.value}</p>
      </div>
    </div>
  );
}
