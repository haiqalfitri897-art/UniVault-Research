import { useParams } from '@solidjs/router';
import { createResource, Show } from 'solid-js';
import { useAPI } from '../hooks/useAPI';

export default function ResearchDetail() {
  const params = useParams();
  const { get } = useAPI();

  const [research] = createResource(() => params.id, async (id) => {
    const response = await get(`/research/${id}`);
    return response.data;
  });

  return (
    <div class="page-container" style={{ padding: "20px" }}>
      <Show when={research()} fallback={<p>Loading...</p>}>
        <h1>{research().title}</h1>
        <div class="meta-data" style={{ "margin-bottom": "20px", "background": "#f9f9f9", padding: "15px", "border-radius": "8px" }}>
          <p><strong>Degree:</strong> {research().degree}</p>
          <p><strong>Course:</strong> {research().course}</p>
          <p><strong>Subject Code:</strong> {research().subjectCode}</p>
          <p><strong>Year:</strong> {research().yearSubmission}</p>
          <p><strong>Rating:</strong> {research().starRating} ⭐ (Grade: {research().grade})</p>
          <p><strong>Price:</strong> {research().price === 0 ? 'Free' : `$${research().price}`}</p>
        </div>

        <h3>Abstract</h3>
        <p>{research().abstract}</p>

        <div class="actions" style={{ "margin-top": "30px" }}>
          <button style={{ padding: "10px 20px", "background-color": "#007bff", color: "white", border: "none", "border-radius": "5px", cursor: "pointer" }}>
            {research().price === 0 ? 'Download PDF' : 'Purchase Access'}
          </button>
        </div>
      </Show>
    </div>
  );
}
