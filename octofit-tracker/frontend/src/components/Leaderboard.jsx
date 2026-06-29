import { useEffect, useState } from 'react';
import { getCollectionData } from '../utils/api.js';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
        const apiBaseUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev`
          : 'http://localhost:8000';
        const response = await fetch(`${apiBaseUrl}/api/leaderboard/`);
        if (!response.ok) {
          throw new Error('Unable to load leaderboard');
        }

        const payload = await response.json();
        setEntries(getCollectionData(payload));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Leaderboard</h2>
      {loading && <p className="text-muted">Loading leaderboard…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="list-group">
          {entries.map((entry) => (
            <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || entry.id || entry.rank}>
              <div>
                <div className="fw-bold">{entry.user?.name || entry.username || 'Athlete'}</div>
                <div className="small text-muted">Rank #{entry.rank || '—'}</div>
              </div>
              <span className="badge bg-primary rounded-pill">{entry.score || 0}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Leaderboard;
