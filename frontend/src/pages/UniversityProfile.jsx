import { useParams } from '@solidjs/router';
import { createResource, Show, For } from 'solid-js';
import { useAPI } from '../hooks/useAPI';

export default function UniversityProfile() {
  const params = useParams();
  const { get } = useAPI();

  const [institution] = createResource(() => params.id, async (id) => {
    return await get(`/institutions/${id}`);
  });

  const [researchList] = createResource(() => params.id, async (id) => {
    // Fetch research for this institution
    const response = await get(`/research?institutionId=${id}`);
    return response.data;
  });

  return (
    <div class="page-container" style={{ padding: "20px" }}>
      <Show when={institution()} fallback={<p>Loading...</p>}>
        <div class="institution-header" style={{ display: "flex", gap: "20px", "align-items": "center", "margin-bottom": "30px" }}>
          <img src={institution().logo} alt={institution().name} width="100" style={{ "border-radius": "50%" }} />
          <div>
            <h1>{institution().name}</h1>
            <p>{institution().location.address}</p>
            <p>Rating: {institution().averageRating} ⭐ | Uploads: {institution().totalUploads}</p>
          </div>
        </div>

        <h2>Research Papers</h2>
        <div class="research-list" style={{ display: "grid", gap: "15px" }}>
          <For each={researchList()} fallback={<p>No research found.</p>}>{(item) => (
            <div class="research-card" style={{ border: "1px solid #ddd", padding: "15px", "border-radius": "8px" }}>
              <h3>{item.title}</h3>
              <p><strong>Degree:</strong> {item.degree} | <strong>Course:</strong> {item.course}</p>
              <p><strong>Rating:</strong> {item.starRating} ⭐</p>
              <a href={`/research/${item.id}`} style={{ color: "blue", "text-decoration": "underline" }}>View Details</a>
            </div>
          )}</For>
        </div>
      </Show>
    </div>
  );
}
