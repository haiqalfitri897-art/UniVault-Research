import { onMount, createSignal } from 'solid-js';
import L from 'leaflet';
import { useNavigate } from '@solidjs/router';
import { useAPI } from '../hooks/useAPI';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MalaysiaMap() {
  let mapContainer;
  const navigate = useNavigate();
  const { get } = useAPI();
  const [institutions, setInstitutions] = createSignal([]);

  onMount(async () => {
    const map = L.map(mapContainer).setView([4.2105, 101.9758], 6); // Center of Malaysia

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    try {
      const data = await get('/institutions');
      setInstitutions(data);

      data.forEach(inst => {
        if (inst.location) {
          const marker = L.marker([inst.location.lat, inst.location.lng]).addTo(map);
          marker.bindPopup(`<b>${inst.name}</b><br>Rating: ${inst.averageRating}⭐<br><button id="btn-${inst.id}">View Profile</button>`);
          
          marker.on('popupopen', () => {
             const btn = document.getElementById(`btn-${inst.id}`);
             if(btn) {
                 btn.onclick = () => navigate(`/institution/${inst.id}`);
             }
          });
        }
      });
    } catch (error) {
      console.error("Failed to load institutions", error);
    }
  });

  return <div ref={mapContainer} style={{ height: "600px", width: "100%", "border-radius": "8px" }} />;
}
