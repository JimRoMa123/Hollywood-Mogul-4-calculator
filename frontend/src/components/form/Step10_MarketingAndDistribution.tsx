import React from 'react';
import type { MovieFormData, MarketData } from '../../types/calculator.types';
import { MARKETING_FOCUS_OPTIONS } from '../../types/calculator.types';
import { Toggle, Slider, Select } from './FormComponents';

interface Props {
  data: MovieFormData;
  onChange: (updates: Partial<MovieFormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  loading: boolean;
}

const DEFAULT_MARKETS: MarketData[] = [
  { marketName: 'Domestic (USA)', focus: 'None', televisionAds: 0, deviceVideoAds: 0, deviceBannerAds: 0, events: 0, crossPromotions: 0 },
  { marketName: 'UK & Ireland', focus: 'None', televisionAds: 0, deviceVideoAds: 0, deviceBannerAds: 0, events: 0, crossPromotions: 0 },
  { marketName: 'Europe', focus: 'None', televisionAds: 0, deviceVideoAds: 0, deviceBannerAds: 0, events: 0, crossPromotions: 0 },
  { marketName: 'Asia Pacific', focus: 'None', televisionAds: 0, deviceVideoAds: 0, deviceBannerAds: 0, events: 0, crossPromotions: 0 },
  { marketName: 'Latin America', focus: 'None', televisionAds: 0, deviceVideoAds: 0, deviceBannerAds: 0, events: 0, crossPromotions: 0 },
];

export const Step10MarketingAndDistribution: React.FC<Props> = ({ data, onChange, onSubmit, onBack, loading }) => {
  const campaign = data.marketingCampaign;

  const updateCampaign = (updates: Partial<typeof campaign>) => {
    onChange({ marketingCampaign: { ...campaign, ...updates } });
  };

  const updateMarket = (index: number, updates: Partial<MarketData>) => {
    const newMarkets = [...campaign.markets];
    newMarkets[index] = { ...newMarkets[index], ...updates };
    updateCampaign({ markets: newMarkets });
  };

  const addMarket = () => {
    updateCampaign({
      markets: [...campaign.markets, { marketName: 'New Market', focus: 'None', televisionAds: 0, deviceVideoAds: 0, deviceBannerAds: 0, events: 0, crossPromotions: 0 }],
    });
  };

  const removeMarket = (index: number) => {
    updateCampaign({ markets: campaign.markets.filter((_, i) => i !== index) });
  };

  // Ensure markets exist
  React.useEffect(() => {
    if (campaign.markets.length === 0) {
      updateCampaign({ markets: DEFAULT_MARKETS });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card" style={{ animation: 'fadeInUp 0.4s ease' }}>
      <div className="card-header">
        <div className="card-icon">🌐</div>
        <div>
          <h2>Marketing, Distribución y Lanzamiento</h2>
          <p>Campañas publicitarias, flags de contenido y ruta de distribución</p>
        </div>
      </div>

      {/* Distribution Mode */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ marginBottom: 16, fontSize: '0.85rem', textTransform: 'uppercase',
          letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
          Ruta de Distribución
        </h3>
        <div className="distribution-grid">
          {[
            { mode: 'cinema', icon: '🎞️', title: 'Estreno en Cines', desc: 'Máximo potencial, máximo riesgo' },
            { mode: 'streaming', icon: '📱', title: 'Streaming Directo', desc: 'Estabilidad sin riesgo de decay' },
            { mode: 'presale', icon: '🌍', title: 'Preventa 19 Mercados', desc: 'Amortización instantánea' },
          ].map(({ mode, icon, title, desc }) => (
            <div
              key={mode}
              className={`dist-option ${data.distributionMode === mode ? 'active' : ''}`}
              onClick={() => onChange({ distributionMode: mode })}
            >
              <div className="dist-icon">{icon}</div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Content Flags */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ marginBottom: 16, fontSize: '0.85rem', textTransform: 'uppercase',
          letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
          Flags de Contenido
        </h3>
        <div className="toggle-group">
          <Toggle
            label="🔞 Desnudez (Nudity)"
            description="Eleva a clasificación R/+18, restringe elenco, añade prima salarial del 20-40%"
            checked={data.hasNudity}
            onChange={(v) => onChange({ hasNudity: v })}
          />
          <Toggle
            label="🌩️ Villanos Adicionales (Additional Villains)"
            description="Activa eventos de desastres climáticos, incendios y plagas en el set"
            checked={data.hasAdditionalVillains}
            onChange={(v) => onChange({ hasAdditionalVillains: v })}
          />
        </div>
      </div>

      {/* Franchise Mode */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ marginBottom: 16, fontSize: '0.85rem', textTransform: 'uppercase',
          letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
          Modo Franquicia / Universo
        </h3>
        <div className="toggle-group" style={{ marginBottom: 16 }}>
          <Toggle
            label="🏛️ Película dentro de Franquicia / Universo"
            description="Activa el Momento de Inercia Estructural (Hype Momentum)"
            checked={data.franchiseMode}
            onChange={(v) => onChange({ franchiseMode: v })}
          />
        </div>
        {data.franchiseMode && (
          <Slider
            id="franchiseMomentum"
            label="Momentum de la Franquicia"
            hint=" (0 = nuevo, 100 = MCU-level)"
            value={data.franchiseMomentum}
            min={0}
            onChange={(v) => onChange({ franchiseMomentum: v })}
          />
        )}
      </div>

      {/* ===== MARKETING CAMPAIGN ===== */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ marginBottom: 16, fontSize: '0.85rem', textTransform: 'uppercase',
          letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
          🎯 Marketing Campaign
        </h3>

        <Select id="globalFocus" label="Global Focus Strategy" value={campaign.globalFocus}
          options={MARKETING_FOCUS_OPTIONS}
          onChange={(v) => updateCampaign({ globalFocus: v })} />

        <div className="markets-list" style={{ marginTop: 20 }}>
          {campaign.markets.map((market, index) => (
            <div className="market-card" key={index}>
              <div className="market-card-header">
                <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                  <input type="text" value={market.marketName}
                    onChange={(e) => updateMarket(index, { marketName: e.target.value })}
                    placeholder="Market name..." style={{ fontWeight: 600 }} />
                </div>
                {index > 0 && (
                  <button className="btn btn-danger" style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    onClick={() => removeMarket(index)}>×</button>
                )}
              </div>
              <Select id={`mktFocus-${index}`} label="Focus" value={market.focus}
                options={MARKETING_FOCUS_OPTIONS}
                onChange={(v) => updateMarket(index, { focus: v })} />
              <div className="market-channels">
                <Slider id={`tvAds-${index}`} label="Television Ads" value={market.televisionAds}
                  min={0} max={100} onChange={(v) => updateMarket(index, { televisionAds: v })} />
                <Slider id={`devVideo-${index}`} label="Device Video Ads" value={market.deviceVideoAds}
                  min={0} max={100} onChange={(v) => updateMarket(index, { deviceVideoAds: v })} />
                <Slider id={`devBanner-${index}`} label="Device Banner Ads" value={market.deviceBannerAds}
                  min={0} max={100} onChange={(v) => updateMarket(index, { deviceBannerAds: v })} />
                <Slider id={`events-${index}`} label="Events" value={market.events}
                  min={0} max={100} onChange={(v) => updateMarket(index, { events: v })} />
                <Slider id={`crossPromo-${index}`} label="Cross Promotions" value={market.crossPromotions}
                  min={0} max={100} onChange={(v) => updateMarket(index, { crossPromotions: v })} />
              </div>
            </div>
          ))}
          {campaign.markets.length < 19 && (
            <button className="add-cast-btn" onClick={addMarket}>
              + Añadir Mercado
            </button>
          )}
        </div>
      </div>

      {/* Bankruptcy warning */}
      {data.hasAdditionalVillains && data.studioCash > 0 && data.budget > 0 && (
        (() => {
          const contingency = data.studioCash - data.budget - data.marketingBudget;
          const ratio = contingency / data.budget;
          if (ratio < 0.15) return (
            <div style={{
              padding: '14px 16px', marginBottom: 20,
              background: 'var(--red-dim)', border: '1px solid rgba(255,61,87,0.4)',
              borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: '#ff8095',
            }}>
              ⚠️ <strong>ALERTA CRÍTICA:</strong> Con Villanos Adicionales y solo{' '}
              {Math.round(ratio * 100)}% de fondo de contingencia, probabilidad de quiebra {'>'} 85%.
            </div>
          );
          return null;
        })()
      )}

      <div className="step-nav">
        <button className="btn btn-secondary" onClick={onBack}>← Soundtrack</button>
        <button
          className="btn btn-primary btn-large"
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <span style={{ display: 'inline-block', width: 16, height: 16,
                border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000',
                borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
              Calculando...
            </>
          ) : '🎬 Calcular Viabilidad'}
        </button>
      </div>
    </div>
  );
};
