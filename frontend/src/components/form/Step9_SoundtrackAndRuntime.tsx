import React from 'react';
import type { MovieFormData, SoundTrackData, StarRating } from '../../types/calculator.types';
import { StarRatingInput, NumberInput, Toggle, Slider } from './FormComponents';

interface Props {
  data: MovieFormData;
  onChange: (updates: Partial<MovieFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const RUNTIME_PRESETS = [
  { mins: 75, label: '75 min (1:15)' },
  { mins: 90, label: '90 min (1:30)' },
  { mins: 105, label: '105 min (1:45)' },
  { mins: 120, label: '120 min (2:00)' },
  { mins: 135, label: '135 min (2:15)' },
  { mins: 150, label: '150 min (2:30)' },
  { mins: 180, label: '180 min (3:00)' },
];

export const Step9SoundtrackAndRuntime: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const st = data.soundtrack;

  const updateSoundtrack = (updates: Partial<SoundTrackData>) => {
    onChange({ soundtrack: { ...st, ...updates } });
  };

  const updateTrack = (index: number, value: string) => {
    const newTracks = [...st.tracks];
    newTracks[index] = value;
    updateSoundtrack({ tracks: newTracks });
  };

  return (
    <div className="card" style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div className="card-header">
        <div className="card-icon">🎵</div>
        <div>
          <h2>Soundtrack y Running Time</h2>
          <p>Banda sonora y duración — afectan la experiencia y el presupuesto</p>
        </div>
      </div>

      {/* ===== RUNNING TIME ===== */}
      <div className="section-block">
        <h3 className="section-title">⏱️ Running Time</h3>
        <div className="runtime-selector">
          {RUNTIME_PRESETS.map(({ mins, label }) => (
            <button
              key={mins}
              type="button"
              className={`runtime-btn ${data.runningTimeMinutes === mins ? 'active' : ''}`}
              onClick={() => onChange({ runningTimeMinutes: mins })}
            >
              {label}
            </button>
          ))}
        </div>
        <Slider id="runningTime" label="Running Time (minutos)"
          hint={` — ${Math.floor(data.runningTimeMinutes / 60)}h ${data.runningTimeMinutes % 60}min`}
          value={data.runningTimeMinutes} min={60} max={240}
          onChange={(v) => onChange({ runningTimeMinutes: v })} />

        {data.runningTimeMinutes > 150 && (
          <div style={{
            marginTop: 12, padding: '10px 14px',
            background: 'var(--orange-dim)', border: '1px solid rgba(255,140,66,0.3)',
            borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--orange-warn)',
          }}>
            ⚠️ Películas de más de 2h30 reducen el número de proyecciones diarias en cines, afectando la taquilla potencial.
          </div>
        )}
      </div>

      {/* ===== SOUND TRACK ===== */}
      <div className="section-block">
        <h3 className="section-title">🎶 Sound Track</h3>
        <div className="toggle-group" style={{ marginBottom: 16 }}>
          <Toggle label="🎵 Sound Track"
            description="La producción incluye una banda sonora original"
            checked={st.hasSoundtrack}
            onChange={(v) => updateSoundtrack({ hasSoundtrack: v })} />
        </div>

        {st.hasSoundtrack && (
          <>
            <StarRatingInput id="artistStature" label="Recording Artist's Stature"
              hint=" — fama del artista"
              value={st.recordingArtistStature}
              onChange={(v: StarRating) => updateSoundtrack({ recordingArtistStature: v })}
              tooltip="Nivel de fama del artista de la banda sonora. Mayor stature = mayor costo, mayor hype." />

            <div style={{ marginTop: 20 }}>
              <h4 className="subsection-title">Tracks (hasta 12)</h4>
              <div className="tracks-grid">
                {st.tracks.map((track, index) => (
                  <div className="form-group" key={index}>
                    <label htmlFor={`track-${index}`}>Track {index + 1}</label>
                    <input id={`track-${index}`} type="text" value={track}
                      onChange={(e) => updateTrack(index, e.target.value)}
                      placeholder={`Track ${index + 1}...`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="form-grid" style={{ marginTop: 16 }}>
              <NumberInput id="musicClearance" label="Music Clearance Rights"
                hint=" ($)" value={st.musicClearanceRights} min={0}
                onChange={(v) => updateSoundtrack({ musicClearanceRights: v })}
                tooltip="Costo de derechos de música. Más tracks y artistas famosos = más caro." />
              <NumberInput id="recordCompanyPct" label="Record Company Percent"
                hint=" (%)" value={st.recordCompanyPercent} min={0} max={100}
                onChange={(v) => updateSoundtrack({ recordCompanyPercent: v })}
                tooltip="Porcentaje de ingresos de la banda sonora para la discográfica." />
            </div>
          </>
        )}
      </div>

      <div className="step-nav">
        <button className="btn btn-secondary" onClick={onBack}>← Producción</button>
        <button className="btn btn-primary" onClick={onNext}>
          Siguiente: Marketing →
        </button>
      </div>
    </div>
  );
};
