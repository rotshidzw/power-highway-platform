import { Card } from '@nph/ui';
import React from 'react';

export default function DashboardPage() {
  return (
    <div>
      <h1>National Grid Dashboard</h1>
      <div className="grid">
        <Card title="Available Capacity (MW)">4,200</Card>
        <Card title="Active Wheeling Contracts">128</Card>
        <Card title="Monthly Wheeling Revenue">R 42.5m</Card>
        <Card title="Utilization">68%</Card>
      </div>
    </div>
  );
}
