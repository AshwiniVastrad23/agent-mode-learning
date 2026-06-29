import { useEffect, useState } from 'react';
import { buildApiUrl, getCollectionData } from '../utils/api.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(buildApiUrl('teams'));
        if (!response.ok) {
          throw new Error('Unable to load teams');
        }

        const payload = await response.json();
        setTeams(getCollectionData(payload));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      {loading && <p className="text-muted">Loading teams…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-md-6" key={team._id || team.id || team.name}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h3 className="h6 fw-bold">{team.name}</h3>
                  <p className="mb-1 text-muted">{team.sport || 'Fitness'}</p>
                  <p className="mb-0 small">Members: {team.members?.length || team.members || 0}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Teams;
