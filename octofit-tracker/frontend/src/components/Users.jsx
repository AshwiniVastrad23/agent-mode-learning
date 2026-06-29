import { useEffect, useState } from 'react';
import { getApiBaseUrl, getCollectionData } from '../utils/api.js';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(`${getApiBaseUrl()}/api/users/`);
        if (!response.ok) {
          throw new Error('Unable to load users');
        }

        const payload = await response.json();
        setUsers(getCollectionData(payload));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      {loading && <p className="text-muted">Loading users…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="row g-3">
          {users.map((user) => (
            <div className="col-md-6" key={user._id || user.id || `${user.name}-${user.email}`}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h3 className="h6 fw-bold">{user.name}</h3>
                  <p className="mb-1 text-muted">{user.email}</p>
                  <p className="mb-0 small">Goal: {user.fitnessGoal || 'General fitness'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Users;
