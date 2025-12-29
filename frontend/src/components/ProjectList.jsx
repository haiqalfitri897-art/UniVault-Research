import { For } from 'solid-js';
import '../styles/components.css';

export default function ProjectList(props) {
  return (
    <div class="project-list">
      <For each={props.projects}>
        {(project) => (
          <div class="project-card">
            <div class="project-header">
              <h3>{project.name}</h3>
              <span class={`project-status status-${project.status}`}>
                {project.status}
              </span>
            </div>
            <div class="project-progress">
              <div class="progress-bar">
                <div 
                  class="progress-fill"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <p class="progress-text">{project.progress}%</p>
            </div>
            <button class="btn btn-secondary">View Project</button>
          </div>
        )}
      </For>
    </div>
  );
}
