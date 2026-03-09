import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LOCATION_CONFIG, SCOREBOARD_TOP_PLAYERS } from '../constants';
import { useGame } from '../context/GameContext';
import { useStorageSync } from '../hooks/useStorageSync';
import LeaderboardTable from '../components/LeaderboardTable';
import scoreboardBg from './scoreboard.png';

export default function Scoreboard() {
  const { locationId } = useParams();
  const { setLocation, users } = useGame();
  const cfg = LOCATION_CONFIG[locationId];
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (locationId) setLocation(locationId);
  }, [locationId, setLocation]);

  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth / 1080;
      const h = window.innerHeight / 1920;
      setScale(Math.min(w, h));
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  useStorageSync(locationId);

  useEffect(() => {
    document.title = `Scoreboard — ${cfg?.name || 'Unknown'} | Game Scoreboard`;
  }, [cfg]);

  if (!cfg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Invalid Location</h1>
          <Link to="/" className="text-blue-400 hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const scoredUsers = users.filter((u) => u.score != null);

  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-950 flex items-center justify-center">
      <div
        className="w-[1080px] h-[1920px] text-white bg-gray-950 bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url('${scoreboardBg}')`,
          backgroundSize: '1080px 1920px',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        <div className="w-full h-full flex flex-col" style={{ fontFamily: '"Poppins", sans-serif' }}>
      {/* Leaderboard */}
      <main className="flex-1 overflow-auto px-8 py-10 flex items-end justify-center pb-8">
        <div className="w-full max-w-5xl rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-6">
          <LeaderboardTable users={scoredUsers} limit={SCOREBOARD_TOP_PLAYERS} />
        </div>
      </main>

      {/* Footer ticker */}
      <footer className="border-t border-white/20 px-6 py-3 flex-shrink-0">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-white/75 text-xs">
        </div>
      </footer>
        </div>
      </div>
    </div>
  );
}
