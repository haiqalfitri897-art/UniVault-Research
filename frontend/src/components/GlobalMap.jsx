import { onMount } from 'solid-js';
import L from 'leaflet';
import { useNavigate } from '@solidjs/router';

export default function GlobalMap() {
  let mapContainer;
  const navigate = useNavigate();

  onMount(() => {
    const map = L.map(mapContainer).setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Highlight Malaysia
    // Approximate bounds for Malaysia
    const malaysiaBounds = [
      [0.8, 99.6], // South West
      [7.4, 119.3] // North East
    ];

    const malaysiaRect = L.rectangle(malaysiaBounds, {
      color: "#ff7800",
      weight: 1,
      fillOpacity: 0.5
    }).addTo(map);

    malaysiaRect.bindTooltip("Malaysia (Active)").openTooltip();

    malaysiaRect.on('click', () => {
      navigate('/malaysia-hub');
    });
  });

  return <div ref={mapContainer} style={{ height: "600px", width: "100%", "border-radius": "8px", "margin-top": "20px" }} />;
}
