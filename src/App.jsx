import React, { useState, useEffect, useCallback, useMemo } from 'react';


const STRAINS = [
  // Royal Queen Seeds
  { id: 's1', name: 'Royal Dwarf Auto', breeder: 'Royal Queen Seeds', thc: 13, cbd: 0.5, days: [56, 70], height: [40, 70], yield: '200-300', level: 'Principiante' },
  { id: 's2', name: 'Amnesia Haze Auto', breeder: 'Royal Queen Seeds', thc: 15, cbd: 0.3, days: [70, 84], height: [50, 100], yield: '400', level: 'Intermedio' },
  { id: 's3', name: 'HulkBerry Auto', breeder: 'Royal Queen Seeds', thc: 21, cbd: 0.2, days: [70, 84], height: [60, 100], yield: '400-450', level: 'Intermedio' },
  { id: 's6', name: 'Haze Berry Auto', breeder: 'Royal Queen Seeds', thc: 13, cbd: 0.3, days: [70, 77], height: [80, 130], yield: '350-400', level: 'Intermedio' },
  { id: 's8', name: 'Quick One Auto', breeder: 'Royal Queen Seeds', thc: 13, cbd: 0.5, days: [56, 63], height: [40, 60], yield: '150-200', level: 'Principiante' },
  { id: 's9', name: 'Royal Gorilla Automatic', breeder: 'Royal Queen Seeds', thc: 20, cbd: 0.2, days: [56, 70], height: [60, 100], yield: '350-400', level: 'Intermedio' },
  { id: 's10', name: 'Pink Runtz Automatic', breeder: 'Royal Queen Seeds', thc: 22, cbd: 0.2, days: [70, 80], height: [60, 110], yield: '400-450', level: 'Intermedio' },
  { id: 's11', name: 'Purple Lemonade Auto', breeder: 'Royal Queen Seeds', thc: 22, cbd: 0.2, days: [70, 84], height: [50, 90], yield: '400-475', level: 'Intermedio' },
  { id: 's12', name: 'Triple G Automatic', breeder: 'Royal Queen Seeds', thc: 20, cbd: 0.2, days: [56, 70], height: [50, 90], yield: '350-400', level: 'Intermedio' },
  { id: 's13', name: 'Cookies Gelato Automatic', breeder: 'Royal Queen Seeds', thc: 21, cbd: 0.2, days: [70, 84], height: [60, 100], yield: '400-450', level: 'Intermedio' },

  // ILGM
  { id: 's4', name: 'GG Auto (Gorilla Glue)', breeder: 'ILGM', thc: 22, cbd: 0.1, days: [70, 80], height: [70, 100], yield: '450-500', level: 'Intermedio/Avanzado' },
  { id: 's5', name: 'Northern Lights Auto', breeder: 'ILGM', thc: 18, cbd: 0.4, days: [56, 70], height: [60, 100], yield: '350-400', level: 'Principiante' },
  { id: 's14', name: 'White Widow Auto', breeder: 'ILGM', thc: 19, cbd: 0.3, days: [56, 70], height: [60, 100], yield: '350-400', level: 'Principiante' },
  { id: 's15', name: 'Critical Mass Auto', breeder: 'ILGM', thc: 22, cbd: 0.3, days: [56, 70], height: [50, 90], yield: '350-400', level: 'Principiante' },
  { id: 's16', name: 'Blue Dream Auto', breeder: 'ILGM', thc: 22, cbd: 0.2, days: [56, 63], height: [60, 100], yield: '350-400', level: 'Principiante' },
  { id: 's17', name: 'Green Crack Auto', breeder: 'ILGM', thc: 20, cbd: 0.2, days: [70, 84], height: [60, 100], yield: '300-350', level: 'Principiante' },
  { id: 's18', name: 'Bruce Banner Auto', breeder: 'ILGM', thc: 25, cbd: 0.1, days: [60, 70], height: [60, 100], yield: '350-400', level: 'Intermedio' },
  { id: 's19', name: 'AK-47 Auto', breeder: 'ILGM', thc: 18, cbd: 0.3, days: [56, 63], height: [50, 90], yield: '300-350', level: 'Principiante' },

  // Blimburn Seeds
  { id: 's7', name: 'Z OG Auto', breeder: 'Blimburn Seeds', thc: 20, cbd: 0.2, days: [63, 70], height: [60, 90], yield: '400-450', level: 'Intermedio' },

  // Fast Buds
  { id: 's20', name: 'Girl Scout Cookies Auto', breeder: 'Fast Buds', thc: 22, cbd: 0.2, days: [56, 63], height: [60, 100], yield: '450-600', level: 'Intermedio' },
  { id: 's21', name: 'Gorilla Cookies Auto', breeder: 'Fast Buds', thc: 25, cbd: 0.1, days: [70, 80], height: [60, 100], yield: '400-450', level: 'Intermedio/Avanzado' },
  { id: 's22', name: 'Lemon Cherry Cookies Auto', breeder: 'Fast Buds', thc: 28, cbd: 0.1, days: [60, 75], height: [60, 100], yield: '400-450', level: 'Avanzado' },
  { id: 's23', name: 'Gelato Auto', breeder: 'Fast Buds', thc: 26, cbd: 0.1, days: [63, 70], height: [60, 90], yield: '350-450', level: 'Intermedio/Avanzado' },
  { id: 's24', name: 'Banana Purple Punch Auto', breeder: 'Fast Buds', thc: 24, cbd: 0.2, days: [56, 56], height: [60, 90], yield: '350-400', level: 'Intermedio' },
  { id: 's25', name: 'Blackberry Auto', breeder: 'Fast Buds', thc: 22, cbd: 0.2, days: [56, 56], height: [60, 90], yield: '350-400', level: 'Intermedio' },

  // Dutch Passion
  { id: 's26', name: 'Ultimate Auto', breeder: 'Dutch Passion', thc: 15, cbd: 0.2, days: [70, 84], height: [80, 130], yield: '500-600', level: 'Intermedio/Avanzado' },
  { id: 's27', name: 'Auto Skywalker Haze', breeder: 'Dutch Passion', thc: 25, cbd: 0.2, days: [70, 84], height: [70, 110], yield: '400-450', level: 'Avanzado' },
  { id: 's28', name: 'Cinderella Jack Auto', breeder: 'Dutch Passion', thc: 22, cbd: 0.2, days: [63, 70], height: [60, 100], yield: '350-400', level: 'Intermedio' },
  { id: 's49', name: 'Auto Power Plant', breeder: 'Dutch Passion', thc: 20, cbd: 0.2, days: [84, 98], height: [75, 125], yield: '500-600', level: 'Intermedio' },

  // Mr Smile Seeds
  { id: 's50', name: 'Jack Mist Auto', breeder: 'Mr Smile Seeds', thc: 20, cbd: 0, days: [60, 65], height: [50, 100], yield: '400-550', level: 'Intermedio' },
  { id: 's51', name: 'White Widow Auto', breeder: 'Mr Smile Seeds', thc: 20, cbd: 0, days: [55, 65], height: [40, 80], yield: '300-400', level: 'Principiante' },

  // Seedstockers / Auto Seeds (clásicas)
  { id: 's29', name: 'Skunk Auto', breeder: 'Seedstockers', thc: 16, cbd: 0.3, days: [56, 63], height: [50, 90], yield: '300-350', level: 'Principiante' },
  { id: 's30', name: 'Jack Herer Auto', breeder: 'Seedstockers', thc: 19, cbd: 0.2, days: [63, 70], height: [60, 100], yield: '350-400', level: 'Intermedio' },
  { id: 's31', name: 'Sour Diesel Auto', breeder: 'Seedstockers', thc: 20, cbd: 0.2, days: [63, 70], height: [60, 100], yield: '350-400', level: 'Intermedio' },

  // Mephisto Genetics
  { id: 's32', name: 'Double Grape Auto', breeder: 'Mephisto Genetics', thc: 26, cbd: 0.1, days: [70, 75], height: [50, 90], yield: '300-350 g/planta', level: 'Avanzado' },
  { id: 's33', name: '3 Bears OG Auto', breeder: 'Mephisto Genetics', thc: 24, cbd: 0.1, days: [72, 78], height: [50, 90], yield: '300-350 g/planta', level: 'Intermedio/Avanzado' },
  { id: 's34', name: 'Creme de la Chem Auto', breeder: 'Mephisto Genetics', thc: 22, cbd: 0.1, days: [70, 78], height: [60, 100], yield: '300-350 g/planta', level: 'Intermedio' },

  // Ethos Genetics
  { id: 's35', name: 'Pluto Cut Auto R F3', breeder: 'Ethos Genetics', thc: 25, cbd: 0.1, days: [80, 80], height: [50, 80], yield: '350-400', level: 'Avanzado' },

  // CBD-forward (uso terapéutico)
  { id: 's36', name: 'CBD Cheese Auto', breeder: 'Varios', thc: 6, cbd: 12, days: [70, 84], height: [50, 90], yield: '250-300', level: 'Principiante' },
  { id: 's37', name: 'CBD White Widow Auto', breeder: 'Varios', thc: 7, cbd: 8, days: [56, 70], height: [50, 90], yield: '250-300', level: 'Principiante' },
  { id: 's38', name: 'CBD Critical Mass Auto', breeder: 'Varios', thc: 5, cbd: 5, days: [56, 70], height: [50, 90], yield: '250-300', level: 'Principiante' },

  // Otoño / exterior y resistentes
  { id: 's39', name: 'Godfather OG Auto', breeder: 'Seed Supreme', thc: 25, cbd: 0.1, days: [56, 70], height: [50, 90], yield: '350-400', level: 'Intermedio' },
  { id: 's40', name: 'White Russian Auto', breeder: 'Seed Supreme', thc: 20, cbd: 0.2, days: [56, 70], height: [50, 90], yield: '300-350', level: 'Principiante' },
  { id: 's41', name: 'Durban Poison Auto', breeder: 'Seed Supreme', thc: 21, cbd: 0.2, days: [70, 77], height: [80, 130], yield: '350-400', level: 'Intermedio' },

  // Sativas energizantes / otros
  { id: 's42', name: 'NYC Diesel Auto', breeder: 'Varios', thc: 19, cbd: 0.2, days: [56, 70], height: [60, 100], yield: '300-350', level: 'Intermedio' },
  { id: 's43', name: 'Do-Si-Dos Auto', breeder: 'Varios', thc: 20, cbd: 0.2, days: [63, 70], height: [50, 90], yield: '300-350', level: 'Intermedio' },
  { id: 's44', name: 'LSD Auto', breeder: 'Varios', thc: 18, cbd: 0.2, days: [42, 56], height: [50, 80], yield: '300-350', level: 'Principiante' },
  { id: 's45', name: 'Auto Haze XL', breeder: 'Varios', thc: 18, cbd: 0.2, days: [70, 84], height: [80, 120], yield: '350-400', level: 'Intermedio' },
];

const PHASE_TEMPLATE = [
  { id: 'germination', name: 'Germinación', pct: 0.04, trichome: 0,
    npk: 'N/A', ec: '0–0.4', ph: '6.0–6.5', vpd: '—', temp: '22–26°C', hr: '70–90%',
    notes: 'Sustrato húmedo, nunca encharcado. Sin fertilizante.' },
  { id: 'seedling', name: 'Plántula', pct: 0.09, trichome: 0,
    npk: 'Mínimo', ec: '0.4–0.8', ph: '6.0–6.5', vpd: '0.4–0.8 kPa', temp: '22–26°C', hr: '65–70%',
    notes: 'Cero o mínimo fertilizante. Vigilar primera hoja verdadera.' },
  { id: 'veg_early', name: 'Vegetativo Temprano', pct: 0.13, trichome: 0,
    npk: 'N alto / P bajo / K medio', ec: '0.8–1.2', ph: '6.2–6.8', vpd: '0.8–1.1 kPa', temp: '24–28°C', hr: '55–65%',
    notes: 'Introducir fertilizante al 25–50% dosis. Iniciar LST si se desea.' },
  { id: 'veg_late', name: 'Vegetativo Avanzado', pct: 0.13, trichome: 0,
    npk: 'N alto / P medio / K medio-alto', ec: '1.2–1.8', ph: '6.2–6.8', vpd: '0.8–1.2 kPa', temp: '24–28°C', hr: '50–65%',
    notes: 'Dosis completa de vegetativo. NO topping en autoflorecientes.' },
  { id: 'preflower', name: 'Pre-Floración', pct: 0.09, trichome: 1,
    npk: 'N bajando / P y K subiendo', ec: '1.0–1.4', ph: '6.0–6.8', vpd: '1.0–1.5 kPa', temp: '20–26°C', hr: '45–55%',
    notes: 'Primeros pistilos blancos. Confirmar sexo. Cambiar a fertilizante de floración.' },
  { id: 'flower_early', name: 'Floración Temprana', pct: 0.17, trichome: 1,
    npk: 'N bajo / P alto / K alto', ec: '1.4–2.0', ph: '6.0–6.8', vpd: '1.0–1.5 kPa', temp: '20–26°C', hr: '45–50%',
    notes: 'Formación de brácteas. Introducir Cal-Mag si está en coco.' },
  { id: 'flower_peak', name: 'Floración Pico', pct: 0.22, trichome: 2,
    npk: 'N muy bajo / P y K máximos', ec: '1.8–2.4', ph: '6.0–6.8', vpd: '1.2–1.6 kPa', temp: '22–26°C', hr: '40–50%',
    notes: 'PK booster. Bajar HR para prevenir botrytis. Bajar temp. nocturna.' },
  { id: 'maturation', name: 'Maduración', pct: 0.13, trichome: 3,
    npk: 'Ninguno (flush)', ec: '0–0.4', ph: '6.0–6.5', vpd: '1.5–2.0 kPa', temp: '18–24°C', hr: '35–45%',
    notes: 'Iniciar flush 3–5 días antes. Cosechar con 70–80% tricomas lechosos.' },
];

const TRICHOME_LABEL = ['Transparente', 'Transparente', 'Lechoso', 'Lechoso / Ámbar'];
const DIARIO_STORAGE_KEY = 'diario-plants-list';
const POT_EMOJIS = ['🌱', '🌿', '🪴'];

const LOG_TYPES = [
  { id: 'water', label: 'Riego', icon: '💧', color: '#5B9BD5' },
  { id: 'feed', label: 'Fertilización', icon: '🧪', color: '#E0A05E' },
  { id: 'training', label: 'Entrenamiento', icon: '✂️', color: '#E8674A' },
  { id: 'note', label: 'Observación', icon: '📝', color: '#C2A896' },
  { id: 'photo', label: 'Foto', icon: '📷', color: '#C77DBA' },
];

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + Math.round(days));
  return d;
}
function formatDate(date) {
  return date.toLocaleDateString('es-AR', { day: '2-digit', month: 'short' });
}
function diarioUid() {
  return Math.random().toString(36).slice(2, 10);
}

function computeSchedule(strain, startDateStr) {
  const totalDays = Math.round((strain.days[0] + strain.days[1]) / 2);
  const start = new Date(startDateStr + 'T00:00:00');

  // Calcula duraciones garantizando que la suma sea exactamente totalDays
  // (evita drift por redondeo acumulado en cada fase)
  const rawDurations = PHASE_TEMPLATE.map(p => p.pct * totalDays);
  const flooredDurations = rawDurations.map(d => Math.max(1, Math.floor(d)));
  let remainder = totalDays - flooredDurations.reduce((a, b) => a + b, 0);
  // Distribuye los días restantes a las fases con mayor parte decimal perdida
  const remainders = rawDurations.map((d, i) => ({ i, frac: d - Math.floor(d) }))
    .sort((a, b) => b.frac - a.frac);
  let idx = 0;
  while (remainder > 0 && idx < remainders.length) {
    flooredDurations[remainders[idx].i] += 1;
    remainder--;
    idx++;
  }

  let cursor = 0;
  const schedule = PHASE_TEMPLATE.map((phase, i) => {
    const dur = flooredDurations[i];
    const phaseStart = addDays(start, cursor);
    const phaseEnd = addDays(start, cursor + dur - 1);
    cursor += dur;
    return { ...phase, duration: dur, startDate: phaseStart, endDate: phaseEnd, dayRangeStart: cursor - dur + 1, dayRangeEnd: cursor };
  });
  return { schedule, totalDays };
}

function getProgress(plant) {
  const strain = STRAINS.find(s => s.id === plant.strainId) || STRAINS[0];
  const { schedule, totalDays } = computeSchedule(strain, plant.startDate);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const start0 = new Date(plant.startDate + 'T00:00:00');
  const elapsedDays = Math.floor((today - start0) / 86400000);
  const rawIndex = schedule.findIndex(p => elapsedDays >= p.dayRangeStart - 1 && elapsedDays <= p.dayRangeEnd - 1);
  const safeCurrentIndex = rawIndex === -1 ? (elapsedDays < 0 ? 0 : schedule.length - 1) : rawIndex;
  const harvestDate = schedule[schedule.length - 1].endDate;
  const isHarvested = elapsedDays > schedule[schedule.length - 1].dayRangeEnd;
  return { strain, schedule, totalDays, elapsedDays, currentPhaseIndex: safeCurrentIndex, harvestDate, isHarvested };
}

async function loadPlants() {
  try {
    const res = await window.storage.get(DIARIO_STORAGE_KEY, false);
    if (res && res.value) return JSON.parse(res.value);
    return [];
  } catch (e) {
    return [];
  }
}
async function savePlants(plants) {
  try {
    const result = await window.storage.set(DIARIO_STORAGE_KEY, JSON.stringify(plants), false);
    return !!result;
  } catch (e) {
    console.error('Error guardando plantas', e);
    return false;
  }
}

function DiarioModule() {
  const [plants, setPlants] = useState(null);
  const [view, setView] = useState({ screen: 'cover' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    loadPlants().then(setPlants);
  }, []);

  const persist = useCallback((next) => {
    setPlants(next);
    savePlants(next).then(ok => {
      setSaveError(!ok);
    });
  }, []);

  const addPlant = (data) => {
    const newPlant = {
      id: diarioUid(),
      name: data.name || `Planta ${(plants?.length || 0) + 1}`,
      strainId: data.strainId,
      startDate: data.startDate,
      potEmoji: data.potEmoji,
      archived: false,
      createdAt: Date.now(),
    };
    persist([...(plants || []), newPlant]);
    setShowAddModal(false);
  };

  const archivePlant = (id) => {
    persist(plants.map(p => p.id === id ? { ...p, archived: true, archivedAt: Date.now() } : p));
  };

  const deletePlant = (id) => {
    persist(plants.filter(p => p.id !== id));
  };

  const renamePlant = (id, name) => {
    persist(plants.map(p => p.id === id ? { ...p, name } : p));
  };

  const addLogEntry = (plantId, entry) => {
    const newEntry = { id: diarioUid(), createdAt: Date.now(), ...entry };
    persist(plants.map(p =>
      p.id === plantId
        ? { ...p, log: [...(p.log || []), newEntry] }
        : p
    ));
  };

  const deleteLogEntry = (plantId, entryId) => {
    persist(plants.map(p =>
      p.id === plantId
        ? { ...p, log: (p.log || []).filter(e => e.id !== entryId) }
        : p
    ));
  };

  if (plants === null) {
    return (
      <div style={{ minHeight: '100vh', background: '#1E1410', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <DiarioGlobalStyle />
        <div className="mono" style={{ color: '#9C8070', fontSize: 13 }}>Cargando bitácora…</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#1E1410', color: '#F5EBE0', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <DiarioGlobalStyle />
      {saveError && (
        <div style={{
          position: 'sticky', top: 0, zIndex: 150, background: '#C2453A', color: '#1E1410',
          padding: '9px 16px', fontSize: 12.5, fontWeight: 700, textAlign: 'center',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          ⚠ No se pudo guardar el último cambio. Verificá tu conexión y volvé a intentar.
          <button
            onClick={() => setSaveError(false)}
            style={{ background: 'none', border: 'none', color: '#1E1410', cursor: 'pointer', fontWeight: 900, fontSize: 14, padding: 0, marginLeft: 6 }}
          >✕</button>
        </div>
      )}
      {view.screen === 'cover' && (
        <DiarioCoverScreen
          plants={plants}
          onOpenPlant={(id) => setView({ screen: 'detail', plantId: id })}
          onAddClick={() => setShowAddModal(true)}
          onArchive={archivePlant}
          onDelete={deletePlant}
        />
      )}
      {view.screen === 'detail' && (
        <DetailScreen
          plant={plants.find(p => p.id === view.plantId)}
          onBack={() => setView({ screen: 'cover' })}
          onRename={renamePlant}
          onArchive={archivePlant}
          onDelete={(id) => { deletePlant(id); setView({ screen: 'cover' }); }}
          onAddLog={addLogEntry}
          onDeleteLog={deleteLogEntry}
        />
      )}
      {showAddModal && (
        <AddPlantModal onClose={() => setShowAddModal(false)} onCreate={addPlant} />
      )}
    </div>
  );
}

function DiarioGlobalStyle() {
  return (
    <style>{`
      * { box-sizing: border-box; }
      .mono { font-family: 'JetBrains Mono', monospace; }
      .serif { font-family: 'Fraunces', Georgia, serif; }
      .serif-italic { font-family: 'Fraunces', Georgia, serif; font-style: italic; }
      ::selection { background: #E8674A; color: #1E1410; }
      button { font-family: inherit; }
      select, input { outline: none; font-family: inherit; }
      select:focus, input:focus { box-shadow: 0 0 0 2px #E8674A; }
      select option { background: #2A1D17; color: #F5EBE0; }
      input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.8); cursor: pointer; }
      .plant-tile { transition: transform 0.18s ease, border-color 0.18s ease; cursor: pointer; }
      .plant-tile:hover { transform: translateY(-3px); border-color: #E8674A !important; }
      .phase-card { transition: all 0.25s ease; }
      .phase-card:hover { transform: translateX(2px); }
      @keyframes fadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
      .modal-pop { animation: fadeIn 0.18s ease; }
    `}</style>
  );
}

function DiarioCoverScreen({ plants, onOpenPlant, onAddClick, onArchive, onDelete }) {
  const active = plants.filter(p => !p.archived);
  const archived = plants.filter(p => p.archived);
  const [menuFor, setMenuFor] = useState(null);

  return (
    <div onClick={() => menuFor && setMenuFor(null)}>
      <header style={{
        borderBottom: '1px solid #4A3528', padding: '32px 24px 26px',
        background: 'linear-gradient(180deg, #241813 0%, #1E1410 100%)',
      }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <div style={{ width: 28, height: 2, background: 'linear-gradient(90deg, #E0A05E, #E8674A)', marginBottom: 10, borderRadius: 1 }} />
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: '#E0A05E', marginBottom: 8, textTransform: 'uppercase' }}>
            Cannabis Master · Bitácora
          </div>
          <h1 className="serif" style={{ margin: 0, fontSize: 32, fontWeight: 600, letterSpacing: '-0.01em' }}>
            Mi Cultivo
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: '#C2A896', maxWidth: 540 }}>
            {active.length === 0
              ? 'Todavía no agregaste ninguna planta. Tocá el + para empezar tu primera bitácora.'
              : `${active.length} ${active.length === 1 ? 'planta activa' : 'plantas activas'} en seguimiento.`}
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 920, margin: '0 auto', padding: '28px 24px 80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: 14,
        }}>
          {active.map(plant => (
            <PlantTile
              key={plant.id}
              plant={plant}
              onOpen={() => onOpenPlant(plant.id)}
              menuOpen={menuFor === plant.id}
              onToggleMenu={() => setMenuFor(menuFor === plant.id ? null : plant.id)}
              onArchive={() => { onArchive(plant.id); setMenuFor(null); }}
              onDelete={() => { onDelete(plant.id); setMenuFor(null); }}
            />
          ))}

          <button
            onClick={onAddClick}
            className="plant-tile"
            style={{
              background: 'transparent',
              border: '2px dashed #4A3528',
              borderRadius: 12,
              padding: '22px 14px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              minHeight: 158,
              color: '#9C8070',
            }}
          >
            <div style={{
              width: 44, height: 44, borderRadius: '50%', border: '2px solid #7A6155',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: '#E8674A',
            }}>+</div>
            <span className="mono" style={{ fontSize: 11, letterSpacing: '0.04em', textAlign: 'center' }}>NUEVA<br />PLANTA</span>
          </button>
        </div>

        {archived.length > 0 && (
          <details style={{ marginTop: 36 }}>
            <summary className="mono" style={{ fontSize: 12, color: '#9C8070', cursor: 'pointer', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Cosechadas / archivadas ({archived.length})
            </summary>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: 14, marginTop: 16, opacity: 0.6,
            }}>
              {archived.map(plant => (
                <PlantTile
                  key={plant.id}
                  plant={plant}
                  onOpen={() => onOpenPlant(plant.id)}
                  menuOpen={menuFor === plant.id}
                  onToggleMenu={() => setMenuFor(menuFor === plant.id ? null : plant.id)}
                  onArchive={() => { onArchive(plant.id); setMenuFor(null); }}
                  onDelete={() => { onDelete(plant.id); setMenuFor(null); }}
                  archivedStyle
                />
              ))}
            </div>
          </details>
        )}
      </main>
    </div>
  );
}

function PlantTile({ plant, onOpen, menuOpen, onToggleMenu, onArchive, onDelete, archivedStyle }) {
  const { strain, currentPhaseIndex, isHarvested } = getProgress(plant);
  const phaseName = isHarvested ? 'Cosechada' : PHASE_TEMPLATE[currentPhaseIndex]?.name;
  const trichomeStage = isHarvested ? 3 : PHASE_TEMPLATE[currentPhaseIndex]?.trichome ?? 0;
  const trichomeColors = ['#7A6155', '#7A6155', '#D9C4B5', '#E0A05E'];

  const log = plant.log || [];
  const lastEntry = log.length > 0 ? log.slice().sort((a, b) => b.createdAt - a.createdAt)[0] : null;
  const daysSinceLast = lastEntry ? Math.floor((Date.now() - lastEntry.createdAt) / 86400000) : null;

  return (
    <div style={{ position: 'relative' }} onClick={e => e.stopPropagation()}>
      <div
        onClick={onOpen}
        className="plant-tile"
        style={{
          background: '#2A1D17',
          border: '1px solid #4A3528',
          borderRadius: 12,
          padding: '18px 14px 14px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          minHeight: 158,
          filter: archivedStyle ? 'grayscale(0.4)' : 'none',
        }}
      >
        <button
          onClick={(e) => { e.stopPropagation(); onToggleMenu(); }}
          style={{
            position: 'absolute', top: 8, right: 8, background: 'none', border: 'none',
            color: '#9C8070', fontSize: 16, cursor: 'pointer', padding: 4, lineHeight: 1,
          }}
        >⋮</button>
        <div style={{ fontSize: 40, lineHeight: 1, marginTop: 4 }}>{plant.potEmoji || '🌿'}</div>
        <div style={{ fontSize: 13.5, fontWeight: 600, textAlign: 'center', lineHeight: 1.25 }}>{plant.name}</div>
        <div className="mono" style={{ fontSize: 10, color: '#9C8070', textAlign: 'center' }}>{strain.name}</div>
        <div style={{
          marginTop: 4, fontSize: 10.5, padding: '3px 9px', borderRadius: 20,
          background: trichomeColors[trichomeStage] + '26',
          color: trichomeColors[trichomeStage],
          border: `1px solid ${trichomeColors[trichomeStage]}55`,
          fontWeight: 600,
        }}>
          {phaseName}
        </div>
        {!archivedStyle && (
          <div className="mono" style={{ fontSize: 9.5, color: '#7A6155', marginTop: 2 }}>
            {lastEntry
              ? daysSinceLast === 0 ? 'Registro hoy' : `Último: hace ${daysSinceLast}d`
              : 'Sin registros'}
          </div>
        )}
      </div>

      {menuOpen && (
        <div style={{
          position: 'absolute', top: 32, right: 4, background: '#3D2419', border: '1px solid #4A3528',
          borderRadius: 8, overflow: 'hidden', zIndex: 10, boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
          minWidth: 140,
        }}>
          {!plant.archived && (
            <MenuItem label="Archivar / Cosechada" onClick={onArchive} />
          )}
          <MenuItem label="Eliminar" danger onClick={onDelete} />
        </div>
      )}
    </div>
  );
}

function MenuItem({ label, onClick, danger }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      style={{
        display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px',
        background: 'none', border: 'none', color: danger ? '#C2453A' : '#F5EBE0',
        fontSize: 12.5, cursor: 'pointer',
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#1E1410'}
      onMouseLeave={e => e.currentTarget.style.background = 'none'}
    >
      {label}
    </button>
  );
}

function AddPlantModal({ onClose, onCreate }) {
  const [name, setName] = useState('');
  const [strainId, setStrainId] = useState(null);
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [potEmoji, setPotEmoji] = useState(POT_EMOJIS[0]);

  const canCreate = !!strainId;

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(10,12,8,0.7)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: 20, zIndex: 200,
    }} onClick={onClose}>
      <div
        className="modal-pop"
        onClick={e => e.stopPropagation()}
        style={{
          background: '#2A1D17', border: '1px solid #4A3528', borderRadius: 14,
          padding: 26, width: '100%', maxWidth: 440,
          maxHeight: '88vh', overflowY: 'auto',
        }}
      >
        <h2 style={{ margin: '0 0 18px', fontSize: 19, fontWeight: 700 }}>Nueva planta</h2>

        <Field label="Apodo de la planta">
          <input
            type="text"
            placeholder="ej: Maceta del balcón"
            value={name}
            onChange={e => setName(e.target.value)}
            style={diarioInputStyle}
          />
        </Field>

        <Field label="Ícono">
          <div style={{ display: 'flex', gap: 8 }}>
            {POT_EMOJIS.map(emoji => (
              <button
                key={emoji}
                onClick={() => setPotEmoji(emoji)}
                style={{
                  fontSize: 24, padding: '8px 14px', borderRadius: 8, cursor: 'pointer',
                  background: potEmoji === emoji ? '#4A3528' : '#1E1410',
                  border: potEmoji === emoji ? '1px solid #E8674A' : '1px solid #4A3528',
                }}
              >{emoji}</button>
            ))}
          </div>
        </Field>

        <Field label="Variedad">
          <StrainPicker value={strainId} onChange={setStrainId} />
        </Field>

        <Field label="Fecha de germinación">
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            style={diarioInputStyle}
          />
        </Field>

        <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
          <button onClick={onClose} style={{ ...diarioBtnStyle, background: 'transparent', color: '#C2A896', border: '1px solid #4A3528' }}>
            Cancelar
          </button>
          <button
            disabled={!canCreate}
            onClick={() => canCreate && onCreate({ name, strainId, startDate, potEmoji })}
            style={{
              ...diarioBtnStyle, flex: 1, fontWeight: 700,
              background: canCreate ? '#E8674A' : '#4A3528',
              color: canCreate ? '#1E1410' : '#9C8070',
              cursor: canCreate ? 'pointer' : 'not-allowed',
            }}
          >
            Crear bitácora
          </button>
        </div>
      </div>
    </div>
  );
}

function StrainPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const selected = STRAINS.find(s => s.id === value);
  const filtered = STRAINS.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.breeder.toLowerCase().includes(query.toLowerCase())
  );

  // group by breeder, preserving first-seen order
  const groups = [];
  const groupIndex = {};
  filtered.forEach(s => {
    if (groupIndex[s.breeder] === undefined) {
      groupIndex[s.breeder] = groups.length;
      groups.push({ breeder: s.breeder, items: [] });
    }
    groups[groupIndex[s.breeder]].items.push(s);
  });

  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          ...diarioInputStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer', textAlign: 'left',
          color: selected ? '#F5EBE0' : '#9C8070',
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {selected ? `${selected.name} · THC ${selected.thc}%` : 'Elegí una genética…'}
        </span>
        <span style={{ color: '#9C8070', fontSize: 12, marginLeft: 8, flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>⌄</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 30,
          background: '#1E1410', border: '1px solid #4A3528', borderRadius: 8,
          boxShadow: '0 12px 28px rgba(0,0,0,0.45)', overflow: 'hidden',
        }}>
          <div style={{ padding: 8, borderBottom: '1px solid #4A3528', position: 'sticky', top: 0, background: '#1E1410', zIndex: 1 }}>
            <input
              autoFocus
              type="text"
              placeholder="Buscar por nombre o breeder…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{ ...diarioInputStyle, padding: '8px 10px', fontSize: 13.5 }}
            />
            <div className="mono" style={{ fontSize: 10, color: '#7A6155', marginTop: 6, letterSpacing: '0.03em' }}>
              {filtered.length} {filtered.length === 1 ? 'genética' : 'genéticas'} · {groups.length} breeders
            </div>
          </div>

          <div style={{ maxHeight: 320, overflowY: 'auto' }}>
            {filtered.length === 0 && (
              <div style={{ padding: '16px 14px', fontSize: 13, color: '#9C8070' }}>
                Sin resultados para "{query}"
              </div>
            )}
            {groups.map(group => (
              <div key={group.breeder}>
                <div className="mono" style={{
                  padding: '8px 14px 4px', fontSize: 10, color: '#E8674A',
                  letterSpacing: '0.06em', textTransform: 'uppercase', position: 'sticky', top: 0,
                  background: '#1E1410',
                }}>
                  {group.breeder}
                </div>
                {group.items.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => { onChange(s.id); setOpen(false); setQuery(''); }}
                    style={{
                      display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center',
                      padding: '9px 14px', background: value === s.id ? '#2A1D17' : 'transparent',
                      border: 'none', borderBottom: '1px solid #2A1D17', cursor: 'pointer', textAlign: 'left',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#2A1D17'}
                    onMouseLeave={e => e.currentTarget.style.background = value === s.id ? '#2A1D17' : 'transparent'}
                  >
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: '#F5EBE0' }}>{s.name}</div>
                      <div className="mono" style={{ fontSize: 10.5, color: '#9C8070', marginTop: 2 }}>
                        {s.days[0]}–{s.days[1]}d · {s.level} · {s.yield} g/m²
                      </div>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#E0A05E', flexShrink: 0, marginLeft: 10 }}>
                      {s.thc}%
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label className="mono" style={{ fontSize: 10.5, color: '#9C8070', display: 'block', marginBottom: 6, letterSpacing: '0.04em' }}>
        {label.toUpperCase()}
      </label>
      {children}
    </div>
  );
}

const diarioInputStyle = {
  width: '100%', padding: '10px 12px', background: '#1E1410', border: '1px solid #4A3528',
  borderRadius: 6, color: '#F5EBE0', fontSize: 14,
};
const diarioBtnStyle = {
  padding: '11px 16px', borderRadius: 7, fontSize: 14, cursor: 'pointer', border: 'none',
};

function DetailScreen({ plant, onBack, onRename, onArchive, onDelete, onAddLog, onDeleteLog }) {
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(plant?.name || '');

  if (!plant) {
    return (
      <div style={{ padding: 40 }}>
        <button onClick={onBack} style={backBtnStyle}>← Volver</button>
        <p style={{ color: '#9C8070', marginTop: 20 }}>Esta planta ya no existe.</p>
      </div>
    );
  }

  const { strain, schedule, totalDays, elapsedDays, currentPhaseIndex, harvestDate } = getProgress(plant);

  return (
    <div>
      <header style={{
        borderBottom: '1px solid #4A3528', padding: '20px 24px 22px',
        background: 'linear-gradient(180deg, #241813 0%, #1E1410 100%)',
      }}>
        <div style={{ maxWidth: 920, margin: '0 auto' }}>
          <button onClick={onBack} style={backBtnStyle}>← Mi Cultivo</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 14 }}>
            <div style={{ fontSize: 38 }}>{plant.potEmoji || '🌿'}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              {editingName ? (
                <input
                  autoFocus
                  value={nameDraft}
                  onChange={e => setNameDraft(e.target.value)}
                  onBlur={() => { onRename(plant.id, nameDraft || plant.name); setEditingName(false); }}
                  onKeyDown={e => { if (e.key === 'Enter') { onRename(plant.id, nameDraft || plant.name); setEditingName(false); } }}
                  style={{ ...diarioInputStyle, fontSize: 22, fontWeight: 700, padding: '4px 8px' }}
                />
              ) : (
                <h1
                  onClick={() => setEditingName(true)}
                  style={{ margin: 0, fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', cursor: 'pointer' }}
                  title="Tocar para renombrar"
                >
                  {plant.name}
                </h1>
              )}
              <div className="mono" style={{ fontSize: 11, color: '#9C8070', marginTop: 2 }}>
                {strain.name} · {strain.breeder}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 920, margin: '0 auto', padding: '24px 24px 80px' }}>

        <section style={{
          background: '#2A1D17', border: '1px solid #4A3528', borderRadius: 10,
          padding: '20px 22px', marginBottom: 24, display: 'flex', flexWrap: 'wrap', gap: 22, alignItems: 'center',
        }}>
          <DiarioStat label="THC" value={`${strain.thc}%`} accent="#E0A05E" />
          <DiarioStat label="CBD" value={`${strain.cbd}%`} accent="#E8674A" />
          <DiarioStat label="Ciclo" value={`${strain.days[0]}–${strain.days[1]}d`} accent="#F5EBE0" />
          <DiarioStat label="Altura" value={`${strain.height[0]}–${strain.height[1]}cm`} accent="#F5EBE0" />
          <DiarioStat label="Rendimiento" value={`${strain.yield} g/m²`} accent="#E8674A" />
          <div style={{ flex: '1 1 140px', textAlign: 'right' }}>
            <div className="mono" style={{ fontSize: 11, color: '#9C8070', letterSpacing: '0.04em' }}>COSECHA ESTIMADA</div>
            <div style={{ fontSize: 19, fontWeight: 700, color: '#E0A05E' }}>{formatDate(harvestDate)}</div>
          </div>
        </section>

        <section style={{ marginBottom: 30 }}>
          <div className="mono" style={{ fontSize: 11, color: '#9C8070', marginBottom: 10, letterSpacing: '0.04em', display: 'flex', justifyContent: 'space-between' }}>
            <span>DÍA {Math.max(0, elapsedDays + 1)} DE {totalDays}</span>
            <span>MADUREZ DE TRICOMAS</span>
          </div>
          <div style={{ display: 'flex', height: 28, borderRadius: 6, overflow: 'hidden', border: '1px solid #4A3528' }}>
            {schedule.map((p, i) => {
              const trichomeColors = ['#4A3528', '#4A3528', '#D9C4B5', '#E0A05E'];
              const isPast = elapsedDays + 1 > p.dayRangeEnd;
              const isCurrent = i === currentPhaseIndex;
              return (
                <div
                  key={p.id}
                  title={`${p.name}: ${TRICHOME_LABEL[p.trichome]}`}
                  style={{
                    flex: p.pct, background: trichomeColors[p.trichome],
                    opacity: isPast ? 1 : isCurrent ? 0.95 : 0.35,
                    borderRight: i < schedule.length - 1 ? '1px solid #1E1410' : 'none',
                    position: 'relative',
                  }}
                >
                  {isCurrent && (
                    <div style={{
                      position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)',
                      width: 0, height: 0, borderLeft: '5px solid transparent', borderRight: '5px solid transparent',
                      borderTop: '6px solid #E8674A',
                    }} />
                  )}
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span className="mono" style={{ fontSize: 10, color: '#9C8070' }}>Germinación</span>
            <span className="mono" style={{ fontSize: 10, color: '#9C8070' }}>Cosecha</span>
          </div>
        </section>

        <section>
          <h2 className="mono" style={{ fontSize: 13, letterSpacing: '0.08em', color: '#E8674A', marginBottom: 16, textTransform: 'uppercase' }}>
            Cronograma de Fases
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {schedule.map((phase, i) => {
              const isExpanded = expandedPhase === phase.id;
              const isCurrent = i === currentPhaseIndex;
              const isPast = elapsedDays + 1 > phase.dayRangeEnd;
              return (
                <div
                  key={phase.id}
                  className="phase-card"
                  style={{
                    background: isCurrent ? '#3D2419' : '#2A1D17',
                    border: isCurrent ? '1px solid #E8674A' : '1px solid #4A3528',
                    borderRadius: 8, overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                    style={{
                      width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                      padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14,
                      color: '#F5EBE0', textAlign: 'left',
                    }}
                  >
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
                      background: isPast ? '#E8674A' : isCurrent ? '#E0A05E' : '#4A3528',
                      boxShadow: isCurrent ? '0 0 0 4px rgba(217,164,65,0.18)' : 'none',
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 15, fontWeight: 600 }}>{phase.name}</div>
                      <div className="mono" style={{ fontSize: 11, color: '#9C8070', marginTop: 2 }}>
                        {formatDate(phase.startDate)} → {formatDate(phase.endDate)} · {phase.duration} días
                      </div>
                    </div>
                    {isCurrent && (
                      <span className="mono" style={{
                        fontSize: 10, color: '#1E1410', background: '#E0A05E', padding: '3px 8px',
                        borderRadius: 4, fontWeight: 700, letterSpacing: '0.04em', flexShrink: 0,
                      }}>HOY</span>
                    )}
                    <span style={{ color: '#9C8070', fontSize: 18, transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>⌄</span>
                  </button>

                  {isExpanded && (
                    <div style={{ padding: '0 18px 18px', borderTop: '1px solid #4A3528' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 12, marginTop: 16, marginBottom: 14 }}>
                        <DiarioDataPoint label="NPK" value={phase.npk} />
                        <DiarioDataPoint label="EC (mS/cm)" value={phase.ec} />
                        <DiarioDataPoint label="pH" value={phase.ph} />
                        <DiarioDataPoint label="VPD" value={phase.vpd} />
                        <DiarioDataPoint label="Temp." value={phase.temp} />
                        <DiarioDataPoint label="Humedad" value={phase.hr} />
                      </div>
                      <p style={{ fontSize: 13, color: '#D9C4B5', lineHeight: 1.5, margin: 0 }}>{phase.notes}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <section style={{ marginTop: 36 }}>
          <GrowLog plant={plant} onAddLog={onAddLog} onDeleteLog={onDeleteLog} />
        </section>

        <section style={{ marginTop: 36, paddingTop: 20, borderTop: '1px solid #4A3528', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {!plant.archived && (
            <button onClick={() => onArchive(plant.id)} style={{ ...diarioBtnStyle, background: 'transparent', border: '1px solid #4A3528', color: '#D9C4B5' }}>
              Marcar como cosechada
            </button>
          )}
          <button onClick={() => onDelete(plant.id)} style={{ ...diarioBtnStyle, background: 'transparent', border: '1px solid #C2453A55', color: '#C2453A' }}>
            Eliminar planta
          </button>
        </section>

        <p style={{ marginTop: 28, fontSize: 12, color: '#7A6155', textAlign: 'center', lineHeight: 1.6 }}>
          Cronograma estimado a partir de la duración promedio de la genética seleccionada.<br />
          Las fechas reales pueden variar según ambiente, manejo y expresión individual de la planta.
        </p>
      </main>
    </div>
  );
}

const backBtnStyle = {
  background: 'none', border: 'none', color: '#E8674A', fontSize: 13, cursor: 'pointer',
  padding: 0, fontFamily: 'inherit', fontWeight: 600,
};

function DiarioStat({ label, value, accent }) {
  return (
    <div>
      <div className="mono" style={{ fontSize: 10, color: '#9C8070', letterSpacing: '0.04em' }}>{label}</div>
      <div style={{ fontSize: 17, fontWeight: 700, color: accent }}>{value}</div>
    </div>
  );
}
function DiarioDataPoint({ label, value }) {
  return (
    <div style={{ background: '#1E1410', border: '1px solid #4A3528', borderRadius: 6, padding: '8px 10px' }}>
      <div className="mono" style={{ fontSize: 9, color: '#9C8070', letterSpacing: '0.04em', marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 12.5, color: '#F5EBE0', fontWeight: 500, lineHeight: 1.3 }}>{value}</div>
    </div>
  );
}

// ================= GROW LOG (bitácora diaria) =================
function fileToBase64(file) {
  // Redimensiona y comprime la imagen antes de convertir a base64.
  // Esto evita que fotos de celular (3-8MB típico) llenen el límite de 5MB
  // por clave de storage, que es compartido por TODA la bitácora de la planta.
  const MAX_DIMENSION = 1280;
  const JPEG_QUALITY = 0.72;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        let { width, height } = img;
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          if (width > height) {
            height = Math.round(height * (MAX_DIMENSION / width));
            width = MAX_DIMENSION;
          } else {
            width = Math.round(width * (MAX_DIMENSION / height));
            height = MAX_DIMENSION;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

// Estima el tamaño en bytes de un string base64 (aprox: largo * 0.75)
function estimateBase64Bytes(base64String) {
  if (!base64String) return 0;
  const commaIdx = base64String.indexOf(',');
  const data = commaIdx >= 0 ? base64String.slice(commaIdx + 1) : base64String;
  return Math.round(data.length * 0.75);
}

function formatLogDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('es-AR', {
    day: '2-digit', month: 'short', year: 'numeric',
  }) + ' · ' + new Date(timestamp).toLocaleTimeString('es-AR', {
    hour: '2-digit', minute: '2-digit',
  });
}

function GrowLog({ plant, onAddLog, onDeleteLog }) {
  const [showForm, setShowForm] = useState(false);
  const log = (plant.log || []).slice().sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 className="mono" style={{ fontSize: 13, letterSpacing: '0.08em', color: '#E8674A', margin: 0, textTransform: 'uppercase' }}>
          Bitácora ({log.length})
        </h2>
        <button
          onClick={() => setShowForm(s => !s)}
          style={{
            ...diarioBtnStyle, padding: '7px 14px', fontSize: 12.5, fontWeight: 700,
            background: showForm ? 'transparent' : '#E8674A',
            color: showForm ? '#C2A896' : '#1E1410',
            border: showForm ? '1px solid #4A3528' : 'none',
          }}
        >
          {showForm ? 'Cancelar' : '+ Nuevo registro'}
        </button>
      </div>

      {showForm && (
        <LogEntryForm
          onSubmit={(entry) => { onAddLog(plant.id, entry); setShowForm(false); }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {log.length === 0 && !showForm && (
        <div style={{
          border: '1px dashed #4A3528', borderRadius: 8, padding: '26px 18px',
          textAlign: 'center', color: '#9C8070', fontSize: 13,
        }}>
          Todavía no hay registros. Anotá riegos, fertilizaciones, podas u observaciones para llevar un historial completo de esta planta.
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: showForm ? 16 : 0 }}>
        {log.map(entry => (
          <LogEntryCard key={entry.id} entry={entry} onDelete={() => onDeleteLog(plant.id, entry.id)} />
        ))}
      </div>
    </div>
  );
}

function LogEntryForm({ onSubmit, onCancel }) {
  const [type, setType] = useState('note');
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('ml');
  const [product, setProduct] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState('');
  const [uploading, setUploading] = useState(false);

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const base64 = await fileToBase64(file);
      setPhoto(base64);
      setPhotoName(file.name);
      if (type !== 'photo') setType('photo');
    } catch (err) {
      console.error('Error leyendo imagen', err);
    } finally {
      setUploading(false);
    }
  };

  const canSubmit = text.trim() || photo || (type === 'water' && amount) || (type === 'feed' && (amount || product));

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit({
      type,
      text: text.trim(),
      amount: amount ? Number(amount) : null,
      unit: type === 'feed' || type === 'water' ? unit : null,
      product: product.trim() || null,
      photo,
    });
  };

  const activeType = LOG_TYPES.find(t => t.id === type);

  return (
    <div style={{
      background: '#241813', border: '1px solid #4A3528', borderRadius: 10,
      padding: 18, marginBottom: 16,
    }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {LOG_TYPES.map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setType(t.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px',
              borderRadius: 20, fontSize: 12.5, cursor: 'pointer', fontWeight: 600,
              background: type === t.id ? t.color + '26' : 'transparent',
              border: type === t.id ? `1px solid ${t.color}` : '1px solid #4A3528',
              color: type === t.id ? t.color : '#C2A896',
            }}
          >
            <span>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>

      {(type === 'water' || type === 'feed') && (
        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <input
              type="number"
              placeholder={type === 'water' ? 'Litros de agua' : 'Cantidad'}
              value={amount}
              onChange={e => setAmount(e.target.value)}
              style={diarioInputStyle}
            />
          </div>
          <div style={{ width: 90 }}>
            <select value={unit} onChange={e => setUnit(e.target.value)} style={{ ...diarioInputStyle, cursor: 'pointer' }}>
              <option value="L">L</option>
              <option value="ml">ml</option>
              <option value="g">g</option>
            </select>
          </div>
        </div>
      )}

      {type === 'feed' && (
        <input
          type="text"
          placeholder="Producto (ej: Namaste Floración, MaxiBloom...)"
          value={product}
          onChange={e => setProduct(e.target.value)}
          style={{ ...diarioInputStyle, marginBottom: 12 }}
        />
      )}

      <textarea
        placeholder={
          type === 'note' ? 'Qué observaste hoy...' :
          type === 'training' ? 'Qué técnica aplicaste (LST, defoliación...)' :
          'Notas adicionales (opcional)'
        }
        value={text}
        onChange={e => setText(e.target.value)}
        rows={2}
        style={{ ...diarioInputStyle, resize: 'vertical', marginBottom: 12, fontFamily: 'inherit' }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <label style={{
          ...diarioBtnStyle, padding: '8px 14px', fontSize: 12.5, background: 'transparent',
          border: '1px solid #4A3528', color: '#D9C4B5', cursor: 'pointer', display: 'inline-flex',
          alignItems: 'center', gap: 6,
        }}>
          📷 {photo ? 'Cambiar foto' : 'Agregar foto'}
          <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
        </label>
        {uploading && <span className="mono" style={{ fontSize: 11, color: '#9C8070' }}>Comprimiendo…</span>}
        {photo && !uploading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src={photo} alt="preview" style={{ width: 32, height: 32, borderRadius: 4, objectFit: 'cover' }} />
            <span className="mono" style={{ fontSize: 10, color: '#9C8070' }}>
              {(estimateBase64Bytes(photo) / 1024).toFixed(0)} KB
            </span>
            <button
              type="button"
              onClick={() => { setPhoto(null); setPhotoName(''); }}
              style={{ background: 'none', border: 'none', color: '#C2453A', fontSize: 11, cursor: 'pointer' }}
            >quitar</button>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={onCancel} style={{ ...diarioBtnStyle, background: 'transparent', border: '1px solid #4A3528', color: '#C2A896', flex: 1 }}>
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            ...diarioBtnStyle, flex: 2, fontWeight: 700,
            background: canSubmit ? activeType.color : '#4A3528',
            color: canSubmit ? '#1E1410' : '#9C8070',
            cursor: canSubmit ? 'pointer' : 'not-allowed',
          }}
        >
          Guardar registro
        </button>
      </div>
    </div>
  );
}

function LogEntryCard({ entry, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const typeInfo = LOG_TYPES.find(t => t.id === entry.type) || LOG_TYPES[3];

  return (
    <div style={{
      background: '#2A1D17', border: '1px solid #4A3528', borderRadius: 8,
      padding: '12px 14px', display: 'flex', gap: 12,
    }}>
      <div style={{
        width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
        background: typeInfo.color + '20', border: `1px solid ${typeInfo.color}55`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14,
      }}>
        {typeInfo.icon}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: typeInfo.color }}>{typeInfo.label}</span>
          <span className="mono" style={{ fontSize: 10.5, color: '#9C8070', flexShrink: 0 }}>{formatLogDate(entry.createdAt)}</span>
        </div>

        {(entry.amount || entry.product) && (
          <div className="mono" style={{ fontSize: 12, color: '#D9C4B5', marginTop: 3 }}>
            {entry.amount ? `${entry.amount} ${entry.unit || ''}`.trim() : ''}
            {entry.amount && entry.product ? ' · ' : ''}
            {entry.product || ''}
          </div>
        )}

        {entry.text && (
          <p style={{ fontSize: 13, color: '#F5EBE0', margin: '6px 0 0', lineHeight: 1.4 }}>{entry.text}</p>
        )}

        {entry.photo && (
          <img
            src={entry.photo}
            alt="registro"
            style={{ marginTop: 8, maxWidth: '100%', maxHeight: 220, borderRadius: 6, border: '1px solid #4A3528' }}
          />
        )}

        <div style={{ marginTop: 6 }}>
          {confirmDelete ? (
            <span style={{ fontSize: 11 }}>
              <span style={{ color: '#C2A896' }}>¿Eliminar? </span>
              <button onClick={onDelete} style={{ background: 'none', border: 'none', color: '#C2453A', cursor: 'pointer', fontWeight: 700, fontSize: 11, padding: 0, marginRight: 8 }}>Sí</button>
              <button onClick={() => setConfirmDelete(false)} style={{ background: 'none', border: 'none', color: '#9C8070', cursor: 'pointer', fontSize: 11, padding: 0 }}>No</button>
            </span>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              style={{ background: 'none', border: 'none', color: '#7A6155', cursor: 'pointer', fontSize: 11, padding: 0 }}
            >Eliminar</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ---- Fases (mesmos dados do Diário, resumidos para o que a calculadora precisa) ----
const PHASES = [
  { id: 'seedling', name: 'Plántula', stage: 'veg', ecTarget: [0.4, 0.8] },
  { id: 'veg_early', name: 'Vegetativo Temprano', stage: 'veg', ecTarget: [0.8, 1.2] },
  { id: 'veg_late', name: 'Vegetativo Avanzado', stage: 'veg', ecTarget: [1.2, 1.8] },
  { id: 'preflower', name: 'Pre-Floración', stage: 'transition', ecTarget: [1.0, 1.4] },
  { id: 'flower_early', name: 'Floración Temprana', stage: 'flower', ecTarget: [1.4, 2.0] },
  { id: 'flower_peak', name: 'Floración Pico', stage: 'flower', ecTarget: [1.8, 2.4] },
  { id: 'maturation', name: 'Maduración (Flush)', stage: 'flush', ecTarget: [0, 0.4] },
];

// ---- Productos con dosis documentada ----
// dose: { min, max } en la unidad indicada, por LITRO de agua, en la intensidad "media" de la marca.
// strengthMultiplier permite escalar (principiante = menor, agresivo = mayor) dentro del propio rango min-max del fabricante.
const PRODUCTS = [
  {
    id: 'maxigro',
    brand: 'General Hydroponics',
    name: 'MaxiGro',
    country: 'INTL',
    npk: '10-5-14',
    unit: 'g',
    stages: ['veg'],
    dose: { min: 1.25, max: 2.5 },
    note: 'Disolver completamente en agua antes de cualquier otro suplemento. Usar desde plántula hasta el cambio a floración.',
    source: 'Ficha técnica General Hydroponics / Terra Aquatica',
  },
  {
    id: 'maxibloom',
    brand: 'General Hydroponics',
    name: 'MaxiBloom',
    country: 'INTL',
    npk: '5-15-14',
    unit: 'g',
    stages: ['transition', 'flower'],
    dose: { min: 1.25, max: 2.5 },
    note: 'Reemplaza a MaxiGro al iniciar floración. Mantiene el pH estable una vez ajustado.',
    source: 'Ficha técnica General Hydroponics / Terra Aquatica',
  },
  {
    id: 'kawsay_base_a',
    brand: 'Kawsay Nutrientes',
    name: 'Base A',
    country: 'AR',
    npk: 'macro+secundarios',
    unit: 'ml',
    stages: ['veg', 'transition', 'flower'],
    dose: { min: 0.5, max: 4 },
    note: 'Usar siempre junto a Base B. Aporta Ca y macronutrientes. Incrementar progresivamente sin superar 4ml/L.',
    source: 'Ficha técnica Kawsay Nutrientes',
  },
  {
    id: 'kawsay_base_b',
    brand: 'Kawsay Nutrientes',
    name: 'Base B',
    country: 'AR',
    npk: 'micronutrientes',
    unit: 'ml',
    stages: ['veg', 'transition', 'flower'],
    dose: { min: 0.5, max: 5 },
    note: '0.5–2ml en crecimiento, 2–5ml en floración. Siempre junto a Base A.',
    source: 'Ficha técnica Kawsay Nutrientes',
  },
  {
    id: 'kawsay_vege',
    brand: 'Kawsay Nutrientes',
    name: 'Vege',
    country: 'AR',
    npk: 'N-P-K vegetativo',
    unit: 'ml',
    stages: ['veg'],
    dose: { min: 0.5, max: 2 },
    note: 'Se combina con Base A + Base B durante todo el vegetativo. Sustituir por Bloom al pasar a floración.',
    source: 'Ficha técnica Kawsay Nutrientes',
  },
  {
    id: 'kawsay_bloom',
    brand: 'Kawsay Nutrientes',
    name: 'Bloom',
    country: 'AR',
    npk: 'P-K floración',
    unit: 'ml',
    stages: ['transition', 'flower'],
    dose: { min: 0.5, max: 3 },
    note: 'Reemplaza a Vege en floración. Se combina siempre con Base A + Base B.',
    source: 'Ficha técnica Kawsay Nutrientes',
  },
  {
    id: 'namaste_oro_negro',
    brand: 'Namaste Nutrientes',
    name: 'Oro Negro',
    country: 'AR',
    npk: '7.5-1.6-10 (orgánico)',
    unit: 'ml',
    stages: ['veg'],
    dose: { min: 2, max: 2 },
    note: 'Desde los 15 días de vida, 1 aplicación semanal hasta la 2da semana de floración. Dosis fija de fabricante (no es un rango).',
    source: 'Ficha técnica Namaste Nutrientes',
  },
  {
    id: 'namaste_amazonia',
    brand: 'Namaste Nutrientes',
    name: 'Amazonia Roots',
    country: 'AR',
    npk: 'bioestimulante (micorrizas)',
    unit: 'g',
    stages: ['veg'],
    dose: { min: 3, max: 3 },
    note: 'Bioestimulante radicular. Aplicar cada 15 días durante todo el vegetativo, desde los 10 días de vida. Dejar reposar 1 hora antes de regar.',
    source: 'Ficha técnica Namaste Nutrientes',
  },
  {
    id: 'namaste_flora_booster',
    brand: 'Namaste Nutrientes',
    name: 'Flora Booster',
    country: 'AR',
    npk: '0-9-18',
    unit: 'ml',
    stages: ['flower'],
    dose: { min: 2, max: 4 },
    note: 'Desde la 4ta semana de floración hasta 2 semanas antes del corte. 1 vez por semana. Libre de nitrógeno — ideal para el final de floración.',
    source: 'Ficha técnica Namaste Nutrientes',
  },
  {
    id: 'namaste_trico',
    brand: 'Namaste Nutrientes',
    name: 'Trico+',
    country: 'AR',
    npk: 'carbohidratos (P 1%, Ca 7%, azúcares 55%)',
    unit: 'g',
    stages: ['flower'],
    dose: { min: 0.5, max: 0.5 },
    note: 'Desde la primera semana de floración hasta el lavado de raíces. Dejar reposar 6-24hs antes de regar. Incrementa producción de tricomas y mejora aroma.',
    source: 'Ficha técnica Namaste Nutrientes',
  },
  {
    id: 'namaste_detox',
    brand: 'Namaste Nutrientes',
    name: 'Detox',
    country: 'AR',
    npk: 'lavado de raíces',
    unit: 'ml',
    stages: ['flush'],
    dose: { min: 3, max: 3 },
    note: 'Regar hasta que el agua salga por debajo de la maceta. Repetir 4 veces durante las últimas 2 semanas antes de cosecha.',
    source: 'Ficha técnica Namaste Nutrientes',
  },
  {
    id: 'namaste_shanti',
    brand: 'Namaste Nutrientes',
    name: 'Shanti',
    country: 'AR',
    npk: 'bioestimulante (algas marinas)',
    unit: 'ml',
    stages: ['veg', 'transition', 'flower'],
    dose: { min: 3, max: 6 },
    note: '3 aplicaciones en todo el ciclo cada 15 días: desde mediados del vegetativo hasta primeras semanas de floración. Ajustar pH del agua a 6-7.',
    source: 'Ficha técnica Namaste Nutrientes',
  },
];

// ---- Productos del catálogo SIN dosis verificada — no entran al cálculo, solo se listan para transparencia ----
const UNVERIFIED_PRODUCTS = [
  { brand: 'Treemix', name: 'Treemix N', reason: 'sin ficha técnica pública con dosis específica' },
  { brand: 'Pangea Nutrientes', name: 'Línea Floración Orgánica', reason: 'sin ficha técnica pública con dosis específica' },
  { brand: 'BioBizz', name: 'BioGrow', reason: 'sin fuente verificada para esta base de datos' },
  { brand: 'Phitonat', name: 'Línea completa', reason: 'sin ficha técnica pública con dosis específica' },
  { brand: 'Vamp', name: 'Línea completa', reason: 'sin ficha técnica pública con dosis específica' },
  { brand: 'Mantra Nutrientes', name: 'Línea completa', reason: 'sin ficha técnica pública con dosis específica' },
];

function calcRound(n, decimals = 2) {
  const f = Math.pow(10, decimals);
  return Math.round(n * f) / f;
}

function CalcModule() {
  const [liters, setLiters] = useState(10);
  const [phaseId, setPhaseId] = useState('veg_early');
  const [intensity, setIntensity] = useState(0.5); // 0 = mínima, 1 = máxima dentro del rango del fabricante
  const [cart, setCart] = useState({}); // productId -> bool

  const phase = PHASES.find(p => p.id === phaseId) || PHASES[0];

  const availableProducts = useMemo(
    () => PRODUCTS.filter(p => p.stages.includes(phase.stage)),
    [phase]
  );

  const toggleProduct = (id) => {
    setCart(c => ({ ...c, [id]: !c[id] }));
  };

  const selectedProducts = availableProducts.filter(p => cart[p.id]);

  const results = selectedProducts.map(p => {
    const isFixedDose = p.dose.min === p.dose.max;
    const dosePerLiter = isFixedDose ? p.dose.min : p.dose.min + (p.dose.max - p.dose.min) * intensity;
    const total = dosePerLiter * liters;
    return { ...p, dosePerLiter: calcRound(dosePerLiter, 2), total: calcRound(total, 1), isFixedDose };
  });

  const isFlush = phase.stage === 'flush';

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1E1410',
      color: '#F5EBE0',
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      <style>{`
        * { box-sizing: border-box; }
        .mono { font-family: 'JetBrains Mono', monospace; }
      .serif { font-family: 'Fraunces', Georgia, serif; }
      .serif-italic { font-family: 'Fraunces', Georgia, serif; font-style: italic; }
        ::selection { background: #E8674A; color: #1E1410; }
        input[type="range"] { -webkit-appearance: none; appearance: none; height: 4px; background: #4A3528; border-radius: 2px; outline: none; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #E8674A; cursor: pointer; border: 2px solid #1E1410; }
        input[type="range"]::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: #E8674A; cursor: pointer; border: 2px solid #1E1410; }
        input[type="number"]::-webkit-inner-spin-button { opacity: 1; }
        select, input { outline: none; font-family: inherit; }
        select:focus, input:focus { box-shadow: 0 0 0 2px #E8674A; }
        .product-card { transition: border-color 0.15s, background 0.15s; cursor: pointer; }
        .product-card:hover { border-color: #7A6155 !important; }
        button { font-family: inherit; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>

      <header style={{
        borderBottom: '1px solid #4A3528', padding: '32px 24px 26px',
        background: 'linear-gradient(180deg, #241813 0%, #1E1410 100%)',
      }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div style={{ width: 28, height: 2, background: 'linear-gradient(90deg, #E0A05E, #E8674A)', marginBottom: 10, borderRadius: 1 }} />
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: '#E0A05E', marginBottom: 8, textTransform: 'uppercase' }}>
            Cannabis Master · Mezclas
          </div>
          <h1 className="serif" style={{ margin: 0, fontSize: 30, fontWeight: 600, letterSpacing: '-0.01em' }}>
            Calculadora de Nutrientes
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: '#C2A896', maxWidth: 540 }}>
            Elegí la fase, los litros de agua y los productos. La dosis se calcula sobre el rango oficial de cada fabricante.
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 880, margin: '0 auto', padding: '28px 24px 80px' }}>

        {/* CONTROLS */}
        <section style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 22,
        }}>
          <div>
            <label className="mono" style={labelStyle}>LITROS DE AGUA</label>
            <input
              type="number"
              min={0.5}
              step={0.5}
              value={liters}
              onChange={e => setLiters(Math.max(0.5, Number(e.target.value) || 0))}
              style={inputStyle}
            />
          </div>
          <div>
            <label className="mono" style={labelStyle}>FASE DEL CULTIVO</label>
            <select
              value={phaseId}
              onChange={e => { setPhaseId(e.target.value); setCart({}); }}
              style={{ ...inputStyle, cursor: 'pointer' }}
            >
              {PHASES.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
        </section>

        {/* INTENSITY SLIDER */}
        <section style={{
          background: '#2A1D17', border: '1px solid #4A3528', borderRadius: 10,
          padding: '16px 20px', marginBottom: 26,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <label className="mono" style={{ ...labelStyle, marginBottom: 0 }}>INTENSIDAD DE DOSIS</label>
            <span className="mono" style={{ fontSize: 12, color: '#E0A05E', fontWeight: 700 }}>
              {intensity < 0.34 ? 'Conservadora' : intensity < 0.67 ? 'Media' : 'Agresiva'}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={intensity}
            onChange={e => setIntensity(Number(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span className="mono" style={{ fontSize: 9.5, color: '#7A6155' }}>Mín. fabricante</span>
            <span className="mono" style={{ fontSize: 9.5, color: '#7A6155' }}>Máx. fabricante</span>
          </div>
          <p style={{ fontSize: 12, color: '#9C8070', margin: '10px 0 0', lineHeight: 1.5 }}>
            Si es tu primera vez con un producto o tu planta es joven, empezá conservador. Subí gradualmente según la respuesta de la planta.
          </p>
        </section>

        {isFlush && (
          <section style={{
            background: '#2C2218', border: '1px solid #E0A05E55', borderRadius: 10,
            padding: '16px 20px', marginBottom: 26, display: 'flex', gap: 12, alignItems: 'flex-start',
          }}>
            <span style={{ fontSize: 20 }}>💧</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#E0A05E' }}>Fase de lavado (flush)</div>
              <p style={{ fontSize: 13, color: '#D9C4B5', margin: '4px 0 0', lineHeight: 1.5 }}>
                Agua con pH corregido (6.0–6.5 en sustrato). Sin fertilizantes normales — el objetivo es vaciar las reservas de sales antes de la cosecha. Si usás un producto específico de lavado, podés calcularlo abajo.
              </p>
            </div>
          </section>
        )}

        {/* PRODUCT SELECTION */}
        {availableProducts.length > 0 && (
          <section style={{ marginBottom: 28 }}>
            <h2 className="mono" style={sectionTitleStyle}>
              {isFlush ? 'Productos de lavado para esta fase' : 'Productos disponibles para esta fase'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
              {availableProducts.map(p => {
                const checked = !!cart[p.id];
                return (
                  <div
                    key={p.id}
                    className="product-card"
                    onClick={() => toggleProduct(p.id)}
                    style={{
                      background: checked ? '#3D2419' : '#2A1D17',
                      border: checked ? '1px solid #E8674A' : '1px solid #4A3528',
                      borderRadius: 8, padding: '12px 14px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 700 }}>{p.name}</div>
                        <div className="mono" style={{ fontSize: 10.5, color: '#9C8070', marginTop: 2 }}>{p.brand}</div>
                      </div>
                      <div style={{
                        width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginLeft: 8,
                        border: checked ? 'none' : '1px solid #7A6155',
                        background: checked ? '#E8674A' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, color: '#1E1410', fontWeight: 900,
                      }}>
                        {checked && '✓'}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                      <Tag>{p.country === 'AR' ? '🇦🇷 Nacional' : '🌍 Internacional'}</Tag>
                      <Tag>NPK {p.npk}</Tag>
                      <Tag>{p.dose.min === p.dose.max ? `${p.dose.min} ${p.unit}/L fija` : `${p.dose.min}–${p.dose.max} ${p.unit}/L`}</Tag>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* RESULTS */}
        {results.length > 0 && (
          <section>
            <h2 className="mono" style={sectionTitleStyle}>
              Mezcla para {liters} L de agua
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {results.map(r => (
                <div key={r.id} style={{
                  background: '#2A1D17', border: '1px solid #4A3528', borderRadius: 10,
                  padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 16,
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{r.name}</div>
                    <div className="mono" style={{ fontSize: 10.5, color: '#9C8070', marginTop: 2 }}>
                      {r.brand} · {r.dosePerLiter} {r.unit}/L {r.isFixedDose ? '(dosis fija)' : ''}
                    </div>
                    <p style={{ fontSize: 11.5, color: '#9C8070', margin: '6px 0 0', lineHeight: 1.4 }}>{r.note}</p>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 24, fontWeight: 800, color: '#E0A05E', lineHeight: 1 }}>
                      {r.total}<span style={{ fontSize: 13, marginLeft: 3, fontWeight: 600 }}>{r.unit}</span>
                    </div>
                    <div className="mono" style={{ fontSize: 9.5, color: '#7A6155', marginTop: 3 }}>total</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 14, padding: '12px 16px', background: '#241813', border: '1px solid #4A3528',
              borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span className="mono" style={{ fontSize: 11, color: '#9C8070', letterSpacing: '0.03em' }}>
                EC OBJETIVO PARA ESTA FASE
              </span>
              <span className="mono" style={{ fontSize: 14, color: '#E8674A', fontWeight: 700 }}>
                {phase.ecTarget[0]}–{phase.ecTarget[1]} mS/cm
              </span>
            </div>
            <p style={{ fontSize: 11.5, color: '#7A6155', marginTop: 10, lineHeight: 1.5 }}>
              Estos valores son un punto de partida calculado sobre el rango oficial del fabricante. Siempre confirmá con un medidor de EC — el agua de tu zona y el sustrato cambian la concentración final real.
            </p>
          </section>
        )}

        {availableProducts.length > 0 && results.length === 0 && (
          <div style={{
            border: '1px dashed #4A3528', borderRadius: 8, padding: '24px 18px',
            textAlign: 'center', color: '#9C8070', fontSize: 13,
          }}>
            Elegí uno o más productos arriba para calcular la mezcla.
          </div>
        )}

        <p style={{ marginTop: 36, fontSize: 11.5, color: '#7A6155', textAlign: 'center', lineHeight: 1.6 }}>
          Dosis basadas en fichas técnicas oficiales de cada fabricante. Para marcas no listadas aquí, consultá siempre la etiqueta del producto — las formulaciones cambian entre lotes y países.
        </p>

        <details style={{ marginTop: 24 }}>
          <summary className="mono" style={{
            fontSize: 11, color: '#9C8070', cursor: 'pointer', letterSpacing: '0.04em',
            textTransform: 'uppercase', textAlign: 'center', listStyle: 'none',
          }}>
            Marcas en catálogo sin dosis verificada ({UNVERIFIED_PRODUCTS.length})
          </summary>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {UNVERIFIED_PRODUCTS.map((p, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', fontSize: 12,
                padding: '8px 12px', background: '#241813', borderRadius: 6, border: '1px solid #2A2F22',
              }}>
                <span style={{ color: '#C2A896', fontWeight: 600 }}>{p.brand} — {p.name}</span>
                <span className="mono" style={{ color: '#7A6155', fontSize: 10.5 }}>{p.reason}</span>
              </div>
            ))}
          </div>
        </details>
      </main>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="mono" style={{
      fontSize: 9.5, color: '#C2A896', background: '#1E1410', border: '1px solid #4A3528',
      borderRadius: 4, padding: '2px 7px', letterSpacing: '0.02em',
    }}>
      {children}
    </span>
  );
}

const labelStyle = {
  fontSize: 10.5, color: '#9C8070', display: 'block', marginBottom: 6, letterSpacing: '0.04em',
};
const inputStyle = {
  width: '100%', padding: '10px 12px', background: '#2A1D17', border: '1px solid #4A3528',
  borderRadius: 6, color: '#F5EBE0', fontSize: 14,
};
const sectionTitleStyle = {
  fontSize: 13, letterSpacing: '0.08em', color: '#E8674A', marginBottom: 14, textTransform: 'uppercase',
};

// ---- Datos sincronizados de nutrients.json ----
const NUTRIENTS = {
  nut_n: { name: 'Nitrógeno', symbol: 'N', mobile: true, function: 'Componente de aminoácidos, proteínas, ácidos nucleicos y clorofila.', phRange: [6.0, 8.0] },
  nut_p: { name: 'Fósforo', symbol: 'P', mobile: true, function: 'ATP (energía celular), ADN/ARN, fosfolípidos de membranas.', phRange: [6.0, 7.0] },
  nut_k: { name: 'Potasio', symbol: 'K', mobile: true, function: 'Regulación osmótica, activación enzimática, síntesis de aceites.', phRange: [6.0, 8.0] },
  nut_ca: { name: 'Calcio', symbol: 'Ca', mobile: false, function: 'Estabilidad de pared celular, desarrollo radicular.', phRange: [6.5, 8.0] },
  nut_mg: { name: 'Magnesio', symbol: 'Mg', mobile: true, function: 'Núcleo de la clorofila, cofactor enzimático.', phRange: [6.0, 8.5] },
  nut_fe: { name: 'Hierro', symbol: 'Fe', mobile: false, function: 'Síntesis de clorofila, cadena respiratoria.', phRange: [5.5, 6.5] },
  nut_b: { name: 'Boro', symbol: 'B', mobile: false, function: 'División celular, transporte de azúcares.', phRange: [5.5, 7.0] },
};

// ---- Datos sincronizados de diagnostics.json ----
const SYMPTOMS = [
  {
    id: 'diag_001', nutrientId: 'nut_n', conditionType: 'deficiency',
    description: 'Amarillo empieza en hojas bajas y avanza hacia arriba',
    affectedLeaves: 'old', pattern: 'uniform_yellowing_bottom_up', rank: 1,
    confirmationSteps: ['Verificar pH del sustrato/solución', 'Verificar EC (puede estar muy baja)', 'Confirmar que no es fase de maduración natural (senescencia normal)'],
  },
  {
    id: 'diag_002', nutrientId: 'nut_p', conditionType: 'deficiency',
    description: 'Tonos morados/rojizos en tallos y hojas',
    affectedLeaves: 'old', pattern: 'purple_red_tint', rank: 2,
    confirmationSteps: ['Descartar temperatura baja nocturna como causa alternativa (también produce antocianinas)', 'Verificar pH (P se bloquea fácilmente con pH alto)'],
  },
  {
    id: 'diag_003', nutrientId: 'nut_k', conditionType: 'deficiency',
    description: 'Bordes de hojas quemados, necrosis marginal en hojas viejas',
    affectedLeaves: 'old', pattern: 'marginal_necrosis', rank: 1,
    confirmationSteps: ['Medir EC general (descartar exceso de sales por Na/Cl)', 'Verificar relación con exceso de Ca o Mg (antagonismo)'],
  },
  {
    id: 'diag_004', nutrientId: 'nut_fe', conditionType: 'deficiency',
    description: 'Amarillo internervial en hojas nuevas (jóvenes)',
    affectedLeaves: 'new', pattern: 'interveinal_chlorosis_new_growth', rank: 1,
    confirmationSteps: ['Medir pH inmediatamente — causa más probable es pH alto', 'Si pH está correcto, verificar exceso de Mn/Zn'],
  },
  {
    id: 'diag_005', nutrientId: 'nut_mg', conditionType: 'deficiency',
    description: 'Manchas amarillas irregulares entre nervios en hojas medias',
    affectedLeaves: 'middle', pattern: 'interveinal_chlorosis_middle', rank: 1,
    confirmationSteps: ['Muy común en sustrato de coco — verificar uso de Cal-Mag', 'Verificar exceso de K (bloquea Mg)'],
  },
  {
    id: 'diag_006', nutrientId: 'nut_b', conditionType: 'deficiency',
    description: 'Deformación de hojas jóvenes, muerte del ápice (meristemo)',
    affectedLeaves: 'new', pattern: 'apical_death_deformation', rank: 3,
    confirmationSteps: ['Verificar pH (muy bajo o muy alto bloquea B)', 'Revisar sustrato — déficit real es raro, generalmente es bloqueo'],
  },
  {
    id: 'diag_007', nutrientId: 'nut_ca', conditionType: 'deficiency',
    description: 'Manchas marrones en hojas jóvenes',
    affectedLeaves: 'new', pattern: 'brown_spots_new_growth', rank: 2,
    confirmationSteps: ['Muy común en humedad alta + falta de Ca', 'Verificar uso de Cal-Mag en coco/hidro'],
  },
  {
    id: 'diag_008', nutrientId: 'nut_n', conditionType: 'toxicity',
    description: 'Hojas verde oscuro uniforme, quemadura en puntas',
    affectedLeaves: 'all', pattern: 'dark_green_tip_burn', rank: 1,
    confirmationSteps: ['Medir EC — probablemente muy alta', 'Reducir dosis y considerar lavado de raíces'],
  },
  {
    id: 'diag_009', nutrientId: 'nut_n', conditionType: 'toxicity',
    description: 'Hojas rizadas hacia abajo en forma de garra (clawing)',
    affectedLeaves: 'all', pattern: 'leaf_clawing', rank: 1,
    confirmationSteps: ['Verificar EC alta', 'Verificar temperatura ambiente (calor también causa clawing)', 'Revisar exceso de riego/sobrefertilización reciente'],
  },
];

const LOCKOUT_CAUSES = [
  { id: 'lock_001', cause: 'pH fuera de rango', description: 'La causa más común de bloqueo de nutrientes. Afecta disponibilidad de todos los elementos según ventana de pH específica.', rank: 1, solution: 'Medir y corregir pH al rango objetivo de la fase y método de cultivo.' },
  { id: 'lock_002', cause: 'Antagonismo iónico', description: 'Exceso de un ion bloquea absorción de otro: K alto bloquea Mg y Ca, Ca alto bloquea Mg, Zn alto bloquea Fe.', rank: 2, solution: 'Revisar balance de la solución nutritiva, no abusar de un solo aditivo.' },
  { id: 'lock_003', cause: 'Sal acumulada (EC muy alta)', description: 'Ósmosis inversa saca agua de las raíces en lugar de permitir absorción.', rank: 3, solution: 'Lavado de raíces con agua pH corregida, reiniciar con dosis bajas.' },
  { id: 'lock_004', cause: 'Raíces dañadas', description: 'Por hongos, sobre-riego, calor o estrés mecánico (trasplante).', rank: 4, solution: 'Identificar y tratar causa raíz (fungicida biológico, corregir riego).' },
  { id: 'lock_005', cause: 'Temperatura de sustrato baja', description: 'Por debajo de 18°C ralentiza drásticamente la absorción de P.', rank: 5, solution: 'Usar calentador de sustrato o subir temperatura ambiente.' },
];

const LEAF_OPTIONS = [
  { id: 'old', label: 'Hojas viejas / de abajo', hint: 'Las más cercanas a la base del tallo' },
  { id: 'new', label: 'Hojas nuevas / de arriba', hint: 'Los brotes y crecimiento más reciente' },
  { id: 'middle', label: 'Hojas del medio', hint: 'Ni las más viejas ni las más nuevas' },
  { id: 'all', label: 'Toda la planta por igual', hint: 'Sin importar la edad de la hoja' },
];

const PATTERN_OPTIONS = [
  { id: 'uniform_yellowing_bottom_up', label: 'Amarillo uniforme que avanza de abajo hacia arriba', leaves: ['old'] },
  { id: 'purple_red_tint', label: 'Tonos morados o rojizos en hojas y tallos', leaves: ['old'] },
  { id: 'marginal_necrosis', label: 'Bordes quemados / secos (necrosis en el margen)', leaves: ['old'] },
  { id: 'interveinal_chlorosis_new_growth', label: 'Amarillo entre las nervaduras (las nervaduras quedan verdes)', leaves: ['new'] },
  { id: 'interveinal_chlorosis_middle', label: 'Manchas amarillas irregulares entre nervios', leaves: ['middle'] },
  { id: 'apical_death_deformation', label: 'Deformación y muerte de la punta de crecimiento', leaves: ['new'] },
  { id: 'brown_spots_new_growth', label: 'Manchas marrones puntuales', leaves: ['new'] },
  { id: 'dark_green_tip_burn', label: 'Verde muy oscuro con quemadura en las puntas', leaves: ['all'] },
  { id: 'leaf_clawing', label: 'Hojas curvadas hacia abajo como garra', leaves: ['all'] },
];

function NutrientPill({ nutrientId }) {
  const n = NUTRIENTS[nutrientId];
  if (!n) return null;
  return (
    <span className="mono" style={{
      display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700,
      background: '#E8674A1f', color: '#E8674A', border: '1px solid #E8674A55',
      borderRadius: 20, padding: '3px 10px',
    }}>
      {n.symbol} · {n.name}
    </span>
  );
}

function DiagModule() {
  const [step, setStep] = useState(1);
  const [selectedLeaf, setSelectedLeaf] = useState(null);
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [expandedResult, setExpandedResult] = useState(null);

  const availablePatterns = useMemo(
    () => PATTERN_OPTIONS.filter(p => p.leaves.includes(selectedLeaf)),
    [selectedLeaf]
  );

  const matchedSymptoms = useMemo(() => {
    if (!selectedPattern) return [];
    return SYMPTOMS.filter(s => s.pattern === selectedPattern).sort((a, b) => a.rank - b.rank);
  }, [selectedPattern]);

  const reset = () => {
    setStep(1);
    setSelectedLeaf(null);
    setSelectedPattern(null);
    setExpandedResult(null);
  };

  const pickLeaf = (leafId) => {
    setSelectedLeaf(leafId);
    setSelectedPattern(null);
    setStep(2);
  };

  const pickPattern = (patternId) => {
    setSelectedPattern(patternId);
    setStep(3);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1E1410',
      color: '#F5EBE0',
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      <style>{`
        * { box-sizing: border-box; }
        .mono { font-family: 'JetBrains Mono', monospace; }
      .serif { font-family: 'Fraunces', Georgia, serif; }
      .serif-italic { font-family: 'Fraunces', Georgia, serif; font-style: italic; }
        ::selection { background: #E8674A; color: #1E1410; }
        button { font-family: inherit; }
        .option-card { transition: border-color 0.15s, background 0.15s, transform 0.15s; cursor: pointer; text-align: left; }
        .option-card:hover { border-color: #E8674A !important; transform: translateX(2px); }
        .result-card { transition: all 0.2s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .step-content { animation: fadeIn 0.25s ease; }
      `}</style>

      <header style={{
        borderBottom: '1px solid #4A3528', padding: '32px 24px 26px',
        background: 'linear-gradient(180deg, #241813 0%, #1E1410 100%)',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{ width: 28, height: 2, background: 'linear-gradient(90deg, #E0A05E, #E8674A)', marginBottom: 10, borderRadius: 1 }} />
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: '#E0A05E', marginBottom: 8, textTransform: 'uppercase' }}>
            Cannabis Master · Diagnóstico
          </div>
          <h1 className="serif" style={{ margin: 0, fontSize: 30, fontWeight: 600, letterSpacing: '-0.01em' }}>
            Diagnóstico Visual
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: '#C2A896', maxWidth: 500 }}>
            Describí dónde aparece el síntoma y qué forma tiene. Te muestro las causas más probables, ordenadas por frecuencia real.
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '28px 24px 80px' }}>

        {/* PROGRESS INDICATOR */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
          {[1, 2, 3].map(n => (
            <div key={n} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: step >= n ? '#E8674A' : '#4A3528',
            }} />
          ))}
        </div>

        {/* STEP 1: LEAF LOCATION */}
        {step === 1 && (
          <div className="step-content">
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>¿Dónde aparece el síntoma?</h2>
            <p style={{ fontSize: 13, color: '#9C8070', marginBottom: 18 }}>
              La ubicación es la pista más importante — los nutrientes móviles muestran el problema primero en hojas viejas.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {LEAF_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  className="option-card"
                  onClick={() => pickLeaf(opt.id)}
                  style={{
                    background: '#2A1D17', border: '1px solid #4A3528', borderRadius: 10,
                    padding: '16px 18px',
                  }}
                >
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: '#F5EBE0' }}>{opt.label}</div>
                  <div style={{ fontSize: 12.5, color: '#9C8070', marginTop: 3 }}>{opt.hint}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: VISUAL PATTERN */}
        {step === 2 && (
          <div className="step-content">
            <button onClick={() => setStep(1)} style={diagBackLinkStyle}>← Cambiar ubicación</button>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginTop: 14, marginBottom: 4 }}>¿Qué forma tiene el síntoma?</h2>
            <p style={{ fontSize: 13, color: '#9C8070', marginBottom: 18 }}>
              Elegí la opción que más se parezca a lo que ves en tu planta.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {availablePatterns.map(opt => (
                <button
                  key={opt.id}
                  className="option-card"
                  onClick={() => pickPattern(opt.id)}
                  style={{
                    background: '#2A1D17', border: '1px solid #4A3528', borderRadius: 10,
                    padding: '16px 18px',
                  }}
                >
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: '#F5EBE0' }}>{opt.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: RESULTS */}
        {step === 3 && (
          <div className="step-content">
            <button onClick={() => setStep(2)} style={diagBackLinkStyle}>← Cambiar patrón visual</button>

            <h2 style={{ fontSize: 16, fontWeight: 700, marginTop: 14, marginBottom: 16 }}>
              {matchedSymptoms.length > 0
                ? `Causa${matchedSymptoms.length > 1 ? 's' : ''} más probable${matchedSymptoms.length > 1 ? 's' : ''}`
                : 'Sin coincidencia exacta'}
            </h2>

            {matchedSymptoms.map((symptom, i) => {
              const nutrient = NUTRIENTS[symptom.nutrientId];
              const isExpanded = expandedResult === symptom.id;
              const isToxicity = symptom.conditionType === 'toxicity';
              return (
                <div
                  key={symptom.id}
                  className="result-card"
                  style={{
                    background: i === 0 ? '#3D2419' : '#2A1D17',
                    border: i === 0 ? '1px solid #E8674A' : '1px solid #4A3528',
                    borderRadius: 10, marginBottom: 12, overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => setExpandedResult(isExpanded ? null : symptom.id)}
                    style={{
                      width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                      padding: '16px 18px', textAlign: 'left', color: '#F5EBE0',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{ flex: 1 }}>
                        {i === 0 && (
                          <div className="mono" style={{ fontSize: 10, color: '#E0A05E', fontWeight: 700, marginBottom: 6, letterSpacing: '0.04em' }}>
                            MÁS PROBABLE
                          </div>
                        )}
                        <div style={{ fontSize: 15, fontWeight: 700 }}>
                          {isToxicity ? 'Exceso' : 'Deficiencia'} de {nutrient.name}
                        </div>
                        <div style={{ fontSize: 13, color: '#C2A896', marginTop: 4 }}>{symptom.description}</div>
                        <div style={{ marginTop: 10 }}>
                          <NutrientPill nutrientId={symptom.nutrientId} />
                          {nutrient.mobile && (
                            <span className="mono" style={{ fontSize: 10.5, color: '#9C8070', marginLeft: 8 }}>
                              (nutriente móvil)
                            </span>
                          )}
                        </div>
                      </div>
                      <span style={{ color: '#9C8070', fontSize: 18, transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>⌄</span>
                    </div>
                  </button>

                  {isExpanded && (
                    <div style={{ padding: '0 18px 18px', borderTop: '1px solid #4A3528' }}>
                      <div style={{ marginTop: 14 }}>
                        <div className="mono" style={{ fontSize: 10.5, color: '#9C8070', letterSpacing: '0.04em', marginBottom: 6 }}>
                          FUNCIÓN DEL NUTRIENTE
                        </div>
                        <p style={{ fontSize: 13, color: '#D9C4B5', margin: 0, lineHeight: 1.5 }}>{nutrient.function}</p>
                      </div>

                      <div style={{ marginTop: 14 }}>
                        <div className="mono" style={{ fontSize: 10.5, color: '#9C8070', letterSpacing: '0.04em', marginBottom: 6 }}>
                          PASOS PARA CONFIRMAR
                        </div>
                        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: '#D9C4B5', lineHeight: 1.7 }}>
                          {symptom.confirmationSteps.map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ul>
                      </div>

                      <div style={{
                        marginTop: 14, padding: '10px 14px', background: '#1E1410',
                        border: '1px solid #4A3528', borderRadius: 6,
                        display: 'flex', justifyContent: 'space-between',
                      }}>
                        <span className="mono" style={{ fontSize: 11, color: '#9C8070' }}>pH ÓPTIMO PARA ESTE NUTRIENTE</span>
                        <span className="mono" style={{ fontSize: 12, color: '#E8674A', fontWeight: 700 }}>
                          {nutrient.phRange[0]}–{nutrient.phRange[1]}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {matchedSymptoms.length === 0 && (
              <div style={{
                border: '1px dashed #4A3528', borderRadius: 10, padding: '22px 18px',
                textAlign: 'center', color: '#9C8070', fontSize: 13,
              }}>
                No encontramos una coincidencia exacta en la base de datos. Esto puede ser una combinación de factores — revisá las causas de bloqueo general más abajo.
              </div>
            )}

            {/* LOCKOUT SECTION */}
            <div style={{ marginTop: 28 }}>
              <h3 className="mono" style={{ fontSize: 12, letterSpacing: '0.06em', color: '#E8674A', marginBottom: 12, textTransform: 'uppercase' }}>
                Si el síntoma persiste después de corregir el nutriente
              </h3>
              <p style={{ fontSize: 12.5, color: '#9C8070', marginBottom: 14, lineHeight: 1.5 }}>
                El 80% de los problemas visuales no son falta real del nutriente — son <strong style={{ color: '#D9C4B5' }}>bloqueo (lockout)</strong>. Revisá estas causas en orden de frecuencia:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {LOCKOUT_CAUSES.map(lock => (
                  <div key={lock.id} style={{
                    background: '#241813', border: '1px solid #2A2F22', borderRadius: 8,
                    padding: '12px 14px', display: 'flex', gap: 12,
                  }}>
                    <div className="mono" style={{ fontSize: 11, color: '#7A6155', fontWeight: 700, flexShrink: 0, paddingTop: 1 }}>
                      #{lock.rank}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#F5EBE0' }}>{lock.cause}</div>
                      <p style={{ fontSize: 12, color: '#C2A896', margin: '3px 0 0', lineHeight: 1.4 }}>{lock.description}</p>
                      <p style={{ fontSize: 12, color: '#E8674A', margin: '6px 0 0', lineHeight: 1.4 }}>→ {lock.solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={reset}
              style={{
                marginTop: 28, width: '100%', padding: '12px 16px', borderRadius: 8,
                background: 'transparent', border: '1px solid #4A3528', color: '#C2A896',
                fontSize: 13.5, cursor: 'pointer', fontWeight: 600,
              }}
            >
              Empezar un nuevo diagnóstico
            </button>
          </div>
        )}

        <p style={{ marginTop: 36, fontSize: 11.5, color: '#7A6155', textAlign: 'center', lineHeight: 1.6 }}>
          Este diagnóstico es orientativo y se basa en patrones visuales comunes. Si el síntoma es severo o no mejora, considerá una prueba de laboratorio de agua y sustrato.
        </p>
      </main>
    </div>
  );
}

const diagBackLinkStyle = {
  background: 'none', border: 'none', color: '#E8674A', fontSize: 13, cursor: 'pointer',
  padding: 0, fontFamily: 'inherit', fontWeight: 600,
};

const MODULES = [
  {
    id: 'mod_1',
    num: 1,
    title: "BOTÁNICA Y BIOLOGÍA",
    level: 'novato',
    category: "Fundamentos",
    icon: "🌱",
    body: `### 1.1 Taxonomía

- Familia: Cannabaceae
- Género: Cannabis
- Especie principal: Cannabis sativa L. (incluye subsp. sativa, indica, ruderalis)
- Planta dioica (pies masculinos y femeninos separados) — aunque existen hermafroditas por estrés
- Las plantas femeninas son las que producen los tricomas con cannabinoides y terpenos

### 1.2 Morfología de la Planta

**Raíz**
- Raíz pivotante principal + raíces laterales absorbentes
- La zona de la rizosfera (suelo alrededor de la raíz) alberga microorganismos esenciales para la absorción de nutrientes
- Micorrizas (hongos simbióticos) amplían la superficie de absorción hasta 700 veces

**Tallo**
- Hueco en el interior (permite flujo de agua y nutrientes)
- Nudos donde emergen las ramas y hojas (internudos)
- Distancia entre internudos = indicador de salud y de fase

**Hojas**
- Hojas palmadas compuestas con 3 a 13 folíolos (según genética y fase)
- Presencia de estomas en el envés — regulan intercambio gaseoso y transpiración
- Cotiledones (primeras hojas, redondas) no cuentan como folíolos verdaderos

**Flores (Cogollos)**
- Compuestas por brácteas, pistilos y tricomas glandulares
- Los tricomas son las glándulas donde se sintetizan cannabinoides y terpenos
- Tipos de tricomas: bulbosos (pequeños), capitados sésiles (medios), capitados pediculados (los más dentos en cannabinoides — los más grandes y visibles)

### 1.3 Fotoperíodo y Autofloresentes

| Tipo | Floración disparada por | Tiempo de vida | Notas |
|---|---|---|---|
| Fotodependiente (regular) | Cambio a 12/12 horas luz | Variable | Mayor potencial de rendimiento y potencia |
| Autofloreciente (ruderalis) | Por tiempo/edad (sin importar luz) | 60-90 días desde semilla | Más fácil para novatos, menor rendimiento |
| Feminizada | Igual que madre (foto o auto) | — | Semillas tratadas para producir solo hembras |`,
  },
  {
    id: 'mod_2',
    num: 2,
    title: "FASES DEL CICLO DE VIDA",
    level: 'novato',
    category: "Fundamentos",
    icon: "📅",
    body: `### 2.1 Germinación (Días 1-7)

**Qué pasa biológicamente:**
- La semilla absorbe agua (proceso llamado imbibición)
- La enzima amilasa descompone el almidón del endospermo para dar energía a la plúmula y la radícula
- La radícula (raíz embrionaria) emerge primero — siempre hacia abajo por geotropismo
- Los cotiledones se abren y comienza la fotosíntesis básica

**Parámetros clave:**
- Temperatura: 22-26°C
- Humedad: 70-90% HR
- Luz: no esencial hasta que emergen los cotiledones
- Agua: suelo húmedo pero NO encharcado (riesgo de pudrición)

**Métodos comunes:**
- Vaso de agua (24h) → papel húmedo → tierra
- Directo en sustrato húmedo
- Propagadores con domo de humedad

### 2.2 Plántula / Seedling (Días 7-21 aprox.)

**Qué pasa biológicamente:**
- Los cotiledones proveen energía hasta que las primeras hojas verdaderas están operativas
- El sistema radicular se establece activamente
- La planta depende 100% de fotosíntesis
- Sistema de enzimas de detoxificación hepática se activa para metabolismo secundario

**Parámetros clave:**
- Temperatura: 22-26°C día / 18-20°C noche
- Humedad: 60-70% HR
- Luz: 18/6 (foto) o 20/4 horas
- Intensidad lumínica: baja (100-200 µmol PPFD)
- Nutrientes: casi ninguno — el sustrato nuevo suele ser suficiente

**Señales de salud:**
- Hojas verdes uniformes, primera hoja verdadera con 3 folíolos, luego 5, 7...
- Crecimiento activo en la punta (meristemo apical)

### 2.3 Fase Vegetativa (Semanas 2-12 aprox.)

**Qué pasa biológicamente:**
- Crecimiento vegetativo activo — la planta construye su estructura
- División celular intensa en meristemos (ápice y axilares)
- Síntesis masiva de clorofila a y b (requiere Mg, Fe, N)
- Acumulación de fotosintatos (azúcares) que luego se movilizarán a flores
- Las raíces se ramifican y profundizan activamente
- Relación hoja/raíz se equilibra progresivamente

**Necesidades nutricionales en vegetativo:**
- Nitrógeno (N): ALTO — regula síntesis de proteínas, clorofila y enzimas
  - Investigación Frontiers (2024): concentraciones óptimas de 160-200 mg/L de N en vegetativo
  - Deficiencia = amarillamiento progresivo desde hojas basales hacia arriba
- Fósforo (P): MEDIO — construcción de ADN, ARN, ATP (energía celular) y desarrollo radicular
  - Óptimo vegetativo: ~30 mg/L P
- Potasio (K): MEDIO-ALTO — regulación osmótica, activación enzimática, fotosíntesis
  - Óptimo vegetativo: ~60 mg/L K
- NPK típico para vegetativo: 3-1-2 o relaciones similares (ej: 9-5-8)

**Parámetros clave:**
- Temperatura: 22-28°C día / 18-22°C noche
- Humedad: 50-70% HR
- Luz fotodependiente: 18 horas luz / 6 horas oscuridad
- Intensidad: 400-600 µmol PPFD (creciendo hacia 800)
- pH suelo: 6.0-7.0 / pH hidro: 5.5-6.5
- EC (conductividad eléctrica): 0.8-1.6 mS/cm

**Duración:**
- Variedades foto: decidida por el grower (2-12 semanas)
- Variedades auto: automático por genética (3-5 semanas generalmente)

### 2.4 Pre-Floración / Transición (Semanas 1-2 de floración)

**Qué pasa biológicamente:**
- Al cambiar a 12/12 horas, la planta detecta el cambio vía fitocromos (proteínas sensibles a luz roja y rojo lejano)
- El fitocromo Pfr se acumula en oscuridad, actuando como señal de "noche larga"
- Se produce un pico transitorio de Nitrógeno — la planta sigue creciendo en altura (stretch)
- Primeros pelos blancos (pistilos) aparecen en los nodos — confirmación de hembra
- Inicio de síntesis de CBGA (cannabigerólic acid) — el "mother cannabinoid"

**Gestión:**
- Reducir N gradualmente
- Comenzar a introducir P y K más alto
- Monitorear stretch — puede doblar o triplicar altura en algunas genéticas

### 2.5 Floración Temprana (Semanas 2-4)

**Qué pasa biológicamente:**
- Formación activa de brácteas florales y cálices
- Los tricomas comienzan a diferenciarse y crecer
- La ruta metabólica MVA (mevalonato) produce GPP (geranil pirofosfato) — precursor de terpenos
- La ruta MEP (metil-eritritol fosfato) opera en paralelo en los cloroplastos
- CBGA se convierte en THCA, CBDA, CBCA por acción de sintasas específicas

**Necesidades nutricionales:**
- N: BAJO-MEDIO (planta aún crece un poco)
- P: ALTO — construcción de estructuras florales, síntesis de ATP para producción de resina
- K: ALTO — transporte de azúcares, producción de aceites esenciales
- Ca: MEDIO-ALTO — estabilidad de paredes celulares de tricomas
- Mg: MEDIO — núcleo de la clorofila, cofactor enzimático

### 2.6 Floración Pico (Semanas 4-7)

**Qué pasa biológicamente:**
- Máxima acumulación de cannabinoides y terpenos en tricomas
- Las tricomas pediculadas alcanzan su capacidad máxima de síntesis
- El THCA (ácido tetrahidrocannabinólico) se acumula en las cabezas de los tricomas
- Síntesis intensa de terpenos en los mismos tricomas vía terpeno sintasas (CsTPS)
- La planta redirige toda la energía hacia las flores — las hojas basales comienzan a amarillar (fenómeno normal)
- Pistilos se vuelven más cortos y cambian de blanco a naranja/marrón

**Necesidades nutricionales:**
- N: MUY BAJO (riesgo de hojas "green" = falta de maduración)
- P: MÁXIMO (síntesis de lípidos y estructuras de membrana en tricomas)
- K: MÁXIMO (osmótico, enzimático, síntesis de aceites)
- Aditivos: PK 13-14, estimuladores de resina, carbohidratos
- EC: 1.8-2.5 mS/cm (pico de alimentación)

**Parámetros clave:**
- Temperatura: mantener 24-26°C, bajar noche a 18-20°C para favorecer coloración y terpenos
- Humedad: BAJAR a 40-50% HR — reduce riesgo de botrytis (podredumbre gris)
- VPD (Vapor Pressure Deficit): 1.0-1.5 kPa es ideal en floración

### 2.7 Maduración y Senescencia (Últimas 1-2 semanas)

**Qué pasa biológicamente:**
- Los tricomas cambian de transparentes → opacos/blanquecinos → ámbar/marrones
- El THCA comienza a degradarse en CBN (cannabinol) por oxidación — tricomas ámbar = efecto más sedante
- La planta reduce activamente la absorción de nutrientes (senescencia natural)
- Pistilos casi todos naranjas/marrones — señal visual de madurez

**Lavado de raíces (flushing):**
- 7-14 días antes de cosecha, regar solo con agua pH'd
- Objetivos: eliminar sales minerales acumuladas en el sustrato y la planta
- Controvertido en orgánicos (el microbioma ya "limpia" el sustrato naturalmente)
- En cultivos minerales/hidro: el flushing mejora notablemente el sabor

**Indicadores de cosecha:**
- Microscopio o lupa 40-60x: tricomas 70-80% lechosos (efecto más cerebral) o 20-30% ámbar (efecto más sedante/cuerpo)
- Pistilos: 80-90% naranjos
- Brácteas hinchadas y cálices engordados`,
  },
  {
    id: 'mod_3',
    num: 3,
    title: "MÉTODOS DE CULTIVO",
    level: 'novato',
    category: "Fundamentos",
    icon: "🪴",
    body: `### 3.1 Tierra (Suelo)

**Tipo más accesible para novatos**

**Sustratos ideales:**
- Mix comercial para cannabis: turba/coco + perlita (15-30%) + tierra vegetal
- pH objetivo: 6.0-7.0

**Ventajas:**
- El microbioma del suelo actúa como buffer de pH y nutrientes
- Más perdonador para errores de dosificación
- Sabor final más complejo (terpenos + microorganismos)

**Desventajas:**
- Ciclo más lento de respuesta a correcciones
- Riesgo de sobrecompost o sobrefertilización

**Recomendación de sustrato casero para Argentina:**
- 40% tierra de jardín + 30% perlita + 20% coco + 10% vermicompost (lombricompuesto)

### 3.2 Coco Coir (Fibra de Coco)

**Ideal para growers intermedios**

- Sustrato inerte derivado de la cáscara de coco
- No aporta nutrientes propios — control total al grower
- Excelente aireación y capacidad de retención de humedad
- pH objetivo: 5.8-6.2
- Requiere riego más frecuente que tierra (hasta 2-3 veces al día en macetas grandes)
- Se recomienda siempre agregar cal-mag porque el coco atrapa Ca y Mg
- Ideal para usar con fertilizantes minerales en riego fertirrigado

### 3.3 Hidroponía

**Para growers avanzados — máximos rendimientos**

**Tipos principales:**
- DWC (Deep Water Culture): raíces suspendidas en solución nutritiva aireada — crecimiento muy rápido
- NFT (Nutrient Film Technique): película fina de solución en canales — eficiente pero sensible
- Ebb & Flow / Flood & Drain: inundación periódica de la bandeja — versátil
- Aeroponia: raíces nebulizadas — máximo oxígeno, máximo crecimiento

**pH en hidro: 5.5-6.5 (crítico, ventana más estrecha)**
**EC: muy preciso — sensores digitales obligatorios**

**Ventajas:**
- Ciclos 20-40% más rápidos que tierra
- Máximo control de nutrientes
- Rendimientos superiores en manos expertas

**Desventajas:**
- Costoso de implementar
- Muy sensible a errores (una falla de bomba puede perder el cultivo)
- Requiere monitoreo diario

### 3.4 Cultivo en Interior vs Exterior

| Factor | Interior | Exterior |
|---|---|---|
| Control ambiental | Total | Nulo o parcial |
| Ciclos al año | 4-6 | 1 (hemisferio sur: cosecha otoño) |
| Costo operativo | Alto (luz, clima) | Bajo |
| Riesgo plagas | Bajo (controlable) | Alto |
| Tamaño de planta | Limitado por espacio | Puede crecer enorme |
| Calidad final | Alta y consistente | Variable |`,
  },
  {
    id: 'mod_4',
    num: 4,
    title: "PARÁMETROS AMBIENTALES",
    level: 'intermedio',
    category: "Ambiente",
    icon: "🌡️",
    body: `### 4.1 Temperatura

- Vegetativo: 22-28°C (óptimo 24-26°C)
- Floración: 20-26°C día, 18-20°C noche
- Por encima de 30°C: estrés térmico, pérdida de terpenos volátiles
- Por debajo de 15°C: ralentización enzimática, problemas de absorción

### 4.2 Humedad Relativa (HR) y VPD

**VPD (Vapor Pressure Deficit)** — el indicador profesional más importante
VPD mide la diferencia entre la presión de vapor actual del aire y la máxima posible a esa temperatura.

| Fase | HR recomendada | VPD objetivo |
|---|---|---|
| Plántula | 65-80% | 0.4-0.8 kPa |
| Vegetativo | 50-70% | 0.8-1.2 kPa |
| Floración temprana | 45-55% | 1.0-1.5 kPa |
| Floración pico | 40-50% | 1.2-1.6 kPa |
| Maduración | 35-45% | 1.5-2.0 kPa |

Fórmula VPD aproximada: VPD = SVP × (1 - HR/100)
SVP (presión de vapor saturado) se calcula a la temperatura de la hoja (generalmente 1-2°C más baja que el aire)

### 4.3 CO₂

- Concentración ambiente: 400 ppm
- Con suplementación: 800-1500 ppm (aumenta fotosíntesis hasta 20-40%)
- Requiere mayor intensidad lumínica para aprovecharse
- No vale la pena sin iluminación intensa (>600 µmol PPFD)

### 4.4 Luz — Conceptos Clave

**PPFD (Photosynthetic Photon Flux Density)** — µmol/m²/s
Mide cuántos fotones fotosintéticamente activos golpean la superficie por segundo.

| Fase | PPFD recomendado |
|---|---|
| Plántula | 100-250 µmol/m²/s |
| Vegetativo | 400-600 µmol/m²/s |
| Floración temprana | 600-900 µmol/m²/s |
| Floración pico | 800-1000+ µmol/m²/s |

**DLI (Daily Light Integral)** = PPFD × horas de luz × 0.0036
Cannabis en floración necesita DLI de 30-45 mol/m²/d

**Espectro:**
- Azul (400-500nm): vegetativo, compacidad, apertura estomática
- Rojo (600-700nm): floración, elongación, fotosíntesis eficiente
- Rojo lejano (700-800nm): respuesta fitocromo (floración)
- UV-B (280-315nm): aumenta producción de tricomas y cannabinoides — estrés controlado positivo

**Tipos de iluminación para interior:**
- HPS (High Pressure Sodium): estándar durante décadas, espectro amarillo-rojo, calor alto
- CMH/LEC (Ceramic Metal Halide): espectro más completo incluyendo UV, eficiente
- LED Full Spectrum: más eficiente en consumo (µmol/J), menos calor, espectro programable — estándar actual

### 4.5 Ventilación y Circulación de Aire

- Renovación del aire: 1-3 veces por minuto el volumen del cuarto
- Extractor dimensionado en m³/h = volumen cuarto × 60 × factor calor (1.5 si hay HPS)
- Ventiladores oscilantes internos: fortalecen tallos (mecanosensitividad) y previenen hongos
- Filtro de carbón activo en extractor: elimina olor — obligatorio en CABA`,
  },
  {
    id: 'mod_5',
    num: 5,
    title: "BIOQUÍMICA PROFUNDA",
    level: 'avanzado',
    category: "Bioquímica",
    icon: "🧬",
    body: `### 5.1 Síntesis de Cannabinoides

La biosíntesis de cannabinoides es una rama de la biosíntesis de terpenoides y comparte los mismos precursores.

**Ruta Biosintética Completa:**

**Paso 1 — Ácido Olivetólico (porción fenólica)**
- Hexanoil-CoA + 3 × Malonil-CoA
- Enzima: Olivetol Sintasa (OLS/TKS — tetraketide synthase)
- Ciclación por Olivetolic Acid Cyclase (OAC)
- Resultado: Ácido Olivetólico

**Paso 2 — GPP (Geranil Pirofosfato) (porción terpenoide)**
- Producido vía ruta MEP en cloroplastos
- IPP (isopentenil pirofosfato) + DMAPP → GPP
- GPP es también precursor de todos los monoterpenos

**Paso 3 — CBGA (Ácido Cannabigerólico) — "Mother Cannabinoid"**
- Ácido Olivetólico + GPP
- Enzima: Preniltransferasa aromática (PT/CsPT)
- Resultado: CBGA — precursor de TODOS los cannabinoides

**Paso 4 — Cannabinoides específicos (desde CBGA)**
- CBGA → **THCA** (Ácido Tetrahidrocannabinólico) — Enzima: THCA Sintasa
- CBGA → **CBDA** (Ácido Cannabidiolico) — Enzima: CBDA Sintasa
- CBGA → **CBCA** (Ácido Cannabicromenico) — Enzima: CBCA Sintasa
- CBGA restante = CBG en la planta madura

**Paso 5 — Decarboxilación (por calor)**
- THCA + calor (>100°C) → **THC** (activo, psicoactivo)
- CBDA + calor → **CBD** (activo, no psicoactivo)
- Proceso que ocurre al fumar, vapear o descarboxilar en horno

**Degradación:**
- THCA expuesto a luz/calor → CBN (cannabinol) — efecto sedante
- Tricomas ámbar = mayor CBN

### 5.2 Síntesis de Terpenos

Los terpenos se sintetizan en los tricomas glandulares vía las mismas rutas terpenoide que los cannabinoides.

**Rutas:**
- Ruta MEP (cloroplastos): produce IPP y DMAPP → GPP → monoterpenos (C10)
- Ruta MVA (citoplasma): produce IPP → FPP (farnesil pirofosfato) → sesquiterpenos (C15)

**Principales Terpenos en Cannabis:**

| Terpeno | Aroma | Efectos descritos | Otros vegetales |
|---|---|---|---|
| β-Mirceno | Terroso, húmedo | Sedante, relajante | Mango, lúpulo |
| Limoneno | Cítrico | Energizante, anti-ansiedad | Limón, naranja |
| α-Pineno | Pino | Alerta, broncodilatador | Pino, romero |
| β-Cariofileno | Pimienta, especias | Anti-inflamatorio (agonista CB2) | Pimienta negra, clavo |
| Linalool | Floral, lavanda | Ansiolítico, relajante | Lavanda |
| Terpinoleno | Frutal, floral | Sedante, antioxidante | Manzana, lila |
| α-Humuleno | Terroso, madera | Supresor del apetito | Lúpulo |

**Efecto Entourage:**
La interacción sinérgica entre cannabinoides y terpenos (y flavonoides) potencia o modifica los efectos. β-Cariofileno es el único terpeno conocido que activa directamente receptores endocannabinoides (CB2).

**Factores que aumentan producción de terpenos:**
- UV-B suplementario en últimas 2-3 semanas (activa genes biosintéticos de terpeno sintasas)
- Estrés osmótico leve (deficit hídrico controlado antes de cosecha)
- Diferencia térmica día/noche pronunciada (10°C de delta)
- Temperatura nocturna baja en maduración (18°C o menos)

### 5.3 El Sistema Endocannabinoide

**Para contextualizar el cultivo con la finalidad terapéutica/recreativa:**

- THC activa receptores CB1 (sistema nervioso central) → efectos psicoactivos
- CBD actúa sobre receptores 5-HT1A, TRP, GPR55 — modulador, no agonista directo
- CB2 (sistema inmune): activado por β-cariofileno y endocannabinoides (2-AG, anandamida)
- La planta produce los cannabinoides como mecanismo de defensa (luz UV, herbívoros, hongos)`,
  },
  {
    id: 'mod_6',
    num: 6,
    title: "NUTRICIÓN Y FERTILIZACIÓN",
    level: 'intermedio',
    category: "Nutrición",
    icon: "🧪",
    body: `### 6.1 Macronutrientes Primarios (NPK)

**Nitrógeno (N)**
- Forma absorbida: NO₃⁻ (nitrato) y NH₄⁺ (amonio)
- Función: componente de aminoácidos, proteínas, ácidos nucleicos, clorofila
- En vegetativo: demanda máxima (160-200 mg/L en estudios científicos)
- En floración: reducir progresivamente para no inhibir maduración
- Exceso: hojas verde oscuro, quemadura en puntas, bloqueo de floración
- Deficiencia: amarillamiento en hojas viejas basales primero (N es móvil)

**Fósforo (P)**
- Forma absorbida: H₂PO₄⁻ y HPO₄²⁻
- Función: ATP (energía), ADN/ARN, fosfolípidos de membranas, señalización celular
- Crítico en: germinación, enraizamiento, inicio de floración, síntesis de resina
- Óptimo vegetativo: 30 mg/L P
- En floración: aumentar significativamente
- Deficiencia: hojas con tonos púrpura/rojizo (antocianinas), crecimiento lento
- Disponibilidad pH-dependiente: mejor absorbido entre pH 6.0-7.0 (tierra) o 5.5-6.5 (hidro)

**Potasio (K)**
- Forma absorbida: K⁺
- Función: regulación osmótica, activación de más de 60 enzimas, apertura/cierre estomática, síntesis de aceites y terpenos, transporte de azúcares (fotoasimilados)
- Óptimo vegetativo: 60 mg/L K
- Deficiencia: bordes de hojas quemados (necrosis marginal), empezando por hojas viejas
- Exceso: puede bloquear absorción de Mg, Ca y Zn

### 6.2 Macronutrientes Secundarios

**Calcio (Ca)**
- Función: estabilidad de pared celular, señalización celular, desarrollo radicular
- Especialmente importante en: climas húmedos (previene blossom end rot en cogollos), cultivo en coco
- Deficiencia: manchas marrones en hojas jóvenes (Ca es inmóvil — los síntomas aparecen en tejido nuevo)
- Dosis típica: 150-200 mg/L en fertirrigación

**Magnesio (Mg)**
- Función: núcleo de la molécula de clorofila (1 átomo de Mg por clorofila), cofactor enzimático, síntesis de carbohidratos
- Muy común la deficiencia en coco (el coco secuestra Ca y Mg)
- Deficiencia: amarillamiento internervial en hojas medias (Mg es móvil — se moviliza de hojas viejas a jóvenes)
- Dosis típica: 50-75 mg/L

**Azufre (S)**
- Función: síntesis de aminoácidos azufrados (cisteína, metionina), precursor de algunos terpenos tiolados (contribuyen al aroma "fuel" y a algunos perfiles terpenoides)
- Deficiencia: amarillamiento en hojas jóvenes

### 6.3 Micronutrientes (Oligoelementos)

| Elemento | Función | Síntoma deficiencia |
|---|---|---|
| Hierro (Fe) | Síntesis de clorofila, cadena respiratoria | Amarillamiento internervial en hojas jóvenes |
| Manganeso (Mn) | Fotolisis del agua en fotosíntesis, oxidasas | Manchas amarillas entre nervios |
| Zinc (Zn) | Síntesis de auxinas (fitohormonas de elongación), enzimas | Hojas pequeñas, internudos cortos |
| Boro (B) | División celular, transporte de azúcares, síntesis de pared celular | Deformación de hojas jóvenes, muerte del ápice |
| Cobre (Cu) | Enzimas de lignificación, componente de plastocianina | Hojas azuladas, marchitez |
| Molibdeno (Mo) | Reducción de nitrato a amonio | Deficiencia de N-like, bordes amarillos |

**Regla de oro:** Los micronutrientes se necesitan en cantidades mínimas (ppb a ppm) pero son igual de esenciales. La mayoría de fertilizantes base de calidad los incluyen. Los problemas de micronutrientes suelen ser de disponibilidad por pH incorrecto, no de ausencia real en el sustrato.

### 6.4 pH — El Parámetro Más Crítico

El pH controla la disponibilidad de TODOS los nutrientes. Una planta puede tener todos los nutrientes en el sustrato y aun así mostrar deficiencias si el pH está fuera de rango.

**Ventanas óptimas de absorción por nutriente:**
- N: 6.0-8.0 (amplio)
- P: 6.0-7.0 (estrecho — muy afectado por pH alto)
- K: 6.0-8.0
- Ca: 6.5-8.0 (mejor en pH más alto)
- Mg: 6.0-8.5
- Fe: 5.5-6.5 (SOLO disponible en pH ácido — deficiencia clásica en pH alto)
- Mn, Cu, Zn, B: 5.5-6.5

**Implicación práctica:** En tierra, mantener 6.2-6.8 maximiza la disponibilidad de todos los nutrientes. En coco/hidro, 5.8-6.2.

### 6.5 EC (Conductividad Eléctrica)

Medida en mS/cm (milisiemens por centímetro). Indica la concentración total de sales minerales en la solución nutritiva.

| Fase | EC recomendado |
|---|---|
| Plántula | 0.2-0.6 mS/cm |
| Vegetativo temprano | 0.8-1.2 mS/cm |
| Vegetativo avanzado | 1.2-1.8 mS/cm |
| Floración temprana | 1.4-2.0 mS/cm |
| Floración pico | 1.8-2.4 mS/cm |
| Maduración/flushing | 0-0.4 mS/cm |`,
  },
  {
    id: 'mod_7',
    num: 7,
    title: "FERTILIZANTES: OPCIONES DE MERCADO",
    level: 'intermedio',
    category: "Nutrición",
    icon: "🏷️",
    body: `### 7.1 Marcas Nacionales Argentina — Las Más Disponibles en Growshops

**NAMASTE NUTRIENTES**
- Empresa argentina con +10 años en el mercado
- Presente en mayoristas y growshops en todo el país
- Línea completa: crecimiento, floración, estimulantes, raíces
- Accesible en precio, buena relación calidad/precio para el mercado local
- Disponible en: Astro Grow Shop, 0800 Growshop, Gangagrow y otros
- Punto fuerte: formulaciones adaptadas a agua de Argentina (generalmente alta en bicarbonatos)

**KAWSAY NUTRIENTES**
- Marca argentina consolidada en el ecosistema de growshops
- Línea: Base A & B (para hidro y coco), Buffer pH, Silicio, Control
- Sistema A&B es estándar profesional — permite ajuste más fino que producto único
- Disponible en 0800 Grow, Astro Grow, y distribuidores en todo el país
- Buena opción para coco y sistemas hidropónicos

**TREEMIX**
- Marca argentina con línea modular (productos individuales por función)
- Productos: N (nitrógeno), A (aminoácidos), Floracion, Raíz, etc.
- Muy popular en la comunidad cannabica argentina
- Formato de 45ml, 250ml y más — accesible para probar sin inversión grande
- Amplia red de distribución nacional

**PANGEA NUTRIENTES**
- Marca argentina enfocada en orgánicos y bioestimulantes
- Productos: línea completa vegetativo y floración
- Popular entre growers que prefieren línea orgánica/bioorgánica local
- Disponible en Gangagrow y varios growshops nacionales

**PHITONAT**
- Marca argentina con enfoque en productos fitosanitarios y nutrición
- Presente en Astro Grow y distribuidores varios
- Línea más orientada a uso profesional

**VAMP**
- Marca nacional con creciente presencia en growshops
- Línea de fertilizantes y bioestimulantes

**MANTRA NUTRIENTES**
- Otra opción nacional disponible en los principales growshops de CABA y GBA

### 7.2 Internacional Accesible — Recomendación Costo-Beneficio

**GENERAL HYDROPONICS — MaxiSeries (MaxiGro + MaxiBloom)**
- Marca estadounidense líder mundial
- MaxiGro (NPK 10-5-14) para vegetativo
- MaxiBloom (NPK 5-15-14) para floración
- Formato polvo soluble — extremadamente concentrado
- 1 KG alcanza para cientos de litros de solución
- **Precio comparativo: de los más económicos por litro producido en el mercado**
- Sistema de 2 productos únicamente — extremadamente simple
- Disponible en Argentina a través de importadores y growshops con sección hidro
- También accesible vía importación personal (Mercado Libre o growshops especializados)
- Fácil de usar: MaxiGro 7g/L en veg, MaxiBloom 7g/L en floración

**Por qué es la mejor internacional accesible:**
- Un sistema de DOS productos lo cubre todo (veg + bloom)
- Costo por litro de solución 3-5x menor que marcas premium líquidas
- Formulación equilibrada con micronutrientes incluidos
- Estabilidad del pH buena (menos ajuste necesario)
- Ampliamente documentado y con tablas de cultivo disponibles online

### 7.3 Marcas Internacionales Premium (Referencia)

| Marca | País | Característica | Precio relativo |
|---|---|---|---|
| CANNA | Holanda | Referencia histórica, líneas para tierra/coco/hidro | Alto |
| BioBizz | Holanda | 100% orgánico, fácil para novatos | Medio-Alto |
| Advanced Nutrients | Canadá | pH Perfect technology, línea completa | Muy Alto |
| Athena | USA | Estándar de grow rooms comerciales, 2-part system | Alto |
| Plagron | Holanda | Buena relación calidad/precio, línea completa | Medio |
| General Hydroponics | USA | MaxiSeries: el más económico de calidad | Bajo-Medio |`,
  },
  {
    id: 'mod_8',
    num: 8,
    title: "DIAGNÓSTICO DE DEFICIENCIAS Y TOXICIDADES",
    level: 'intermedio',
    category: "Nutrición",
    icon: "🔍",
    body: `### 8.1 Regla de Movilidad

**Nutrientes móviles** (se mueven de hojas viejas a jóvenes cuando hay déficit):
N, P, K, Mg, Zn → Los síntomas aparecen PRIMERO en hojas VIEJAS (bajas)

**Nutrientes inmóviles** (no se mueven una vez depositados):
Ca, Fe, Mn, B, Cu → Los síntomas aparecen PRIMERO en hojas JÓVENES (nuevas, del ápice)

### 8.2 Tabla de Diagnóstico Rápido

| Síntoma | Nutriente probable | Móvil? | Confirmar con |
|---|---|---|---|
| Amarillo empieza en hojas bajas, avanza arriba | N deficiencia | Sí | pH correcto? EC bajo? |
| Tonos morados/rojizos en tallos y hojas | P deficiencia | Sí | Temperatura baja también causa esto |
| Bordes quemados en hojas viejas | K deficiencia o exceso de Na/Cl | Sí | Medir EC, lavado |
| Amarillo internervial en hojas nuevas | Fe deficiencia | No | Muy probable pH alto |
| Manchas amarillas irregulares en hojas medias | Mg deficiencia | Sí | Común en coco |
| Deformación, muerte de ápice | B deficiencia | No | pH muy bajo o muy alto |
| Manchas marrones en hojas jóvenes | Ca deficiencia | No | Humedad alta + falta Ca |
| Todas las hojas verde oscuro, quemadura en puntas | N exceso | — | Reducir EC, lavar |
| Hojas rizadas hacia abajo (claw) | N exceso (toxicidad) o calor | — | Verificar temperatura y EC |

### 8.3 El Lockout (Bloqueo de Nutrientes)

El lockout ocurre cuando un nutriente está físicamente presente en el sustrato pero la planta no puede absorberlo. Causas principales:

1. **pH fuera de rango** — la causa más común
2. **Antagonismo iónico** — exceso de un ion bloquea a otro: K alto bloquea Mg y Ca / Ca alto bloquea Mg / Zn alto bloquea Fe
3. **Sal acumulada** (EC muy alta) — ósmosis inversa saca agua de las raíces
4. **Raíces dañadas** — por hongos, sobre-riego, calor o estrés mecánico
5. **Temperatura baja** — por debajo de 18°C ralentiza absorción de P drasticamente

**Solución general ante lockout:** Lavado con agua pH correcto (3-5x el volumen del sustrato), dejar drenar y luego reiniciar con dosis bajas de nutrientes.`,
  },
  {
    id: 'mod_9',
    num: 9,
    title: "TÉCNICAS DE CONDUCCIÓN Y MANEJO",
    level: 'intermedio',
    category: "Técnicas",
    icon: "✂️",
    body: `### 9.1 LST (Low Stress Training)

- Doblar y atar ramas para crear una copa plana y uniforme
- Sin cortes — la planta no entra en recuperación de estrés
- Objetivo: exponer todos los puntos de crecimiento (meristemos) a la luz
- Ideal para: autofloresentes, plantas en espacios reducidos
- Herramienta: alambre suave, clips de jardín

### 9.2 Topping

- Corte del meristemo apical para generar 2 puntas principales
- Resultado: planta más baja, con más ramas laterales
- Cuando hacer: cuando hay 4-6 pares de nodos
- NO usar en autofloresentes (el estrés detiene el crecimiento valioso)
- Tiempo de recuperación: 3-7 días

### 9.3 FIM (F*ck I Missed)

- Corte incompleto del ápice (solo 75% del tejido meristemático)
- Resultado: 4-8 nuevas puntas (más que topping)
- Menos trauma que topping porque queda tejido meristemático activo
- Mismo timing que topping

### 9.4 SCROG (Screen of Green)

- Red horizontal (mallado) a 20-30cm de las luces
- Las ramas se tucan bajo la red y se distribuyen horizontalmente
- Objetivo: canopy uniforme con toda la superficie iluminada igualmente
- Combina bien con topping/FIM previo
- Mejor rendimiento por W de luz consumido

### 9.5 SOG (Sea of Green)

- Muchas plantas pequeñas (densidad alta) pasadas a floración rápidamente
- No se hace topping — cada planta tiene 1-2 puntas principales
- Más plantas por m² = ciclos más cortos
- Ideal para cultivo de clones

### 9.6 Defoliación

- Eliminar hojas grandes que bloquean luz a las yemas inferiores
- Momento: día 20-25 de vegetativo y/o días 21-28 de floración
- No derofoliar más del 30% en una sola sesión
- Controvertido — requiere experiencia para no sobre-estresar

### 9.7 Lollipopping

- Eliminar ramas y yemas inferiores que no recibirán buena luz
- Resultado: planta "paleta de caramelo" — toda la energía va a cogollos superiores
- Hacer en la primera semana de floración
- Mejora circulación de aire, reduce riesgo de botrytis en partes bajas`,
  },
  {
    id: 'mod_10',
    num: 10,
    title: "COSECHA, CURADO Y POST-PRODUCCIÓN",
    level: 'intermedio',
    category: "Cosecha",
    icon: "🌾",
    body: `### 10.1 Timing de Cosecha — Lectura de Tricomas

Con lupa 30-60x o microscopio digital (accesible, <$5000 ARS en ML):

| Estado de tricomas | Perfil esperado | Recomendado para |
|---|---|---|
| 100% transparentes | Sin madurez — bajo THC | No cosechar |
| 70-80% lechosos/opacos, 20-30% transparentes | THC máximo, terpenos máximos, CBN mínimo | Efecto cerebral, energético |
| 50% lechosos, 50% ámbar | THC reduciéndose, CBN aumentando | Efecto balanceado |
| 80-100% ámbar | Alto CBN, THC degradado | Efecto sedante, cuerpo |

### 10.2 Lavado de Raíces (Flushing)

- Fotodependientes: 7-14 días antes de cosecha
- Autofloresentes: 3-5 días (ciclo más corto)
- Agua pura con pH corregido, temperatura 22-24°C
- Volumen: 3-5x el volumen de la maceta
- Objetivos: vaciar reservas de nutrientes en el tejido vegetal → mejor sabor, menos "químico"
- En tierra orgánica con microbioma activo: menos necesario (microorganismos naturalmente reciclan)

### 10.3 Técnica de Cosecha

1. Cortar la planta completa o rama por rama
2. Defoliación inmediata de hojas sin tricomas (fan leaves)
3. Opción de defoliación húmeda (inmediata) o seca (después del secado)
4. Colgar plantas/ramas boca abajo en área oscura o con luz mínima

### 10.4 Secado

**Parámetros:**
- Temperatura: 18-22°C (más baja = secado más lento = mejor sabor)
- Humedad: 50-55% HR
- Sin luz directa (la luz degrada THCA y terpenos)
- Circulación de aire suave — sin viento directo sobre la planta
- Duración: 7-14 días según grosor del cogollo

**Cómo saber si están secos:**
- Tallo se quiebra al doblarse (no se dobla) — ready
- Cogollos firmes pero no crujientes al apretar
- Pérdida de peso de 70-80% (el agua era el componente principal)

### 10.5 Curado

**El proceso más ignorado y el más importante para calidad final.**

**Qué pasa biológicamente en el curado:**
- Continúa la conversión de clorofila en compuestos de degradación (la clorofila da sabor a "pasto" — el curado la elimina)
- Enzimas y bacterias aeróbicas continúan metabolizando azúcares residuales
- Los terpenos más pesados (sesquiterpenos) se vuelven más prominentes al evaporarse los ligeros
- El perfil aromático evoluciona y se complejiza

**Procedimiento:**
- Frascos de vidrio con tapa hermética (mason jars)
- Llenar 75% del frasco — no comprimir
- Primeras 2 semanas: abrir (burping) 2-3 veces por día, 15 minutos cada vez
- Semanas 2-4: burping 1 vez al día
- A partir de semana 4: 1 vez cada 2-3 días

**Control de HR en el frasco:**
- Boveda packs 62% HR — mantienen el ambiente ideal
- Si >70% HR: dejar el frasco abierto más tiempo (riesgo de hongos)
- Si <55% HR: puede curar demasiado rápido — perder terpenos volátiles

**Duración mínima:** 3-4 semanas
**Óptimo:** 6-8 semanas
**Genéticas con alto terpenos:** pueden mejorar hasta 6 meses`,
  },
  {
    id: 'mod_11',
    num: 11,
    title: "PLAGAS Y ENFERMEDADES",
    level: 'intermedio',
    category: "Sanidad",
    icon: "🐛",
    body: `### 11.1 Plagas Más Comunes en Interior

**Araña Roja (Tetranychus urticae)**
- Señal: puntitos amarillos en el haz de la hoja, telarañas finas en el envés
- Prolifera con: calor alto (+28°C) y baja humedad (<40% HR)
- Control: bajar temperatura, aumentar HR, aceite de neem, jabón potásico, predadores biológicos (Phytoseiulus persimilis)
- Prevención: mantener HR >45% y T <26°C

**Trips (Frankliniella occidentalis y otros)**
- Señal: rayaduras plateadas en hojas, pequeños insectos alargados (1-2mm)
- Daño: succionan contenido celular, transmiten virus
- Control: trampas pegajosas azules/amarillas, spinosad, azadiractina (neem), jabón potásico

**Fungus Gnats (Sciaridae) — Mosquito de la Tierra**
- Señal: mosquitos pequeños revoloteando en la tierra, larvas blancas en raíces
- Prolifera con: sobre-riego y sustrato húmedo permanente
- Control: dejar secar bien el sustrato entre riegos, arena en la superficie, Bacillus thuringiensis israelensis, trampas pegajosas amarillas

**Pulgones (Aphididae)**
- Señal: insectos verdes/negros/blancos en brotes nuevos
- Control: jabón potásico, neem, mariquitas (control biológico), Beauveria bassiana

### 11.2 Enfermedades Fúngicas

**Botrytis (Podredumbre Gris) — Botrytis cinerea**
- La pesadilla de la floración
- Señal: manchas grises/marrones en cogollos, moho gris visible
- Condiciones: humedad >60% HR en floración, poca circulación de aire, temperatura <20°C
- Prevención: HR <50% en floración, ventilación constante, lollipopping
- Sin cura eficaz — cortar y eliminar el tejido afectado inmediatamente
- Desinfectar tijeras con alcohol entre cortes

**Oídio (Powdery Mildew) — Erysiphaceae**
- Señal: polvo blanco harinoso sobre hojas
- Condiciones: alta HR + poca ventilación, cambios bruscos de temperatura
- Control: bicarbonato de sodio + agua (1g/L), peroxido de hidrogeno diluido, azufre, potassio silicato (también como preventivo)

**Pythium / Fusarium (Pudrición Radicular)**
- Señal: raíces marrones/cafés con olor, planta se marchita pese a sustrato húmedo
- Causa: sobre-riego, falta de drenaje, temperatura de sustrato alta
- Control: Trichoderma spp., Bacillus subtilis, Streptomyces spp., mejorar drenaje, reducir riego`,
  },
  {
    id: 'mod_12',
    num: 12,
    title: "TABLAS DE REFERENCIA RÁPIDA",
    level: 'novato',
    category: "Referencia",
    icon: "📋",
    body: `### 12.1 Tabla NPK por Fase

| Fase | N | P | K | EC (mS/cm) | pH (tierra) | pH (hidro) |
|---|---|---|---|---|---|---|
| Germinación | 0 | 0 | 0 | 0-0.4 | 6.0-6.5 | — |
| Plántula | Mínimo | Mínimo | Mínimo | 0.4-0.8 | 6.0-6.5 | 5.8-6.0 |
| Veg temprano | ↑↑↑ | ↑ | ↑↑ | 0.8-1.4 | 6.2-6.8 | 5.8-6.2 |
| Veg avanzado | ↑↑↑ | ↑↑ | ↑↑ | 1.2-1.8 | 6.2-6.8 | 5.8-6.2 |
| Pre-floración | ↑↑ | ↑↑ | ↑↑↑ | 1.4-2.0 | 6.0-6.8 | 5.8-6.2 |
| Floración pico | ↓ | ↑↑↑ | ↑↑↑ | 1.8-2.4 | 6.0-6.8 | 5.8-6.2 |
| Maduración | ↓↓ | ↑↑ | ↑↑ | 1.4-1.8 | 6.0-6.8 | 5.8-6.2 |
| Flushing | 0 | 0 | 0 | 0-0.4 | 6.0-6.5 | 5.8-6.2 |

### 12.2 Ciclo Completo Estimado

| Tipo de Planta | Germinación | Vegetativo | Floración | Total semilla→cosecha |
|---|---|---|---|---|
| Auto indoor | 3-7 días | 3-5 semanas | 5-7 semanas | 60-85 días |
| Foto indica indoor (ciclo corto) | 3-7 días | 4-6 semanas | 7-8 semanas | 90-110 días |
| Foto sativa indoor | 3-7 días | 6-10 semanas | 10-14 semanas | 120-180 días |
| Foto exterior BS.AS. | 3-7 días | Nov-Feb | Feb-Abril | Cosecha otoño (Marzo-Abril) |

### 12.3 Errores Más Comunes del Novato

1. **Sobre-riego** — el error #1. Levantar la maceta: si está liviana, regar. Si pesa, esperar.
2. **pH incorrecto** — el 80% de los problemas nutricionales son en realidad problemas de pH
3. **Sobre-fertilización** — menos es más, especialmente al inicio. Comenzar siempre al 50% de la dosis recomendada.
4. **Temperatura nocturna baja** — baja HR o alta HR → moho o estrés
5. **No medir EC ni pH** — sin estas dos mediciones, estás adivinando
6. **Cosechar muy temprano** — las últimas 2 semanas aportan 30-40% del peso final
7. **Saltarse el curado** — compra la fruta pero tira el vino. No vale la pena.
8. **No lavar semillas antes de germinar** — lavar 24h en agua aumenta la tasa de germinación
9. **Luz continua (24h) en floración** — destruye el reloj biológico de la planta
10. **Ignorar el VPD** — la mayoría de los problemas ambientales se resuelven con VPD correcto

### 12.4 Equipamiento Mínimo Recomendado para Interior

| Ítem | Función | Nivel |
|---|---|---|
| Medidor de pH digital | Control de pH — imprescindible | Novato |
| Medidor de EC/TDS | Control de nutrientes | Novato |
| Termohigrómetro digital | T° y HR | Novato |
| Lupa 30-60x o microscopio USB | Lectura de tricomas | Novato |
| Trampas pegajosas amarillas | Monitoreo de plagas | Novato |
| Medidor VPD (o app) | Ambiente avanzado | Intermedio |
| Luxómetro o medidor PAR/PPFD | Optimización lumínica | Intermedio |
| Termómetro de sustrato | Control de temperatura de raíz | Intermedio |
| CO₂ meter | Optimización de atmósfera | Avanzado |

---

## GLOSARIO TÉCNICO

- **CBGA**: Ácido cannabigerólico — precursor de todos los cannabinoides
- **THCA**: Ácido tetrahidrocannabinólico — forma de THC en la planta viva (no psicoactivo)
- **Decarboxilación**: Proceso de calor que activa THCA → THC
- **DLI**: Daily Light Integral — integral diaria de luz recibida en mol/m²/día
- **EC**: Electrical Conductivity — conductividad eléctrica de la solución nutritiva
- **Entourage Effect**: Efecto sinérgico entre cannabinoides y terpenos
- **Flush / Flushing / Lavado**: Regar solo con agua en las últimas semanas para eliminar sales
- **Fotoperíodo**: La relación horas luz/oscuridad que controla la floración
- **Internudo**: Segmento del tallo entre dos nodos
- **Micorrizas**: Hongos simbióticos que amplían la absorción radicular
- **PPFD**: Photosynthetic Photon Flux Density — densidad de flujo de fotones fotosintéticos (µmol/m²/s)
- **Stretch**: Elongación rápida de la planta al inicio de la floración
- **Trichoma**: Glándulas en la superficie de la flor donde se sintetizan cannabinoides y terpenos
- **VPD**: Vapor Pressure Deficit — déficit de presión de vapor (indicador de estrés hídrico óptimo)

---

*Base de datos compilada con fuentes: Frontiers in Plant Science (2024), ScienceDirect, Dutch Passion, Athena AG, GrowWithJane, mercado argentino de growshops (AstroGrow, 0800Grow, Gangagrow, Namaste Nutrientes, Kawsay)*

*Versión 1.0 — Base para desarrollo de app educativa cannabica*

# CANNABIS MASTER KNOWLEDGE BASE — MÓDULOS ADICIONAIS
### Módulo 13: Ciência e Descobertas (2000–2024) | Módulo 14: Guia de Cultivo de Automáticas
> Versão 1.1 — Complemento ao banco de dados principal`,
  },
  {
    id: 'mod_13',
    num: 13,
    title: "CIÊNCIA E DESCOBERTAS: 2000–2024",
    level: 'avanzado',
    category: "Ciencia",
    icon: "🔬",
    body: `> Uma linha do tempo das descobertas mais importantes que transformaram a compreensão da cannabis como planta medicinal, sistema biológico e matéria farmacêutica.

---

### 13.1 Contexto Histórico Necessário (Anos 1960–1999)

Para entender o que aconteceu a partir de 2000, é essencial situar as descobertas anteriores:

**1964 — Rafael Mechoulam (Universidade Hebraica de Jerusalém)**
O químico israelita isolou e elucidou a estrutura completa do THC (Δ9-tetrahidrocanabinol) e do CBD (cannabidiol). Essa foi a pedra fundadora de toda a ciência cannabinóide moderna. Mechoulam, conhecido como "o pai da pesquisa cannabinóide", faleceu em fevereiro de 2023.

**1988 — Descoberta do receptor CB1**
Pesquisadores da Universidade Médica de Saint Louis identificaram que o cérebro de ratos possuía receptores específicos ativados pelo THC. Quando administrado THC em ratos geneticamente modificados sem esse receptor, nenhum efeito foi observado — prova direta de que o THC age via receptor específico.

**1990 — Clonagem do CB1 (Lisa Matsuda, National Institute of Mental Health)**
A sequência de DNA do receptor CB1 foi mapeada e clonada, abrindo portas para toda a neurociência canabinóide.

**1992 — Descoberta da Anandamida (Hanus & Devane, Jerusalém)**
Dr. Lumir Hanus e Dr. William Devane descobriram a anandamida (N-araquidonoyletanolamina), o primeiro endocanabinóide identificado — o "THC natural do corpo". O nome vem do sânscrito "ananda" = bem-aventurança.

**1993 — Receptor CB2**
Um segundo receptor cannabinóide, o CB2, foi identificado — presente principalmente no sistema imunológico e sistema nervoso periférico, sem os efeitos psicoativos do CB1.

**1995 — 2-AG (2-araquidonoilglicerol)**
Um segundo endocanabinóide principal foi descoberto, de maior concentração no sistema nervoso do que a anandamida.

---

### 13.2 Descobertas e Marcos Científicos: 2000–2024

#### 2001 — Primeiras Aprovações Regulatórias de Cannabis Medicinal

O Canadá se tornou o primeiro país do mundo a criar um sistema federal regulamentado de cannabis medicinal (Marijuana Medical Access Regulations). Abriu um precedente histórico para o resto do mundo.

---

#### 2003 — Governo dos EUA Patenteia Cannabinóides como Neuroprotectores

O Departamento de Saúde dos EUA obteve a patente US6630507, reconhecendo cannabinóides como antioxidantes e neuroprotetores. Paradoxalmente, o governo federal americano mantinha a cannabis como Schedula I (sem uso médico) enquanto patentava seus compostos para uso terapêutico — uma contradição que gerou décadas de debate.

---

#### 2005 — Sativex Aprovado no Canadá

O Sativex (GW Pharmaceuticals, UK), um spray oromucoso com proporções iguais de THC e CBD, foi aprovado no Canadá como tratamento de segunda linha para espasticidade associada à Esclerose Múltipla (EM). Posteriormente aprovado em vários países europeus e Nova Zelândia para dor oncológica e dor neuropática da EM. Foi o primeiro medicamento derivado da planta de cannabis a receber aprovação regulatória formal.

---

#### 2006 — Mapeamento do Sistema Endocanabinóide Expandido

Pesquisas revelaram que o Sistema Endocanabinóide (SEC) é muito mais abrangente do que se imaginava. Além de CB1 e CB2, foram identificados receptores adicionais que respondem a endocanabinóides:
- GPR55: receptor "órfão" ativado por CBD e canabinóides ácidos
- TRPV1 (receptor de vanilóide tipo 1): ativado por anandamida e CBD — envolvido em dor e inflamação
- GPR18 e GPR119: receptores adicionais do "endocanabinoidome"

O conceito de "endocanabinoidome" surgiu para descrever a rede completa de receptores, ligantes endógenos e enzimas metabólicas — muito maior e mais complexa do que o SEC original.

---

#### 2007 — THC e Câncer: Primeiros Estudos Clínicos de Fase I

Um estudo clínico de Fase I (Guzman et al., publicado no British Journal of Cancer) avaliou a administração intratumoral de THC em pacientes com glioblastoma multiforme recorrente. Os resultados mostraram que o THC foi seguro e produziu redução mensurável da proliferação celular em algumas amostras tumorais. Foi o primeiro ensaio clínico em humanos avaliando propriedades antitumorais diretas de cannabinóides.

Observação importante: estudos pré-clínicos (in vitro e in vivo em modelos animais) vinham demonstrando efeitos antiproliferativos, pró-apoptóticos e antiangiogênicos de THC e CBD desde os anos 1990 em vários tipos de câncer (mama, cólon, pulmão, próstata). Os mecanismos envolvem ativação de CB1/CB2, ceramida e vias de sinalização celular como PI3K/Akt e MAPK.

---

#### 2010 — β-Cariofileno Reconhecido como Agonista CB2

Uma pesquisa publicada na PNAS (Gertsch et al.) demonstrou que o β-cariofileno, um sesquiterpeno presente em grande quantidade na cannabis (e também na pimenta-do-reino, cravo e outras especiarias), é um agonista seletivo do receptor CB2. Isso significava que um terpeno — não um cannabinóide — podia ativar diretamente receptores do sistema endocanabinóide, expandindo dramaticamente o conceito de "entourage effect".

**Implicação para o grower:** a produção de β-cariofileno passou a ter relevância terapêutica mensurável, não apenas aromática.

---

#### 2012 — Efeito Entourage: Confirmação Científica

Raphael Mechoulam e Shimon Ben-Shabat formalizaram o conceito de "Efeito Entourage" — a interação sinérgica entre cannabinóides, terpenos e flavonóides que modifica e amplifica os efeitos terapêuticos além do que cada composto produziria isoladamente. Isso explicava por que extratos de planta completa (full spectrum) apresentavam resultados clínicos diferentes de THC ou CBD puros isolados.

---

#### 2014–2018 — Caso Charlotte Figi e a Revolução do CBD

O caso de Charlotte Figi, uma menina com Síndrome de Dravet (epilepsia grave), tornou-se internacionalmente famoso. Charlotte, que chegava a ter 300 crises convulsivas por semana, experimentou uma drástica redução das crises com o uso de óleo de cannabis rico em CBD e baixo em THC. O caso gerou cobertura massiva nos EUA e funcionou como catalisador para pesquisas aceleradas sobre CBD em epilepsia pediátrica.

A cepa usada foi a "Charlotte's Web", desenvolvida especificamente para ela pelos irmãos Stanley no Colorado — tornando-se referência mundial em variedades high-CBD.

**Resultado científico:** Múltiplos ensaios clínicos randomizados controlados foram conduzidos com CBD (Epidiolex, GW Pharmaceuticals) em Síndrome de Dravet e Síndrome de Lennox-Gastaut, demonstrando eficácia e segurança em crianças.

---

#### 2018 — FDA Aprova Epidiolex (Primeiro Medicamento de CBD)

A FDA aprovou o Epidiolex (solução oral de CBD farmacêutico-grau, >99% CBD puro, <0.1% THC) para:
- Síndrome de Dravet
- Síndrome de Lennox-Gastaut

Posteriormente aprovado também para Complexo de Esclerose Tuberosa. Foi o primeiro medicamento derivado diretamente da planta Cannabis a receber aprovação formal da FDA americana, quebrando décadas de paralisia regulatória.

**Dado técnico:** O CBD no Epidiolex atua principalmente via canais TRP (TRPV1), receptores 5-HT1A (serotonina), GPR55 e modulação de correntes de Na⁺, não via CB1 — explicando a ausência de efeitos psicoativos e a eficácia anticonvulsivante.

---

#### 2019 — Genoma Completo de Cannabis Sativa Sequenciado

A sequência completa do genoma de Cannabis sativa foi publicada (Laverty et al., Science Advances, 2019), identificando os genes responsáveis pela síntese de THCA (THCAS) e CBDA (CBDAS), suas localizações cromossomais e mecanismos de regulação. Isso abriu o caminho para:
- Criação de variedades com perfis cannabinóides precisos via seleção genética assistida
- Compreensão de por que algumas plantas são predominantemente THCA e outras CBDA
- Desenvolvimento de biossíntese de cannabinóides em levedura e bactérias

---

#### 2020 — Cannabis e COVID-19: Pesquisa Emergente

Estudos pré-clínicos (Università di Torino e outros) exploraram propriedades anti-inflamatórias de CBD e outros cannabinóides em contextos de inflamação exacerbada, relevante para a "tempestade de citocinas" da COVID-19 grave. Embora sem evidência clínica consolidada, o tópico intensificou a pesquisa sobre cannabinóides em imunomodulação.

Paralelamente, pesquisadores da Universidade de Oregon (2022) identificaram que ácidos cannabinóides (CBDA e CBGA) podiam se ligar in vitro à proteína spike do SARS-CoV-2, potencialmente bloqueando a entrada celular — descoberta com repercussão na mídia científica, mas com evidência apenas pré-clínica até o momento.

---

#### 2021 — Cannabinóides Menores: A Nova Fronteira

A revisão de 2021 na Frontiers in Pharmacology ("Minor Cannabinoids: Biosynthesis, Molecular Pharmacology and Potential Therapeutic Uses") consolidou o conhecimento sobre cannabinóides além de THC e CBD:

**CBG (Canabigeral)**
- Precursor biossintético de todos os cannabinóides (via CBGA)
- Perfil farmacológico complexo: agonista parcial CB1 e CB2, agonista α-2 adrenérgico (efeito hipotensor), agonista TRPV1/V2, antagonista 5-HT1A, agonista PPARγ
- Modelos pré-clínicos: neuroproteção em Doença de Huntington, propriedades antibacterianas (incluindo MRSA resistente a meticilina), redução de pressão intraocular (glaucoma), atividade anti-inflamatória via JAK/STAT/NFκB
- 2024 — Primeiro ensaio clínico randomizado, duplo-cego, controlado por placebo em humanos (WSU): 20mg de CBG reduziu significativamente ansiedade subjetiva e melhorou memória verbal comparado ao placebo, sem efeitos intoxicantes

**CBN (Canabinol)**
- Produto de degradação oxidativa do THCA/THC
- Agonista fraco CB1 (mildemente psicoativo em doses altas)
- Amplamente associado a propriedades sedativas em produtos de bem-estar
- 2023 — Estudo duplo-cego controlado por placebo publicado no PubMed avaliando segurança e efeitos de CBN com e sem CBD na qualidade do sono
- 2024 — Estudo em ratos (Universidade de Sydney, Nature): CBN e seu metabólito ativo influenciam arquitetura do sono, com evidência de aumento de sono NREM

**THCV (Tetrahidrocanabivarina)**
- Estruturalmente similar ao THC, mas com cadeia lateral propil em vez de pentil
- Em doses baixas: antagonista CB1 (pode bloquear efeitos do THC)
- Em doses ≥100mg: efeitos agonistas CB1, leve psicoatividade
- Pesquisa em supressão de apetite e manejo de peso (contrário ao THC)
- Potencial em sensibilidade à insulina e diabetes tipo 2
- Presente predominantemente em variedades Sativa africanas (Durban Poison, etc.)

**CBDV (Cannabidivarina)**
- Análogo propil do CBD
- Ensaios clínicos em andamento para Transtorno do Espectro Autista (TEA) — estudo "CBDV vs Placebo em Crianças com TEA" em avaliação
- Baixa afinidade por CB1/CB2, mas agonista TRPV1, TRPV2, TRPV3, TRPV4 e TRPA1

**CBC (Cannabicromeno)**
- Terceiro cannabinóide mais abundante na planta madura
- Não intoxicante
- Pesquisa preliminar em propriedades antidepressivas, analgésicas e anti-inflamatórias
- In vitro: propriedades anti-melanoma e antitirosidase com potencial cosmecêutico

---

#### 2022–2023 — Biossíntese em Levedura e Fermentação

Pesquisadores da UC Berkeley (2019) e outros grupos demonstraram a síntese completa de THCA e CBDA em levedura (Saccharomyces cerevisiae) geneticamente modificada — produzindo cannabinóides sem a planta. Em 2022-2023, empresas de biotech avançaram para a síntese de cannabinóides raros (CBG, THCV, etc.) por fermentação industrial, com custos em queda exponencial. Isso tem implicações profundas para a indústria farmacêutica e de suplementos.

---

#### 2023 — Morte de Mechoulam e Legado

Rafael Mechoulam faleceu em fevereiro de 2023, aos 92 anos. Seu grupo de pesquisa deixou como legado final a descoberta dos "canabinóides mimetizadores" — moléculas como HU-580 (derivado de CBDA) com estabilidade metabólica superior ao CBD original, com potencial para novos medicamentos de próxima geração.

---

#### 2024 — Estado Atual da Pesquisa Clínica

**Dor Crônica:**
Ensaio "Improving Pain Disability with the Use of Oral Cannabinoids" — avalia THC e CBD oral para dor crônica. Achados preliminares: THC reduz significativamente dor e melhora sono. CBD auxilia na dor, mas em menor grau.

**Câncer:**
- Epidiolex em Fase I para câncer de próstata recorrente (800mg/dia): seguro e tolerável, sem toxicidades limitantes de dose
- Múltiplos ensaios avaliando combinações THC:CBD para náusea, dor e caquexia oncológica
- Estudo CAFCARS (randomizado, duplo-cego, cruzamento N-of-1): avaliando combinações High THC/Low CBD, Low THC/High CBD e THC:CBD iguais para controle de náusea, dor, ansiedade e distúrbio do sono em câncer

**PTSD (Transtorno de Estresse Pós-Traumático):**
O Canadá aprovou cannabis medicinal para PTSD. Múltiplos estudos observacionais e ensaios preliminares mostram THC reduzindo pesadelos e melhorando sono em veteranos com PTSD. Ensaios randomizados controlados estão em andamento.

**Esclerose Múltipla:**
Sativex (THC:CBD 1:1) aprovado em +25 países para espasticidade resistente a tratamento convencional.

**Regulação Imunológica:**
O conceito de "endocanabinoidome como alvo terapêutico" (Frontiers in Neuroscience, 2024) consolida que alterações e disfunções do SEC estão presentes em praticamente todas as categorias de doença — posicionando o sistema endocanabinóide como um dos alvos terapêuticos mais promissores da medicina do século XXI.

---

### 13.3 Medicamentos Canabinóides Aprovados por Agências Regulatórias

| Medicamento | Substância | Indicação aprovada | Agência | Ano |
|---|---|---|---|---|
| Marinol (Dronabinol) | THC sintético | Anti-emético (quimioterapia), anorexia em AIDS | FDA | 1985/1992 |
| Nabilona | Análogo sintético CB1/CB2 | Náusea por quimioterapia | FDA (Canadá 1981) | 1981/1985 |
| Sativex | THC:CBD 1:1 (extrato planta) | Espasticidade na EM, dor oncológica | Canadá/EMA (+25 países) | 2005 |
| Epidiolex | CBD puro (>99%) | Dravet, Lennox-Gastaut, Esclerose Tuberosa | FDA / EMA | 2018/2019 |

---

### 13.4 Dados Epidemiológicos Relevantes (2024)

- Mais de 40 países e 38 estados dos EUA legalizaram cannabis medicinal
- O mercado global de cannabis medicinal estava avaliado em dezenas de bilhões de dólares em 2023 com crescimento projetado contínuo
- Argentina: Lei 27.350 (2017) regulamenta pesquisa médica e científica com cannabis — marco local relevante
- A FDA tem atualmente centenas de ensaios clínicos ativos envolvendo cannabinóides em diversas condições`,
  },
  {
    id: 'mod_14',
    num: 14,
    title: "GUIA COMPLETO DE CULTIVO: VARIEDADES AUTOMÁTICAS",
    level: 'novato',
    category: "Automáticas",
    icon: "⚡",
    body: `---

### 14.1 O Que São as Automáticas e Por Que Existem

#### Origem Genética

Cannabis ruderalis é uma subespécie selvagem adaptada às regiões hostis da Rússia, Ásia Central, Europa Oriental e Mongólia — onde os verões são curtos e os invernos brutais. Para sobreviver nessas condições, a planta evoluiu para florescer com base na idade (tempo), não no fotoperíodo.

O nome "ruderalis" vem do latim "rudus" (entulho, terra degradada) — porque a planta cresce em solos marginais onde outras espécies não sobreviveriam.

**A genética autofloresente é um traço dominante.** Isso significa que ao cruzar ruderalis com indica ou sativa, as primeiras gerações (F1) tendem a expressar o florescimento automático com relativa facilidade, mantendo potência e perfil aromático das variedades fotodependentes parentais.

**Evolução do melhoramento:**
- **Anos 1980:** Sementes de ruderalis chegam a Amsterdã
- **2001 — Lowryder:** Primeira variedade autofloresente comercial estabilizada (criada pelo breeder The Joint Doctor). THC ~14%, tamanho 30-40cm, 60 dias semilla→cosecha. Revolucionária, mas com perfil sensorial limitado
- **2005-2015:** Cruzamentos com Indica/Sativa de alta qualidade. THC começa a superar 15-18%
- **2015-2024:** Terceira e quarta geração. Automáticas modernas atingem THC de 20-26%, terpenos complexos, rendimentos de 400-600g/m² indoor — comparáveis a fotodependentes

---

### 14.2 Vantagens e Desvantagens Reais

#### Vantagens

**Sem gestão de fotoperíodo**
Não precisa mudar a programação da luz para induzir floração. Pode manter 18h/6h ou 20h/4h durante todo o ciclo — simplifica enormemente.

**Velocidade**
Do germe à colheita: 60-90 dias (média 75 dias para a maioria das autos modernas). Uma foto indica típica leva 4-5 meses total.

**Múltiplos ciclos por ano**
Indoor: 4-6 colheitas anuais são viáveis. Outdoor no hemisfério sul: possível fazer 2-3 colheitas entre outubro e março (verão porteño).

**Tamanho compacto**
30-100cm na maioria das autos. Ideal para espaços pequenos, armários, grow tents de 60x60 ou 80x80cm.

**Resiliência**
A herança ruderalis confere maior tolerância a oscilações de temperatura, pragas e erros de manejo — importante para iniciantes.

**Discrição**
O tamanho reduzido e o ciclo curto facilitam cultivos discretos.

#### Desvantagens Reais (Sem Romantismo)

**Sem margem de erro na vegetativa**
Uma vez iniciado o florescimento automático, NÃO É POSSÍVEL pausar ou estender o vegetativo para corrigir erros. Uma auto estressada durante as primeiras 3 semanas chegará à colheita com produção comprometida — sem segunda chance.

**Rendimento inferior a fotodependentes premium**
Mesmo as melhores autos modernas raramente superam 400-500g/m² indoor com otimização. Fotos em ScrOG bem manejadas podem atingir 600-800g/m².

**Sem possibilidade de clonagem funcional**
Clonar uma automática é tecnicamente possível, mas o clone começa a florescer na mesma idade que a planta mãe — sem ganho vegetativo. Na prática, automáticas se cultivam sempre a partir de semente.

**Sementes mais caras por unidade**
O trabalho de melhoramento genético para estabilizar altas potências em ciclo curto eleva o custo das sementes de qualidade.

---

### 14.3 Como as Automáticas Diferem no Cultivo — Regras Específicas

#### REGRA #1: Nunca transplante

As automáticas NÃO toleram transplante. O sistema radicular sofre micro-danos que custam 5-7 dias de recuperação — tempo que a planta usaria para crescer vegetativamente. Como o vegetativo já é curto (3-4 semanas), esse atraso é proporcional gravíssimo.

**Solução:** Germinar DIRETO no vaso definitivo. Se usar copinho de papel para germinar, transplantar para o vaso final com < 3 dias de vida, antes que as raízes se estabeleçam.

#### REGRA #2: Maceta do tamanho certo desde o início

| Tamanho da planta esperado | Volume recomendado |
|---|---|
| Auto compacta (40-60cm) | 7-11 litros |
| Auto média (60-80cm) | 11-15 litros |
| Auto grande (80-100cm) | 15-20 litros |

Vaso pequeno = raízes limitadas = planta limitada. Não há como aumentar depois.

Vasos geotextil (fabric pots) são ideais para automáticas: aeração passiva das raízes (air pruning), evita encharcamento, estimula ramificação radicular.

#### REGRA #3: Substrato leve e arejado

Automáticas têm raízes proporcionalmente menos desenvolvidas que fotos do mesmo período. Precisam de substrato que não ofereça resistência:

**Mix recomendado para autos:**
- 50-60% substrato comercial leve (coco:perlita ou turba leve)
- 20-30% perlita (aeração crucial)
- 10-20% vermicomposto maduro (nutrição suave de longa duração)
- Opcional: 5-10% vermiculita (retenção hídrica)

**Evitar:** terra pesada de jardim, substrato compactado, vermicomposto jovem (excesso de N queima seedlings).

#### REGRA #4: Nutrição moderada, especialmente no início

As automáticas são proporcionalmente mais sensíveis a excesso de nutrientes, especialmente nas primeiras 3 semanas. O EC alto nessa fase causa estresse que compromete irreversivelmente o vegetativo.

**Protocolo inicial:**
- Semanas 1-2: zero fertilizante adicional (substrato com pré-carga é suficiente)
- Semana 3: introduzir 25-50% da dose recomendada do fertilizante de vegetativo
- Semana 4-5: 50-75% da dose conforme resposta da planta

#### REGRA #5: Nunca deixar o substrato secar completamente

As automáticas não têm tempo para se recuperar de estresse hídrico severo. Manter o substrato levemente úmido (nunca encharcado, mas nunca ressecado).

Técnica do dedo: enfiar o dedo 3-4cm no substrato — se saiu úmido, aguardar. Se saiu seco, regar.

#### REGRA #6: Técnicas de condução sim, mas sem estresse

**Permitido (baixo estresse / LST):**
- LST (Low Stress Training) com arames ou clips: dobrar gentilmente para achatar o dossel e expor pontos de crescimento à luz
- Iniciar LST quando a planta tem 4-5 nós (semana 2-3)

**Evitar (alto estresse):**
- Topping e FIM: em autos é um risco alto — a planta pode não ter tempo de recuperar
- Defoliação agressiva
- Qualquer técnica que provoque corte nos primeiros 30 dias

**Exceção:** Cultivadores experientes fazem topping em dias 18-20 (não antes e não depois) em variedades auto que têm vegetativo mais longo (50+ dias). Requer leitura precisa da genética específica.

---

### 14.4 Cronograma Detalhado de Um Ciclo de Auto Típico (75 dias)

\`\`\`
DIA 1-3: Germinação
- Semilla em copo com água 24h → papel úmido → terra
- Ou: diretamente no substrato, 1cm de profundidade, substrato bem úmido
- T: 24-26°C | HR: 70-85% | Luz: 18h (pode ser menos intensa)

DIA 4-10: Seedling
- Cotiledones abertos, primeiros folíolos verdadeiros aparecem
- Zero fertilizante
- T: 22-26°C | HR: 65-70% | Luz: 18h/6h | PPFD: 150-250 µmol

DIA 11-20: Vegetativo Rápido (Fase Crítica)
- Crescimento ativo, internódios se formam
- Semana 2: introduzir raizame / estimulador de raízes
- Semana 3: primeiro fertilizante vegetativo (25-30% da dose)
- T: 24-28°C | HR: 55-65% | Luz: 18h/6h | PPFD: 400-600 µmol
- Iniciar LST se desejar (dia 15-20)

DIA 21-28: Pré-floração / Transição
- Aparecem os primeiros pistilos brancos nos nódulos (confirmação fêmea)
- Trocar gradualmente para fertilizante de floração
- N descendo, P e K subindo
- Manter LST se necessário
- T: 24-26°C | HR: 50-55% | Luz: 18h/6h | PPFD: 600-800 µmol

DIA 29-45: Floração Ativa (Formação de Buds)
- Cogolhos se formam rapidamente
- Tricomas surgem nas brácteas
- Fertilizante de floração em doses progressivas (50% → 75% → 100%)
- Adicionar PK booster na semana 6 (dia 35-42)
- T: 22-25°C | HR: 45-50% | Luz: 18h/6h | PPFD: 700-900 µmol
- EC: 1.6-2.2 mS/cm

DIA 46-60: Engorde / Floração Pico
- Cogollos engordando, tricomas lechosos
- Reduzir N ao mínimo
- Manter P e K altos
- EC: 1.8-2.4 mS/cm
- T: 22-24°C | HR: 40-45% | PPFD: 800-1000 µmol

DIA 60-68: Maturação
- Tricomas 60-80% leitosos
- Pistílos laranja/marrons
- Iniciar flush (regar só com água pH'd)
- Reduzir temperatura noturna para 18°C para potencializar terpenos e coloração

DIA 68-75: Colheita
- Tricomas alvo: 70-80% leitosos + 10-20% âmbar (efeito equilibrado)
- 80-100% âmbar: efeito mais sedante/corpo
- Cortar, defoliar, pendurar para secar
\`\`\`

---

### 14.5 Iluminação para Automáticas: O Debate 18/6 vs 20/4 vs 24/0

| Programação | Prós | Contras |
|---|---|---|
| 24h (luz contínua) | Máximo DLI, crescimento mais rápido | Sem descanso da planta, consumo elétrico máximo, alguns cultivares mostram estresse |
| 20h/4h | Excelente DLI, leve período de descanso | Pequena economia de energia |
| 18h/6h | Boa DLI, economia de energia (~10%), mais natural | Ligeiramente menor produção total |

**Recomendação prática:** 18h/6h para iniciantes (mais econômico e suficiente), 20h/4h para growers buscando maximizar. A diferença real de produção entre 18h e 20h raramente ultrapassa 10-15%.

**Espectro de luz para autos:**
- Vegetativo: maior componente azul (4000-6000K em LEDs)
- Floração: espectro completo com ênfase em vermelho (3000K + componente azul)
- Opção prática: LED Full Spectrum fixo em 3500-4000K durante todo o ciclo funciona bem para autos

---

### 14.6 Gestão de Nutrição Específica para Automáticas

#### Diferenças Chave vs Fotodependentes

1. **Consumo total de nutrientes menor** — o ciclo mais curto significa menos semanas de acumulação
2. **Transição vegetativo → floração muito rápida** — a mudança de fertilizante deve ser feita mais gradualmente e antecipada
3. **Maior sensibilidade ao EC alto** — começar sempre abaixo da dose recomendada
4. **Flush mais curto** — 3-5 dias são suficientes (vs 7-14 dias nas fotos)

#### Tabela de Alimentação Semanal (Guia Prático)

| Semana | Fase | N | P | K | EC alvo | Observação |
|---|---|---|---|---|---|---|
| 1 | Seedling | 0 | 0 | 0 | 0.2-0.4 | Só substrato |
| 2 | Veg inicial | Mínimo | Mínimo | Mínimo | 0.4-0.8 | 25% dose |
| 3 | Veg ativo | ↑↑ | ↑ | ↑ | 0.8-1.2 | 50% dose veg |
| 4 | Pré-flora | ↑ | ↑↑ | ↑↑ | 1.0-1.4 | Transição |
| 5 | Flora inicial | ↓ | ↑↑ | ↑↑↑ | 1.4-1.8 | 75% dose bloom |
| 6 | Flora pico | ↓↓ | ↑↑↑ | ↑↑↑ | 1.8-2.2 | 100% + PK booster |
| 7 | Flora pico | ↓↓ | ↑↑↑ | ↑↑↑ | 1.8-2.2 | Manter |
| 8 | Maturação | ↓↓↓ | ↑↑ | ↑↑ | 1.4-1.8 | Reduzir gradual |
| 9-10 | Flush | 0 | 0 | 0 | 0-0.4 | Só água pH'd |

---

### 14.7 VPD para Automáticas — Tabela de Referência

As automáticas se beneficiam dos mesmos parâmetros de VPD que as fotodependentes, mas como o ciclo é mais curto, é essencial não perder tempo com ambiente fora da faixa ideal.

| Fase (dias aprox.) | T° folha recomendada | HR recomendada | VPD objetivo |
|---|---|---|---|
| Seedling (1-10) | 22-24°C | 70-80% | 0.4-0.6 kPa |
| Vegetativo (11-25) | 24-26°C | 55-65% | 0.8-1.1 kPa |
| Floração (26-60) | 23-25°C | 45-50% | 1.1-1.5 kPa |
| Maturação (60-75) | 20-24°C | 40-45% | 1.4-1.8 kPa |

---

### 14.8 Variedades Automáticas de Referência (2024-2026)

Seleção de genéticas reconhecidas por banco de sementes com comprovado desempenho indoor:

| Variedade | Banco | THC | Dias | Altura | Rendimento indoor | Perfil |
|---|---|---|---|---|---|---|
| Royal Dwarf Auto | Royal Queen Seeds | ~13% | 56-70 | 40-70cm | 200-300g/m² | Skunk, terroso, relaxante |
| Amnesia Haze Auto | RQS | ~15% | 70-84 | 50-100cm | 400g/m² | Cítrico, energético |
| HulkBerry Auto | RQS | ~21% | 70-84 | 60-100cm | 400-450g/m² | Diesel, eufórico |
| GG Auto (Gorilla Glue) | ILGM | >22% | 70-80 | 70-100cm | 450-500g/m² | Resina extrema, terroso |
| Northern Lights Auto | ILGM | ~18% | 56-70 | 60-100cm | 350-400g/m² | Terroso, sedante |
| Haze Berry Auto | RQS | ~13% | 70-77 | 80-130cm | 350-400g/m² | Frutal/baga, energético |
| Z OG Auto | Blimburn | ~20% | 63-70 | 60-90cm | 400-450g/m² | Doce, gasoso, eufórico |
| Quick One Auto | RQS | ~13% | 56-63 | 40-60cm | 150-200g/m² | O mais rápido do mercado |

**Notas sobre seleção:**
- Para iniciantes: Northern Lights Auto, Royal Dwarf, Quick One — forgiving, sem exigências extremas
- Para produção: GG Auto, HulkBerry Auto — alto THC + bom rendimento
- Para efeito equilibrado/terapêutico: buscar variedades com THC 15-18% + CBD >1% ou high-CBD autos específicas
- Variedades >80 dias total tendem a ter melhor rendimento mas pedem mais experiência

---

### 14.9 Setup Completo Recomendado para Automáticas Indoor (Iniciante)

#### Espaço Mínimo Funcional

**Grow Tent 60x60x140cm** para 2-3 automáticas simultâneas:
- LED Full Spectrum 100-150W real (equivalente HPS 250-300W)
- Extractor + filtro de carvão ativado: 200-250 m³/h
- Ventilador oscilante interno pequeno
- Termohigrômetro digital
- Medidores de pH e EC

**Grow Tent 80x80x160cm** para 3-4 automáticas:
- LED Full Spectrum 150-200W real
- Extractor + filtro: 300-400 m³/h
- Mesmos acessórios

**Grow Tent 1.2x1.2x2m** para 4-6 automáticas de alto rendimento:
- LED Full Spectrum 300-400W real (2 painéis de 200W ou 1 painel grande)
- Extractor + filtro: 400-500 m³/h
- Dois ventiladores internos
- Setup de ScroG opcional para maximizar rendimento

---

### 14.10 Checklist de Cada Semana do Cultivo

**Toda semana, checar na ordem:**
1. pH da solução de rega (ANTES de regar) — corrigir se necessário
2. EC da solução de rega — ajustar conforme fase
3. Temperatura do cuarto: dia e noite — registrar
4. HR: dia e noite — ajustar conforme fase
5. Estado das folhas: cor, textura, posição — buscar sinais precoces de deficiência
6. Estado do substrato: úmido ou pronto para regar
7. Altura e estrutura: ajustar LST se necessário
8. Tricomas (a partir da semana 6-7 com lupa): monitorar maturação

**Registrar tudo:** data, dose, pH, EC, temperatura, HR, observações. Essa documentação é o que diferencia um cultivador que melhora de um que repete os mesmos erros.

---

### 14.11 Os 10 Erros Mais Comuns no Cultivo de Automáticas

1. **Transplantar a mudinha após ela ter se estabelecido** — a raiz fica traumatizada por 5-7 dias irrecuperáveis
2. **Vaso muito pequeno** — a planta espreme as raízes e nanifica sem atingir o potencial
3. **Substrato pesado ou compactado** — raízes de auto não penetram terra densa
4. **Over-feed na semana 1-3** — as seedlings não precisam de fertilizante — o substrato é suficiente e excesso causa queimadura
5. **Over-watering** — o erro #1 de todo iniciante, ainda mais danoso em autos pelo tempo restrito
6. **Ignorar o pH** — 80% dos problemas visuais em automáticas são lockout por pH errado
7. **Fazer topping sem experiência** — estresse desnecessário que pode custar semanas de recuperação
8. **Começar o flush tarde** — autos têm ciclo curto, o flush precisa acontecer nos últimos 3-5 dias, não 2 semanas antes
9. **Colheita prematura** — ainda mais comum em autos porque o grower fica ansioso com o ciclo curto. Esperar os tricomas leitosos
10. **Temperatura noturna muito baixa** — faixas abaixo de 17°C durante floração prejudicam síntese de canabinóides e terpenos

---

*Módulos 13 e 14 — Complemento ao Cannabis Master Knowledge Base v1.0*
*Fontes: PMC/NIH, Frontiers in Plant Science, ScienceDirect, Royal Queen Seeds, ILGM, Blimburn Seeds, Amsterdam Genetics, Cannabis Training University*`,
  }
];

const CURSO_STORAGE_KEY = 'curso-progress';
const LEVEL_LABELS = { novato: 'Novato', intermedio: 'Intermedio', avanzado: 'Avanzado' };
const LEVEL_COLORS = { novato: '#E8674A', intermedio: '#E0A05E', avanzado: '#C2453A' };

async function loadProgress() {
  try {
    const res = await window.storage.get(CURSO_STORAGE_KEY, false);
    if (res && res.value) return JSON.parse(res.value);
    return {};
  } catch (e) {
    return {};
  }
}
async function saveProgress(progress) {
  try {
    const result = await window.storage.set(CURSO_STORAGE_KEY, JSON.stringify(progress), false);
    return !!result;
  } catch (e) {
    console.error('Error guardando progreso', e);
    return false;
  }
}

// ---------- Minimal markdown renderer ----------
// Supports: ### headers, **bold**, tables, lists, plain paragraphs
function renderMarkdown(text) {
  const lines = text.split('\n');
  const blocks = [];
  let i = 0;

  const renderInline = (str) => {
    const parts = str.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} style={{ color: '#F5EBE0', fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') { i++; continue; }

    // Separador de sección suelto (---) que sobró del markdown original — se ignora visualmente
    if (/^-{3,}$/.test(line.trim())) { i++; continue; }

    // Headers
    const headerMatch = line.match(/^(#{2,4})\s+(.+)$/);
    if (headerMatch) {
      const level = headerMatch[1].length;
      const content = headerMatch[2];
      const Tag = level === 2 ? 'h2' : level === 3 ? 'h3' : 'h4';
      const sizes = { 2: 20, 3: 17, 4: 15 };
      const colors = { 2: '#E8674A', 3: '#E0A05E', 4: '#D9C4B5' };
      blocks.push(
        <Tag key={i} style={{
          fontSize: sizes[level], fontWeight: 800, color: colors[level],
          marginTop: level === 2 ? 30 : 22, marginBottom: 10, letterSpacing: '-0.01em',
        }}>
          {content}
        </Tag>
      );
      i++;
      continue;
    }

    // Table
    if (line.trim().startsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines
        .filter(l => !/^\|[\s\-:|]+\|$/.test(l.trim()))
        .map(l => l.trim().slice(1, -1).split('|').map(c => c.trim()));
      const [header, ...body] = rows;
      blocks.push(
        <div key={i} style={{ overflowX: 'auto', margin: '14px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
            <thead>
              <tr>
                {header.map((h, hi) => (
                  <th key={hi} style={{
                    textAlign: 'left', padding: '8px 10px', borderBottom: '2px solid #4A3528',
                    color: '#E8674A', fontWeight: 700, fontSize: 11.5, whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri} style={{ background: ri % 2 === 0 ? 'transparent' : '#241813' }}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{ padding: '8px 10px', borderBottom: '1px solid #2A1D17', color: '#D9C4B5' }}>
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // List
    if (/^[-•]\s+/.test(line.trim())) {
      const items = [];
      while (i < lines.length && /^[-•]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-•]\s+/, ''));
        i++;
      }
      blocks.push(
        <ul key={i} style={{ margin: '10px 0', paddingLeft: 20 }}>
          {items.map((item, ii) => (
            <li key={ii} style={{ fontSize: 14, color: '#D9C4B5', lineHeight: 1.7, marginBottom: 4 }}>
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Numbered list
    if (/^\d+\.\s+/.test(line.trim())) {
      const items = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      blocks.push(
        <ol key={i} style={{ margin: '10px 0', paddingLeft: 20 }}>
          {items.map((item, ii) => (
            <li key={ii} style={{ fontSize: 14, color: '#D9C4B5', lineHeight: 1.7, marginBottom: 4 }}>
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Code block (skip fences, treat content as preformatted)
    if (line.trim().startsWith('```')) {
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++;
      blocks.push(
        <pre key={i} className="mono" style={{
          background: '#181009', border: '1px solid #4A3528', borderRadius: 8,
          padding: '14px 16px', overflowX: 'auto', fontSize: 12, color: '#E8674A',
          lineHeight: 1.6, margin: '12px 0',
        }}>
          {codeLines.join('\n')}
        </pre>
      );
      continue;
    }

    // Blockquote / emphasis line (starts with >)
    if (line.trim().startsWith('>')) {
      blocks.push(
        <div key={i} style={{
          borderLeft: '3px solid #E8674A', paddingLeft: 14, margin: '14px 0',
          fontSize: 13.5, color: '#C2A896', fontStyle: 'italic',
        }}>
          {renderInline(line.trim().replace(/^>\s*/, ''))}
        </div>
      );
      i++;
      continue;
    }

    // Plain paragraph
    blocks.push(
      <p key={i} style={{ fontSize: 14, color: '#D9C4B5', lineHeight: 1.75, margin: '0 0 12px' }}>
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return blocks;
}


function CursoModule() {
  const [progress, setProgress] = useState(null);
  const [view, setView] = useState({ screen: 'cover' });
  const [levelFilter, setLevelFilter] = useState(null);

  useEffect(() => {
    loadProgress().then(setProgress);
  }, []);

  const markComplete = useCallback((moduleId, complete) => {
    setProgress(prev => {
      const next = { ...prev, [moduleId]: complete };
      saveProgress(next);
      return next;
    });
  }, []);

  if (progress === null) {
    return (
      <div style={{ minHeight: '100vh', background: '#1E1410', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CursoGlobalStyle />
        <div className="mono" style={{ color: '#9C8070', fontSize: 13 }}>Cargando curso…</div>
      </div>
    );
  }

  const completedCount = Object.values(progress).filter(Boolean).length;

  return (
    <div style={{ minHeight: '100vh', background: '#1E1410', color: '#F5EBE0', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <CursoGlobalStyle />
      {view.screen === 'cover' && (
        <CursoCoverScreen
          progress={progress}
          completedCount={completedCount}
          levelFilter={levelFilter}
          setLevelFilter={setLevelFilter}
          onOpenModule={(id) => setView({ screen: 'reader', moduleId: id })}
        />
      )}
      {view.screen === 'reader' && (
        <ReaderScreen
          moduleId={view.moduleId}
          progress={progress}
          onMarkComplete={markComplete}
          onBack={() => setView({ screen: 'cover' })}
          onNavigate={(id) => setView({ screen: 'reader', moduleId: id })}
        />
      )}
    </div>
  );
}

function CursoGlobalStyle() {
  return (
    <style>{`
      * { box-sizing: border-box; }
      .mono { font-family: 'JetBrains Mono', monospace; }
      .serif { font-family: 'Fraunces', Georgia, serif; }
      .serif-italic { font-family: 'Fraunces', Georgia, serif; font-style: italic; }
      ::selection { background: #E8674A; color: #1E1410; }
      button { font-family: inherit; }
      .module-card { transition: transform 0.15s, border-color 0.15s; cursor: pointer; }
      .module-card:hover { transform: translateY(-2px); border-color: #E8674A !important; }
      .chip { transition: all 0.15s; cursor: pointer; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      .fade-in { animation: fadeIn 0.2s ease; }
    `}</style>
  );
}

// ================= COVER SCREEN =================
function CursoCoverScreen({ progress, completedCount, levelFilter, setLevelFilter, onOpenModule }) {
  const total = MODULES.length;
  const pct = Math.round((completedCount / total) * 100);

  const filteredModules = levelFilter
    ? MODULES.filter(m => m.level === levelFilter)
    : MODULES;

  return (
    <div>
      <header style={{
        borderBottom: '1px solid #4A3528', padding: '32px 24px 26px',
        background: 'linear-gradient(180deg, #241813 0%, #1E1410 100%)',
      }}>
        <div style={{ maxWidth: 880, margin: '0 auto' }}>
          <div style={{ width: 28, height: 2, background: 'linear-gradient(90deg, #E0A05E, #E8674A)', marginBottom: 10, borderRadius: 1 }} />
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: '#E0A05E', marginBottom: 8, textTransform: 'uppercase' }}>
            Cannabis Master · Curso
          </div>
          <h1 className="serif" style={{ margin: 0, fontSize: 32, fontWeight: 600, letterSpacing: '-0.01em' }}>
            Del Novato al Master Grower
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: '#C2A896', maxWidth: 540 }}>
            14 módulos completos: botánica, bioquímica, nutrición, ciencia clínica y guía de automáticas.
          </p>

          {/* PROGRESS BAR */}
          <div style={{ marginTop: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span className="mono" style={{ fontSize: 11, color: '#9C8070', letterSpacing: '0.03em' }}>
                PROGRESO DEL CURSO
              </span>
              <span className="mono" style={{ fontSize: 12, color: '#E8674A', fontWeight: 700 }}>
                {completedCount} / {total} módulos
              </span>
            </div>
            <div style={{ height: 8, background: '#2A1D17', borderRadius: 4, overflow: 'hidden', border: '1px solid #4A3528' }}>
              <div style={{
                width: `${pct}%`, height: '100%',
                background: 'linear-gradient(90deg, #E8674A 0%, #E0A05E 100%)',
                transition: 'width 0.3s ease',
              }} />
            </div>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 880, margin: '0 auto', padding: '24px 24px 80px' }}>

        {/* LEVEL FILTER */}
        <div style={{ display: 'flex', gap: 7, marginBottom: 22, flexWrap: 'wrap' }}>
          <button
            className="chip"
            onClick={() => setLevelFilter(null)}
            style={{
              ...cursoChipStyle,
              background: levelFilter === null ? '#E8674A26' : '#2A1D17',
              border: levelFilter === null ? '1px solid #E8674A' : '1px solid #4A3528',
              color: levelFilter === null ? '#E8674A' : '#C2A896',
            }}
          >
            Todos
          </button>
          {Object.entries(LEVEL_LABELS).map(([key, label]) => (
            <button
              key={key}
              className="chip"
              onClick={() => setLevelFilter(levelFilter === key ? null : key)}
              style={{
                ...cursoChipStyle,
                background: levelFilter === key ? LEVEL_COLORS[key] + '26' : '#2A1D17',
                border: levelFilter === key ? `1px solid ${LEVEL_COLORS[key]}` : '1px solid #4A3528',
                color: levelFilter === key ? LEVEL_COLORS[key] : '#C2A896',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* MODULE GRID */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filteredModules.map(mod => {
            const isComplete = !!progress[mod.id];
            return (
              <button
                key={mod.id}
                className="module-card"
                onClick={() => onOpenModule(mod.id)}
                style={{
                  background: '#2A1D17', border: '1px solid #4A3528', borderRadius: 10,
                  padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14,
                  textAlign: 'left', color: '#F5EBE0',
                }}
              >
                <div style={{ fontSize: 26, flexShrink: 0 }}>{mod.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span className="mono" style={{ fontSize: 11, color: '#7A6155', fontWeight: 700 }}>
                      MÓDULO {mod.num}
                    </span>
                    <span className="mono" style={{
                      fontSize: 9.5, color: LEVEL_COLORS[mod.level], background: LEVEL_COLORS[mod.level] + '15',
                      border: `1px solid ${LEVEL_COLORS[mod.level]}44`, borderRadius: 20, padding: '1px 8px',
                    }}>
                      {LEVEL_LABELS[mod.level]}
                    </span>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginTop: 3 }}>{mod.title}</div>
                  <div className="mono" style={{ fontSize: 10.5, color: '#9C8070', marginTop: 2 }}>{mod.category}</div>
                </div>
                <div style={{
                  width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                  border: isComplete ? 'none' : '1px solid #7A6155',
                  background: isComplete ? '#E8674A' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, color: '#1E1410', fontWeight: 900,
                }}>
                  {isComplete && '✓'}
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}

// ================= READER SCREEN =================
function ReaderScreen({ moduleId, progress, onMarkComplete, onBack, onNavigate }) {
  const moduleIndex = MODULES.findIndex(m => m.id === moduleId);
  const mod = MODULES[moduleIndex];
  const prevModule = moduleIndex > 0 ? MODULES[moduleIndex - 1] : null;
  const nextModule = moduleIndex >= 0 && moduleIndex < MODULES.length - 1 ? MODULES[moduleIndex + 1] : null;
  const isComplete = !!progress[moduleId];

  // scroll to top on module change — usa el contenedor de scroll real del shell unificado,
  // ya que window.scrollTo no afecta el overflow interno del área de contenido con tab bar
  useEffect(() => {
    const container = document.getElementById('app-content-scroll');
    if (container) container.scrollTo(0, 0);
    else window.scrollTo?.(0, 0);
  }, [moduleId]);

  const renderedBody = useMemo(() => mod ? renderMarkdown(mod.body) : null, [mod]);

  if (!mod) return null;

  return (
    <div>
      <header style={{
        borderBottom: '1px solid #4A3528', padding: '20px 24px',
        background: 'linear-gradient(180deg, #241813 0%, #1E1410 100%)',
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <div style={{ maxWidth: 760, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={onBack} style={cursoBackLinkStyle}>← Curso</button>
          <span className="mono" style={{ fontSize: 11, color: '#9C8070' }}>
            {moduleIndex + 1} / {MODULES.length}
          </span>
        </div>
      </header>

      <main style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px 100px' }} className="fade-in">

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
          <span className="mono" style={{ fontSize: 11, color: '#7A6155', fontWeight: 700 }}>MÓDULO {mod.num}</span>
          <span className="mono" style={{
            fontSize: 10, color: LEVEL_COLORS[mod.level], background: LEVEL_COLORS[mod.level] + '15',
            border: `1px solid ${LEVEL_COLORS[mod.level]}44`, borderRadius: 20, padding: '2px 9px',
          }}>
            {LEVEL_LABELS[mod.level]}
          </span>
          <span className="mono" style={{ fontSize: 10.5, color: '#9C8070' }}>{mod.category}</span>
        </div>

        <h1 className="serif" style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em', margin: '0 0 28px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 30 }}>{mod.icon}</span> {mod.title}
        </h1>

        <article>
          {renderedBody}
        </article>

        {/* MARK COMPLETE */}
        <div style={{ marginTop: 36, paddingTop: 24, borderTop: '1px solid #4A3528' }}>
          <button
            onClick={() => onMarkComplete(moduleId, !isComplete)}
            style={{
              width: '100%', padding: '14px 18px', borderRadius: 10, cursor: 'pointer',
              background: isComplete ? 'transparent' : '#E8674A',
              border: isComplete ? '1px solid #E8674A' : 'none',
              color: isComplete ? '#E8674A' : '#1E1410',
              fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            {isComplete ? '✓ Módulo completado' : 'Marcar como completado'}
          </button>
        </div>

        {/* NAVIGATION */}
        <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
          <button
            disabled={!prevModule}
            onClick={() => prevModule && onNavigate(prevModule.id)}
            style={{
              flex: 1, padding: '14px 16px', borderRadius: 10, textAlign: 'left',
              background: 'transparent', border: '1px solid #4A3528',
              color: prevModule ? '#C2A896' : '#4A3528', cursor: prevModule ? 'pointer' : 'default',
              opacity: prevModule ? 1 : 0.4,
            }}
          >
            <div className="mono" style={{ fontSize: 10, marginBottom: 3 }}>← ANTERIOR</div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: '#F5EBE0' }}>
              {prevModule ? prevModule.title : '—'}
            </div>
          </button>
          <button
            disabled={!nextModule}
            onClick={() => nextModule && onNavigate(nextModule.id)}
            style={{
              flex: 1, padding: '14px 16px', borderRadius: 10, textAlign: 'right',
              background: 'transparent', border: '1px solid #4A3528',
              color: nextModule ? '#C2A896' : '#4A3528', cursor: nextModule ? 'pointer' : 'default',
              opacity: nextModule ? 1 : 0.4,
            }}
          >
            <div className="mono" style={{ fontSize: 10, marginBottom: 3 }}>SIGUIENTE →</div>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: '#F5EBE0' }}>
              {nextModule ? nextModule.title : '—'}
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}

const cursoBackLinkStyle = {
  background: 'none', border: 'none', color: '#E8674A', fontSize: 13, cursor: 'pointer',
  padding: 0, fontFamily: 'inherit', fontWeight: 600,
};

const cursoChipStyle = {
  padding: '6px 13px', borderRadius: 20, fontSize: 12.5, fontWeight: 600,
};

const CANNABINOIDS = {
  cb_cbga: { name: 'CBGA', fullName: 'Ácido Cannabigerólico', status: 'biosynthesis_confirmed', notes: "El 'mother cannabinoid' — precursor de THCA, CBDA y CBCA" },
  cb_thca: { name: 'THCA', fullName: 'Ácido Tetrahidrocannabinólico', status: 'well_established', notes: 'No psicoactivo en su forma ácida. Decarboxila a THC con calor.' },
  cb_thc: { name: 'THC', fullName: 'Δ9-Tetrahidrocannabinol', status: 'approved_drug', receptors: ['CB1'], notes: 'Identificado y elucidado por Mechoulam en 1964. Psicoactivo principal de la planta.', meds: ['Marinol (dronabinol)', 'Sativex (combinado con CBD)'] },
  cb_cbda: { name: 'CBDA', fullName: 'Ácido Cannabidiólico', status: 'well_established', notes: 'Precursor del CBD' },
  cb_cbd: { name: 'CBD', fullName: 'Cannabidiol', status: 'approved_drug', receptors: ['TRPV1', '5-HT1A', 'GPR55'], notes: 'No psicoactivo. Modulador, no agonista directo de CB1/CB2.', meds: ['Epidiolex (FDA 2018, EMA 2019)'] },
  cb_cbg: { name: 'CBG', fullName: 'Cannabigerol', status: 'clinical_phase_early', receptors: ['CB1 (parcial)', 'CB2 (parcial)', 'α2-adrenérgico', 'TRPV1', 'TRPV2', '5-HT1A (antagonista)', 'PPARγ'], notes: '2024: primer ensayo clínico randomizado controlado en humanos (WSU) — 20mg redujo ansiedad y mejoró memoria verbal sin efectos intoxicantes.', preclinical: ['neuroprotección en Huntington', 'antibacteriano contra MRSA', 'reduce presión intraocular', 'anti-inflamatorio vía JAK/STAT/NFkB'] },
  cb_cbn: { name: 'CBN', fullName: 'Cannabinol', status: 'clinical_phase_early', receptors: ['CB1 (débil)'], notes: 'Aumenta con la edad/oxidación del material vegetal. Asociado a efecto sedante.', preclinical: ['2024 estudio en ratas (U. Sydney): influye en arquitectura del sueño, aumenta sueño NREM'] },
  cb_thcv: { name: 'THCV', fullName: 'Tetrahidrocannabivarina', status: 'preclinical', receptors: ['CB1 (antagonista dosis bajas, agonista >100mg)'], notes: 'NO es categóricamente no-psicoactivo — produce efectos tipo THC en dosis altas.', preclinical: ['supresión de apetito', 'sensibilidad a la insulina', 'manejo de peso'] },
  cb_cbc: { name: 'CBC', fullName: 'Cannabicromeno', status: 'preclinical', notes: 'Tercer cannabinoide más abundante en planta madura. No intoxicante.', preclinical: ['mood-enhancing', 'anti-inflamatorio', 'anti-melanoma in vitro', 'anti-tirosinasa'] },
  cb_cbdv: { name: 'CBDV', fullName: 'Cannabidivarina', status: 'clinical_trial_ongoing', receptors: ['TRPV1', 'TRPV2', 'TRPV3', 'TRPV4', 'TRPA1'], notes: 'Ensayo clínico en curso: CBDV vs Placebo en niños con Trastorno del Espectro Autista (TEA).' },
};

const STATUS_LABELS = {
  biosynthesis_confirmed: { label: 'Biosíntesis confirmada', color: '#9C8070' },
  well_established: { label: 'Bien establecido', color: '#9C8070' },
  approved_drug: { label: 'Medicamento aprobado', color: '#E8674A' },
  clinical_phase_early: { label: 'Fase clínica temprana', color: '#E0A05E' },
  preclinical: { label: 'Preclínico', color: '#5B9BD5' },
  clinical_trial_ongoing: { label: 'Ensayo en curso', color: '#E0A05E' },
};

const MILESTONES = [
  { id: 'ms_1964', year: 1964, title: 'Elucidación de THC y CBD', description: 'Rafael Mechoulam aísla y elucida la estructura completa de THC y CBD en la Universidad Hebrea de Jerusalén.', cannabinoidId: null },
  { id: 'ms_1988', year: 1988, title: 'Descubrimiento del receptor CB1', description: 'Universidad Médica de Saint Louis identifica receptores cerebrales activados por THC en ratas.', cannabinoidId: 'cb_thc' },
  { id: 'ms_1990', year: 1990, title: 'Clonación del receptor CB1', description: 'Lisa Matsuda (NIMH) mapea y clona la secuencia de ADN del receptor CB1.', cannabinoidId: 'cb_thc' },
  { id: 'ms_1992', year: 1992, title: 'Descubrimiento de la Anandamida', description: 'Hanus y Devane descubren el primer endocannabinoide en la Universidad Hebrea de Jerusalén.', cannabinoidId: null },
  { id: 'ms_1993', year: 1993, title: 'Descubrimiento del receptor CB2', description: 'Identificado en sistema inmunológico y nervioso periférico, sin efectos psicoactivos.', cannabinoidId: null },
  { id: 'ms_1995', year: 1995, title: 'Descubrimiento del 2-AG', description: 'Segundo endocannabinoide principal identificado.', cannabinoidId: null },
  { id: 'ms_2001', year: 2001, title: 'Canadá regula cannabis medicinal', description: 'Primer sistema federal regulado del mundo (Marijuana Medical Access Regulations).', cannabinoidId: null },
  { id: 'ms_2001b', year: 2001, title: 'Lowryder — primera autofloreciente estabilizada', description: 'The Joint Doctor crea la primera variedad autofloreciente comercial. THC ~14%, 60 días semilla-cosecha.', cannabinoidId: null },
  { id: 'ms_2003', year: 2003, title: 'Patente US6630507', description: 'Gobierno de EEUU patenta cannabinoides como antioxidantes y neuroprotectores.', cannabinoidId: null },
  { id: 'ms_2005', year: 2005, title: 'Aprobación de Sativex en Canadá', description: 'THC:CBD 1:1 aprobado para espasticidad en Esclerosis Múltiple y dolor oncológico.', cannabinoidId: 'cb_thc' },
  { id: 'ms_2007', year: 2007, title: 'Primer ensayo clínico Fase I de THC en cáncer', description: 'Guzman et al. evalúan THC intratumoral en glioblastoma recurrente. Seguro, con reducción mensurable de proliferación en algunas muestras.', cannabinoidId: 'cb_thc' },
  { id: 'ms_2010', year: 2010, title: 'β-Cariofileno confirmado como agonista CB2', description: 'Gertsch et al. (PNAS) demuestran que un terpeno activa directamente el sistema endocannabinoide.', cannabinoidId: null },
  { id: 'ms_2012', year: 2012, title: 'Formalización del Efecto Entourage', description: 'Mechoulam y Ben-Shabat formalizan la sinergia cannabinoide-terpeno-flavonoide.', cannabinoidId: null },
  { id: 'ms_2014', year: 2014, title: 'Caso Charlotte Figi', description: 'Niña con Síndrome de Dravet reduce drásticamente sus convulsiones con CBD. Catalizador mediático y científico.', cannabinoidId: 'cb_cbd' },
  { id: 'ms_2018', year: 2018, title: 'FDA aprueba Epidiolex', description: 'Primer medicamento derivado directamente de la planta de Cannabis aprobado por la FDA, para Dravet y Lennox-Gastaut.', cannabinoidId: 'cb_cbd' },
  { id: 'ms_2019', year: 2019, title: 'Genoma completo de Cannabis sativa secuenciado', description: 'Laverty et al. identifican genes THCAS y CBDAS, sus localizaciones cromosómicas y regulación.', cannabinoidId: null },
  { id: 'ms_2021', year: 2021, title: 'Revisión consolidada de cannabinoides menores', description: 'Frontiers in Pharmacology consolida conocimiento sobre CBG, CBN, THCV, CBC, CBDV.', cannabinoidId: null },
  { id: 'ms_2022', year: 2022, title: 'Cannabinoides ácidos y proteína Spike SARS-CoV-2', description: 'Universidad de Oregon identifica unión in vitro de CBDA/CBGA a la proteína spike. Evidencia preclínica únicamente.', cannabinoidId: 'cb_cbda' },
  { id: 'ms_2023', year: 2023, title: 'Fallecimiento de Rafael Mechoulam', description: 'Fallece a los 92 años. Su grupo deja como legado moléculas como HU-580, derivado de CBDA con mayor estabilidad metabólica.', cannabinoidId: null },
  { id: 'ms_2024a', year: 2024, title: 'Primer ensayo clínico humano de CBG', description: 'Washington State University: 20mg de CBG reduce ansiedad subjetiva y mejora memoria verbal vs placebo, sin intoxicación.', cannabinoidId: 'cb_cbg' },
  { id: 'ms_2024b', year: 2024, title: 'CBN y arquitectura del sueño', description: 'Estudio en ratas (Nature/Neuropsychopharmacology, U. Sydney) muestra que CBN y su metabolito activo influyen en el sueño NREM.', cannabinoidId: 'cb_cbn' },
  { id: 'ms_2024c', year: 2024, title: 'Endocannabinoidoma como blanco terapéutico', description: 'Editorial en Frontiers in Neuroscience consolida el concepto de que disfunciones del sistema endocannabinoide están presentes en casi toda categoría de enfermedad.', cannabinoidId: null },
];

const MEDICATIONS = [
  { id: 'med_nabilone', name: 'Nabilona', substance: 'Análogo sintético CB1/CB2', indication: 'Náusea por quimioterapia', agency: 'FDA / Canadá', year: 1981 },
  { id: 'med_marinol', name: 'Marinol', substance: 'THC sintético (dronabinol)', indication: 'Anti-emético en quimioterapia, anorexia en SIDA', agency: 'FDA', year: 1985 },
  { id: 'med_sativex', name: 'Sativex', substance: 'THC:CBD 1:1 (extracto de planta)', indication: 'Espasticidad en Esclerosis Múltiple, dolor oncológico', agency: 'Canadá / EMA (+25 países)', year: 2005 },
  { id: 'med_epidiolex', name: 'Epidiolex', substance: 'CBD puro (>99%)', indication: 'Síndrome de Dravet, Lennox-Gastaut, Esclerosis Tuberosa', agency: 'FDA / EMA', year: 2018 },
];

function TimelineModule() {
  const [activeCannabinoid, setActiveCannabinoid] = useState(null);
  const [expandedMilestone, setExpandedMilestone] = useState(null);
  const [view, setView] = useState('timeline');

  const filteredMilestones = useMemo(() => {
    if (!activeCannabinoid) return MILESTONES;
    return MILESTONES.filter(m => m.cannabinoidId === activeCannabinoid);
  }, [activeCannabinoid]);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1E1410',
      color: '#F5EBE0',
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      <style>{`
        * { box-sizing: border-box; }
        .mono { font-family: 'JetBrains Mono', monospace; }
      .serif { font-family: 'Fraunces', Georgia, serif; }
      .serif-italic { font-family: 'Fraunces', Georgia, serif; font-style: italic; }
        ::selection { background: #E8674A; color: #1E1410; }
        button { font-family: inherit; }
        .chip { transition: all 0.15s; cursor: pointer; }
        .chip:hover { border-color: #E8674A !important; }
        .milestone-node { transition: all 0.2s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.2s ease; }
      `}</style>

      <header style={{
        borderBottom: '1px solid #4A3528', padding: '32px 24px 22px',
        background: 'linear-gradient(180deg, #241813 0%, #1E1410 100%)',
      }}>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <div style={{ width: 28, height: 2, background: 'linear-gradient(90deg, #E0A05E, #E8674A)', marginBottom: 10, borderRadius: 1 }} />
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.14em', color: '#E0A05E', marginBottom: 8, textTransform: 'uppercase' }}>
            Cannabis Master · Ciencia
          </div>
          <h1 className="serif" style={{ margin: 0, fontSize: 30, fontWeight: 600, letterSpacing: '-0.01em' }}>
            Línea de Tiempo Científica
          </h1>
          <p style={{ margin: '6px 0 0', fontSize: 14, color: '#C2A896', maxWidth: 540 }}>
            1964–2024: del aislamiento del THC al primer ensayo clínico humano de CBG. 22 hitos, 10 cannabinoides, 4 medicamentos aprobados.
          </p>

          <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
            <button
              onClick={() => setView('timeline')}
              style={{
                ...tabStyle,
                background: view === 'timeline' ? '#E8674A' : 'transparent',
                color: view === 'timeline' ? '#1E1410' : '#C2A896',
                border: view === 'timeline' ? 'none' : '1px solid #4A3528',
              }}
            >
              Línea de tiempo
            </button>
            <button
              onClick={() => setView('medications')}
              style={{
                ...tabStyle,
                background: view === 'medications' ? '#E8674A' : 'transparent',
                color: view === 'medications' ? '#1E1410' : '#C2A896',
                border: view === 'medications' ? 'none' : '1px solid #4A3528',
              }}
            >
              Medicamentos aprobados
            </button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 820, margin: '0 auto', padding: '28px 24px 80px' }}>

        {view === 'timeline' && (
          <div className="fade-in">
            <section style={{ marginBottom: 28 }}>
              <div className="mono" style={{ fontSize: 11, color: '#9C8070', marginBottom: 10, letterSpacing: '0.04em' }}>
                FILTRAR POR CANNABINOIDE
              </div>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                <button
                  className="chip"
                  onClick={() => setActiveCannabinoid(null)}
                  style={{
                    ...timelineChipStyle,
                    background: activeCannabinoid === null ? '#E8674A26' : '#2A1D17',
                    border: activeCannabinoid === null ? '1px solid #E8674A' : '1px solid #4A3528',
                    color: activeCannabinoid === null ? '#E8674A' : '#C2A896',
                  }}
                >
                  Todos
                </button>
                {Object.entries(CANNABINOIDS).map(([id, c]) => {
                  const hasM = MILESTONES.some(m => m.cannabinoidId === id);
                  if (!hasM) return null;
                  const active = activeCannabinoid === id;
                  return (
                    <button
                      key={id}
                      className="chip"
                      onClick={() => setActiveCannabinoid(active ? null : id)}
                      style={{
                        ...timelineChipStyle,
                        background: active ? '#E8674A26' : '#2A1D17',
                        border: active ? '1px solid #E8674A' : '1px solid #4A3528',
                        color: active ? '#E8674A' : '#C2A896',
                      }}
                    >
                      {c.name}
                    </button>
                  );
                })}
              </div>
            </section>

            {activeCannabinoid && (
              <CannabinoidCard cannabinoid={CANNABINOIDS[activeCannabinoid]} />
            )}

            <section style={{ position: 'relative', marginTop: 8 }}>
              <div style={{
                position: 'absolute', left: 29, top: 8, bottom: 8, width: 2,
                background: 'linear-gradient(180deg, #4A3528 0%, #E8674A22 100%)',
              }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {filteredMilestones.map((m) => {
                  const isExpanded = expandedMilestone === m.id;
                  const cb = m.cannabinoidId ? CANNABINOIDS[m.cannabinoidId] : null;
                  return (
                    <div key={m.id} style={{ display: 'flex', gap: 16, position: 'relative' }}>
                      <div style={{ width: 60, flexShrink: 0, textAlign: 'right', paddingTop: 14 }}>
                        <span className="mono" style={{ fontSize: 13, color: '#9C8070', fontWeight: 700 }}>{m.year}</span>
                      </div>

                      <div style={{ flexShrink: 0, position: 'relative', width: 16 }}>
                        <div
                          className="milestone-node"
                          style={{
                            position: 'absolute', top: 18, left: 4, width: 10, height: 10, borderRadius: '50%',
                            background: cb ? '#E0A05E' : '#E8674A',
                            border: '2px solid #1E1410',
                            boxShadow: isExpanded ? `0 0 0 4px ${cb ? '#E0A05E33' : '#E8674A33'}` : 'none',
                          }}
                        />
                      </div>

                      <button
                        onClick={() => setExpandedMilestone(isExpanded ? null : m.id)}
                        style={{
                          flex: 1, textAlign: 'left', background: isExpanded ? '#2A1D17' : 'transparent',
                          border: isExpanded ? '1px solid #4A3528' : '1px solid transparent',
                          borderRadius: 8, padding: '12px 14px', marginBottom: 6, cursor: 'pointer', color: '#F5EBE0',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
                          <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.3 }}>{m.title}</div>
                          <span style={{ color: '#9C8070', fontSize: 16, flexShrink: 0, transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>⌄</span>
                        </div>
                        {cb && !isExpanded && (
                          <span className="mono" style={{ fontSize: 10, color: '#E0A05E', marginTop: 4, display: 'inline-block' }}>
                            {cb.name}
                          </span>
                        )}
                        {isExpanded && (
                          <div className="fade-in" style={{ marginTop: 8 }}>
                            <p style={{ fontSize: 13, color: '#D9C4B5', margin: 0, lineHeight: 1.55 }}>{m.description}</p>
                            {cb && (
                              <div style={{ marginTop: 10 }}>
                                <span className="mono" style={{
                                  fontSize: 10.5, color: '#E0A05E', background: '#E0A05E15',
                                  border: '1px solid #E0A05E44', borderRadius: 20, padding: '3px 10px',
                                }}>
                                  Relacionado: {cb.name} — {cb.fullName}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {view === 'medications' && (
          <div className="fade-in">
            <p style={{ fontSize: 13, color: '#9C8070', marginBottom: 20, lineHeight: 1.6 }}>
              Medicamentos derivados de cannabinoides con aprobación formal de agencias regulatorias, ordenados cronológicamente.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {MEDICATIONS.map(med => (
                <div key={med.id} style={{
                  background: '#2A1D17', border: '1px solid #4A3528', borderRadius: 10,
                  padding: '18px 20px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 800 }}>{med.name}</div>
                      <div className="mono" style={{ fontSize: 11.5, color: '#9C8070', marginTop: 2 }}>{med.substance}</div>
                    </div>
                    <div style={{
                      fontSize: 20, fontWeight: 800, color: '#E0A05E', flexShrink: 0,
                    }}>{med.year}</div>
                  </div>
                  <p style={{ fontSize: 13, color: '#D9C4B5', margin: '12px 0 0', lineHeight: 1.5 }}>{med.indication}</p>
                  <div style={{ marginTop: 10 }}>
                    <span className="mono" style={{
                      fontSize: 10.5, color: '#E8674A', background: '#E8674A15',
                      border: '1px solid #E8674A44', borderRadius: 20, padding: '3px 10px',
                    }}>
                      {med.agency}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <p style={{ marginTop: 40, fontSize: 11.5, color: '#7A6155', textAlign: 'center', lineHeight: 1.6 }}>
          Hitos seleccionados por relevancia científica y clínica. No es un registro exhaustivo de toda la investigación en cannabinoides.
        </p>
      </main>
    </div>
  );
}

function CannabinoidCard({ cannabinoid }) {
  const status = STATUS_LABELS[cannabinoid.status];
  return (
    <div className="fade-in" style={{
      background: '#2A1D17', border: '1px solid #4A3528', borderRadius: 10,
      padding: '18px 20px', marginBottom: 20,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{cannabinoid.name}</div>
          <div className="mono" style={{ fontSize: 12, color: '#9C8070', marginTop: 2 }}>{cannabinoid.fullName}</div>
        </div>
        <span className="mono" style={{
          fontSize: 10.5, color: status.color, background: status.color + '15',
          border: `1px solid ${status.color}44`, borderRadius: 20, padding: '4px 10px', flexShrink: 0,
        }}>
          {status.label}
        </span>
      </div>

      <p style={{ fontSize: 13, color: '#D9C4B5', margin: '12px 0 0', lineHeight: 1.55 }}>{cannabinoid.notes}</p>

      {cannabinoid.receptors && (
        <div style={{ marginTop: 12 }}>
          <div className="mono" style={{ fontSize: 10, color: '#9C8070', letterSpacing: '0.04em', marginBottom: 6 }}>RECEPTORES</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {cannabinoid.receptors.map((r, i) => (
              <span key={i} className="mono" style={{ fontSize: 10.5, color: '#C2A896', background: '#1E1410', border: '1px solid #4A3528', borderRadius: 4, padding: '2px 8px' }}>
                {r}
              </span>
            ))}
          </div>
        </div>
      )}

      {cannabinoid.preclinical && (
        <div style={{ marginTop: 12 }}>
          <div className="mono" style={{ fontSize: 10, color: '#9C8070', letterSpacing: '0.04em', marginBottom: 6 }}>HALLAZGOS PRECLÍNICOS</div>
          <ul style={{ margin: 0, paddingLeft: 16, fontSize: 12.5, color: '#C2A896', lineHeight: 1.7 }}>
            {cannabinoid.preclinical.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
      )}

      {cannabinoid.meds && (
        <div style={{ marginTop: 12 }}>
          <div className="mono" style={{ fontSize: 10, color: '#9C8070', letterSpacing: '0.04em', marginBottom: 6 }}>MEDICAMENTOS APROBADOS</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {cannabinoid.meds.map((m, i) => (
              <span key={i} className="mono" style={{ fontSize: 10.5, color: '#E8674A', background: '#E8674A15', border: '1px solid #E8674A44', borderRadius: 4, padding: '2px 8px' }}>
                {m}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const tabStyle = {
  padding: '8px 16px', borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: 'pointer',
};

const timelineChipStyle = {
  padding: '6px 13px', borderRadius: 20, fontSize: 12.5, fontWeight: 600,
};

// ============================================================
// BACKUP MODULE — Exportar / Importar todos los datos del app
// ============================================================

const BACKUP_KEYS = ['diario-plants-list', 'curso-progress'];
const STORAGE_PREFIX = 'cannabis-master-app:';
const BACKUP_VERSION = 1;

function readAllAppData() {
  const data = {};
  BACKUP_KEYS.forEach(key => {
    try {
      const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
      data[key] = raw ? JSON.parse(raw) : null;
    } catch (e) {
      data[key] = null;
    }
  });
  return data;
}

function writeAllAppData(data) {
  BACKUP_KEYS.forEach(key => {
    if (data[key] !== undefined && data[key] !== null) {
      window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data[key]));
    }
  });
}

function countPlants(data) {
  return Array.isArray(data['diario-plants-list']) ? data['diario-plants-list'].length : 0;
}
function countCompletedModules(data) {
  const prog = data['curso-progress'];
  if (!prog || typeof prog !== 'object') return 0;
  return Object.values(prog).filter(Boolean).length;
}

function BackupButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Backup y configuración"
        style={{
          position: 'fixed', top: 16, right: 16, zIndex: 60,
          width: 40, height: 40, borderRadius: '50%',
          background: '#2A1D17', border: '1px solid #4A3528',
          color: '#C2A896', fontSize: 17, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(20,10,5,0.4)',
        }}
      >
        ⚙
      </button>
      {open && <BackupModal onClose={() => setOpen(false)} />}
    </>
  );
}

function BackupModal({ onClose }) {
  const [status, setStatus] = useState(null); // { type: 'success'|'error', message }
  const [confirmReset, setConfirmReset] = useState(false);
  const fileInputRef = React.useRef(null);

  const data = readAllAppData();
  const plantCount = countPlants(data);
  const completedCount = countCompletedModules(data);
  const hasAnyData = plantCount > 0 || completedCount > 0;

  const handleExport = () => {
    try {
      const backup = {
        app: 'cannabis-master',
        version: BACKUP_VERSION,
        exportedAt: new Date().toISOString(),
        data: readAllAppData(),
      };
      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const dateStr = new Date().toISOString().split('T')[0];
      a.href = url;
      a.download = `cannabis-master-backup-${dateStr}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setStatus({ type: 'success', message: 'Backup descargado correctamente.' });
    } catch (e) {
      setStatus({ type: 'error', message: 'No se pudo generar el backup. Intentá de nuevo.' });
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!parsed || parsed.app !== 'cannabis-master' || !parsed.data) {
          setStatus({ type: 'error', message: 'Este archivo no parece ser un backup válido de Cannabis Master.' });
          return;
        }
        writeAllAppData(parsed.data);
        setStatus({ type: 'success', message: 'Datos restaurados. Recargá la página para verlos reflejados en todos los módulos.' });
      } catch (err) {
        setStatus({ type: 'error', message: 'El archivo está dañado o no es un JSON válido.' });
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleReset = () => {
    BACKUP_KEYS.forEach(key => window.localStorage.removeItem(STORAGE_PREFIX + key));
    setStatus({ type: 'success', message: 'Todos los datos locales fueron borrados.' });
    setConfirmReset(false);
  };

  return (
    <div
      style={{
        position: 'fixed', inset: 0, background: 'rgba(15,9,6,0.75)', zIndex: 300,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#2A1D17', border: '1px solid #4A3528', borderRadius: 14,
          padding: 26, width: '100%', maxWidth: 440, maxHeight: '88vh', overflowY: 'auto',
          fontFamily: "'Inter', -apple-system, sans-serif",
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <h2 className="serif" style={{ margin: 0, fontSize: 22, fontWeight: 600, color: '#F5EBE0' }}>
            Backup y datos
          </h2>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#9C8070', fontSize: 20, cursor: 'pointer', lineHeight: 1 }}
          >✕</button>
        </div>
        <p style={{ fontSize: 13, color: '#C2A896', margin: '0 0 20px', lineHeight: 1.5 }}>
          Tus datos viven solo en este navegador. Exportá un backup antes de actualizar el app, cambiar de celular, o borrar el navegador — así no perdés tu bitácora.
        </p>

        {/* CURRENT DATA SUMMARY */}
        <div style={{
          background: '#1E1410', border: '1px solid #4A3528', borderRadius: 10,
          padding: '14px 16px', marginBottom: 20, display: 'flex', gap: 24,
        }}>
          <div>
            <div className="mono" style={{ fontSize: 10, color: '#9C8070', letterSpacing: '0.04em' }}>PLANTAS GUARDADAS</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#E8674A' }}>{plantCount}</div>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 10, color: '#9C8070', letterSpacing: '0.04em' }}>MÓDULOS COMPLETADOS</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#E0A05E' }}>{completedCount} / 14</div>
          </div>
        </div>

        {status && (
          <div style={{
            background: status.type === 'success' ? '#2A3D1933' : '#3D241933',
            border: `1px solid ${status.type === 'success' ? '#9FBF3B55' : '#C2453A55'}`,
            borderRadius: 8, padding: '10px 14px', marginBottom: 18,
            fontSize: 12.5, color: status.type === 'success' ? '#B8D98A' : '#E0998C',
          }}>
            {status.message}
          </div>
        )}

        {/* EXPORT */}
        <div style={{ marginBottom: 16 }}>
          <button
            onClick={handleExport}
            disabled={!hasAnyData}
            style={{
              width: '100%', padding: '13px 16px', borderRadius: 9, fontSize: 14, fontWeight: 700,
              cursor: hasAnyData ? 'pointer' : 'not-allowed', border: 'none',
              background: hasAnyData ? '#E8674A' : '#4A3528',
              color: hasAnyData ? '#1E1410' : '#7A6155',
            }}
          >
            ↓ Descargar backup (.json)
          </button>
          {!hasAnyData && (
            <p style={{ fontSize: 11.5, color: '#7A6155', margin: '6px 0 0' }}>
              Todavía no hay datos guardados para exportar.
            </p>
          )}
        </div>

        {/* IMPORT */}
        <div style={{ marginBottom: 20 }}>
          <button
            onClick={handleImportClick}
            style={{
              width: '100%', padding: '13px 16px', borderRadius: 9, fontSize: 14, fontWeight: 700,
              cursor: 'pointer', background: 'transparent', border: '1px solid #E0A05E', color: '#E0A05E',
            }}
          >
            ↑ Restaurar desde un backup
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <p style={{ fontSize: 11.5, color: '#7A6155', margin: '6px 0 0', lineHeight: 1.5 }}>
            Restaurar reemplaza los datos actuales de este navegador por los del archivo elegido.
          </p>
        </div>

        {/* DANGER ZONE */}
        <div style={{ paddingTop: 16, borderTop: '1px solid #4A3528' }}>
          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              disabled={!hasAnyData}
              style={{
                background: 'none', border: 'none', fontSize: 12.5, cursor: hasAnyData ? 'pointer' : 'not-allowed',
                color: hasAnyData ? '#C2453A' : '#5A4438', padding: 0,
              }}
            >
              Borrar todos los datos de este navegador
            </button>
          ) : (
            <div>
              <p style={{ fontSize: 12.5, color: '#E0998C', margin: '0 0 10px' }}>
                ¿Seguro? Esto borra plantas, bitácora y progreso del curso de este navegador. Si no exportaste un backup antes, esta acción no se puede deshacer.
              </p>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={() => setConfirmReset(false)}
                  style={{ flex: 1, padding: '9px', borderRadius: 7, fontSize: 12.5, background: 'transparent', border: '1px solid #4A3528', color: '#C2A896', cursor: 'pointer' }}
                >Cancelar</button>
                <button
                  onClick={handleReset}
                  style={{ flex: 1, padding: '9px', borderRadius: 7, fontSize: 12.5, fontWeight: 700, background: '#C2453A', border: 'none', color: '#F5EBE0', cursor: 'pointer' }}
                >Sí, borrar todo</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


const TABS = [
  { id: 'diario', label: 'Cultivo', icon: '🌿' },
  { id: 'calc', label: 'Nutrientes', icon: '🧪' },
  { id: 'diag', label: 'Diagnóstico', icon: '🔍' },
  { id: 'curso', label: 'Curso', icon: '📘' },
  { id: 'timeline', label: 'Ciencia', icon: '🔬' },
];

function AppShell() {
  const [activeTab, setActiveTab] = useState('diario');

  return (
    <div style={{
      minHeight: '100vh',
      background: '#1E1410',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,500;1,9..144,600&family=JetBrains+Mono:wght@400;500;700&family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        .mono { font-family: 'JetBrains Mono', monospace; }
      .serif { font-family: 'Fraunces', Georgia, serif; }
      .serif-italic { font-family: 'Fraunces', Georgia, serif; font-style: italic; }
        ::selection { background: #E8674A; color: #1E1410; }
        button { font-family: inherit; }
        select, input, textarea { outline: none; font-family: inherit; }
        select:focus, input:focus, textarea:focus { box-shadow: 0 0 0 2px #E8674A; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.8); cursor: pointer; }
        input[type="range"] { -webkit-appearance: none; appearance: none; height: 4px; background: #4A3528; border-radius: 2px; outline: none; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #E8674A; cursor: pointer; border: 2px solid #1E1410; }
        input[type="range"]::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: #E8674A; cursor: pointer; border: 2px solid #1E1410; }
        .tab-btn { transition: all 0.15s; cursor: pointer; }
        .plant-tile, .module-card, .product-card, .option-card, .chip, .phase-card { transition: all 0.15s ease; cursor: pointer; }
        .plant-tile:hover, .module-card:hover { transform: translateY(-2px); border-color: #E8674A !important; }
        .option-card:hover { border-color: #E8674A !important; transform: translateX(2px); }
        .phase-card:hover { transform: translateX(2px); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.2s ease; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #1E1410; }
        ::-webkit-scrollbar-thumb { background: #4A3528; border-radius: 4px; }
      `}</style>

      {/* CONTENT AREA */}
      <div id="app-content-scroll" style={{ flex: 1, overflowY: 'auto' }}>
        {activeTab === 'diario' && <DiarioModule />}
        {activeTab === 'calc' && <CalcModule />}
        {activeTab === 'diag' && <DiagModule />}
        {activeTab === 'curso' && <CursoModule />}
        {activeTab === 'timeline' && <TimelineModule />}
      </div>

      <BackupButton />

      {/* TAB BAR */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        background: '#241813',
        borderTop: '1px solid transparent',
        borderImage: 'linear-gradient(90deg, #4A3528 0%, #E8674A33 50%, #4A3528 100%) 1',
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '10px 4px calc(8px + env(safe-area-inset-bottom, 0px))',
        boxShadow: '0 -8px 24px rgba(20,10,5,0.45)',
      }}>
        {TABS.map(tab => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className="tab-btn"
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none', border: 'none', display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 4, padding: '6px 10px', borderRadius: 10,
                flex: 1, maxWidth: 80, position: 'relative',
              }}
            >
              {active && (
                <span style={{
                  position: 'absolute', top: -10, width: 4, height: 4, borderRadius: '50%',
                  background: '#E0A05E', boxShadow: '0 0 8px #E0A05E99',
                }} />
              )}
              <span style={{
                fontSize: 21, lineHeight: 1, filter: active ? 'none' : 'grayscale(0.6) opacity(0.55)',
                transform: active ? 'scale(1.12)' : 'scale(1)', transition: 'transform 0.18s ease',
              }}>
                {tab.icon}
              </span>
              <span className="mono" style={{
                fontSize: 9.5, fontWeight: active ? 700 : 500,
                color: active ? '#E8674A' : '#9C8070', letterSpacing: '0.02em',
                transition: 'color 0.18s ease',
              }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default AppShell;
