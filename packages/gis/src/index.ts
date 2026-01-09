export const metersToKm = (meters: number): number => meters / 1000;

export const toGeoJsonFeature = (geometry: GeoJSON.Geometry, properties: Record<string, unknown>) => ({
  type: 'Feature',
  geometry,
  properties,
});

export const corridorLengthSql = `SELECT ST_Length(geometry::geography) AS length_meters FROM grid_corridors WHERE id = $1;`;
