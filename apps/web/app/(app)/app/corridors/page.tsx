import React from 'react';
import { CorridorMap } from '../../../../components/corridor-map';

export default function CorridorsPage() {
  return (
    <div>
      <h1>Grid Corridors</h1>
      <div className="card" style={{ marginBottom: 24 }}>
        <CorridorMap />
      </div>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Capacity (MW)</th>
              <th>Utilization</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Northern Cape → Gauteng</td>
              <td>Active</td>
              <td>1200</td>
              <td>62%</td>
            </tr>
            <tr>
              <td>Eastern Cape → Mpumalanga</td>
              <td>Planned</td>
              <td>900</td>
              <td>Projected</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
