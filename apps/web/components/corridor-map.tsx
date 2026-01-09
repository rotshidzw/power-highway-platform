'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

const corridorGeoJson = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [20.0, -30.0],
          [28.0, -26.0],
        ],
      },
      properties: {
        name: 'Northern Cape → Gauteng',
        capacityMw: 1200,
        utilization: 0.62,
      },
    },
  ],
} as const;

export const CorridorMap = () => (
  <MapContainer style={{ height: 320, width: '100%' }} center={[-28, 24]} zoom={5}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <GeoJSON data={corridorGeoJson} />
  </MapContainer>
);
