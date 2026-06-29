import { useEffect, useState } from 'react';
import { getCollectionData } from '../utils/api.js';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
        const apiUrl = codespaceName
          ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
          : 'http://localhost:8000/api/activities/';
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Unable to load activities');
        }

        const payload = await response.json();
        setActivities(getCollectionData(payload));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      {loading && <p className="text-muted">Loading activities…</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <div className="row g-3">
          {activities.map((activity) => (
            <div className="col-md-6" key={activity._id || activity.id || activity.type}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h3 className="h6 fw-bold">{activity.type}</h3>
                  <p className="mb-1 text-muted">{activity.user?.name || 'Unknown athlete'}</p>
                  <p className="mb-0 small">{activity.durationMinutes} min • {activity.distanceKm ? `${activity.distanceKm} km` : 'No distance logged'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Activities;
