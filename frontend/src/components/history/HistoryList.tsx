import React, { useState, useEffect } from 'react';
import { HistoryItem } from '../../types/calculator.types';
import { getHistory, deleteHistory } from '../../api/calculatorApi';

export const HistoryList: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const data = await getHistory();
      setHistory(data);
    } catch (e) {
      setError('No se pudo cargar el historial. ¿El backend está corriendo?');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteHistory(id);
    setHistory(h => h.filter(item => item.id !== id));
  };

  if (loading) return (
    <div className="loading-overlay">
      <div className="loading-spinner" />
      <div className="loading-text">Cargando historial...</div>
    </div>
  );

  if (error) return (
    <div className="empty-state">
      <div className="empty-icon">⚠️</div>
      <p>{error}</p>
    </div>
  );

  if (history.length === 0) return (
    <div className="empty-state">
      <div className="empty-icon">🎬</div>
      <p>No hay cálculos guardados todavía.<br />Realiza tu primer análisis para verlo aquí.</p>
    </div>
  );

  return (
    <div className="card" style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div className="card-header">
        <div className="card-icon">📜</div>
        <div>
          <h2>Historial de Análisis</h2>
          <p>Últimos 20 cálculos realizados</p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="history-table">
          <thead>
            <tr>
              <th>Película</th>
              <th>Género</th>
              <th>Budget</th>
              <th>FBP</th>
              <th>IAB</th>
              <th>Riesgo</th>
              <th>Fecha</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td className="title-cell">{item.movieTitle || '(Sin título)'}</td>
                <td>{item.genre}</td>
                <td>
                  {item.budget >= 1e6
                    ? `$${(item.budget / 1e6).toFixed(0)}M`
                    : `$${(item.budget / 1e3).toFixed(0)}K`}
                </td>
                <td><span className="fbp-pill">{Number(item.fbp).toFixed(0)}%</span></td>
                <td><span className="iab-pill">{Number(item.iab).toFixed(0)}%</span></td>
                <td>
                  <span className={`risk-badge ${item.riskLabel}`}>
                    {item.riskLabel}
                  </span>
                </td>
                <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {new Date(item.createdAt).toLocaleDateString('es-ES', {
                    day: '2-digit', month: 'short', year: '2-digit',
                  })}
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    style={{ padding: '4px 8px', fontSize: '0.72rem' }}
                    onClick={() => handleDelete(item.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
