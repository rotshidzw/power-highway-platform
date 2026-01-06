import React from 'react';

export default function AdminUsersPage() {
  return (
    <div>
      <h1>User Administration</h1>
      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>admin@nph.co.za</td>
              <td>SUPER_ADMIN</td>
              <td>Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
