import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LOCATION_CONFIG, MAX_PLAYERS } from '../constants';
import { useGame } from '../context/GameContext';
import { useStorageSync } from '../hooks/useStorageSync';
import LeaderboardTable from '../components/LeaderboardTable';
import { format } from 'date-fns';
import { FiUsers, FiArrowLeft } from 'react-icons/fi';
import scoreboardBg from './scoreboard.png';

export default function Scoreboard() {
  const { locationId } = useParams();
  const { setLocation, users, counter } = useGame();
  const cfg = LOCATION_CONFIG[locationId];

  useEffect(() => {
    if (locationId) setLocation(locationId);
  }, [locationId, setLocation]);

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

  const scored = users.filter((u) => u.score != null).length;

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-950">
      <div
        className="w-[1080px] h-[1920px] text-white bg-gray-950 bg-center bg-no-repeat relative"
        style={{
          backgroundImage: `url('${scoreboardBg}')`,
          backgroundSize: '1080px 1920px',
        }}
      >
        <div className="w-full h-full flex flex-col bg-black/65">
      {/* Header */}
      <header className="border-b border-gray-800 px-6 py-4 flex-shrink-0">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to={`/location/${locationId}`}
              className="text-gray-500 hover:text-gray-300 transition-colors"
            >
              <FiArrowLeft className="text-xl" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold">
                🏆{' '}
                <span style={{ color: cfg.accent }}>{cfg.name}</span>{' '}
                Leaderboard
              </h1>
              <p className="text-gray-500 text-sm">
                {format(new Date(), 'EEEE, MMMM d, yyyy')} • Live updates
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <FiUsers />
              <span>
                <strong className="text-white">{counter}</strong> / {MAX_PLAYERS} players
              </span>
            </div>
            <div className="text-gray-400">
              <strong className="text-white">{scored}</strong> scored
            </div>
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" title="Live" />
          </div>
        </div>
      </header>

      {/* Leaderboard */}
      <main className="flex-1 overflow-auto px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <LeaderboardTable users={users} />
        </div>
      </main>

      {/* Footer ticker */}
      <footer className="border-t border-gray-800 px-6 py-3 flex-shrink-0">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-gray-600 text-xs">
          <span>Game Scoreboard • {cfg.name}</span>
          <span>Auto-refreshes every 2 seconds</span>
        </div>
      </footer>
        </div>
      </div>
    </div>
  );
}
