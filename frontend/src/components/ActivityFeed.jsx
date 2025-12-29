import { For } from 'solid-js';
import '../styles/components.css';

export default function ActivityFeed(props) {
  return (
    <div class="activity-feed">
      <For each={props.activities}>
        {(activity) => (
          <div class="activity-item">
            <div class="activity-icon">
              {activity.type === 'upload' && '📤'}
              {activity.type === 'collaboration' && '🤝'}
              {activity.type === 'milestone' && '🎯'}
            </div>
            <div class="activity-content">
              <p class="activity-title">{activity.title}</p>
              <p class="activity-date">
                {new Date(activity.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </For>
    </div>
  );
}
