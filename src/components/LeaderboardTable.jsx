import { useMemo } from 'react';

export default function LeaderboardTable({ users, limit }) {
  const ranked = useMemo(() => {
    const scored = users.filter((u) => u.score != null);
    const unscored = users.filter((u) => u.score == null);
    scored.sort((a, b) => b.score - a.score);
    const combined = [...scored, ...unscored];
    return typeof limit === 'number' ? combined.slice(0, limit) : combined;
  }, [users, limit]);

  if (users.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-2xl uppercase">
        WAITING FOR PLAYERS...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-fixed border-separate border-spacing-y-8 uppercase bg-transparent">
        <tbody>
          {ranked.map((player, idx) => {
            const hasScore = player.score != null;
            const rank = hasScore ? idx + 1 : '—';
            const isTop3 = hasScore && idx < 3;
            const isLowerRank = hasScore && idx >= 3;
            const topBadgeStyle =
              idx === 0
                ? { shieldStroke: '#facc15', rankText: 'text-yellow-600' }
                : idx === 1
                ? { shieldStroke: '#d1d5db', rankText: 'text-gray-500' }
                : { shieldStroke: '#f59e0b', rankText: 'text-amber-600' };
            const rowBg = isTop3
              ? 'bg-[#102b7a]/90'
              : isLowerRank
              ? 'bg-white/35 backdrop-blur-xl'
              : 'bg-[#0b1f5e]/85';

            return (
              <tr
                key={player.id}
                className="transition-all duration-300 transform-gpu"
                style={{
                  transform: 'translateZ(0)',
                  filter: 'drop-shadow(0 8px 16px rgba(30, 64, 175, 0.22))'
                }}
              >
                <td 
                  className={`px-8 py-9 text-center border-4 border-yellow-400 border-r-0 rounded-l-2xl ${rowBg} relative overflow-hidden`}
                  style={{
                    boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.22), inset 0 -1px 6px rgba(59,130,246,0.2), 0 4px 12px rgba(30,64,175,0.2)',
                    background: isTop3 
                      ? 'linear-gradient(180deg, rgba(16,43,122,0.95) 0%, rgba(30,64,175,0.85) 50%, rgba(96,165,250,0.4) 100%)'
                      : isLowerRank
                      ? 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(219,234,254,0.5) 50%, rgba(147,197,253,0.35) 100%)'
                      : 'linear-gradient(180deg, rgba(11,31,94,0.9) 0%, rgba(30,58,138,0.8) 50%, rgba(59,130,246,0.4) 100%)',
                    borderTop: '2px solid rgba(255,255,255,0.3)',
                    borderBottom: '2px solid rgba(147,197,253,0.35)'
                  }}
                >
                  <div className="absolute left-0 right-0 bottom-0 h-1.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-90" 
                       style={{
                         boxShadow: '0 0 20px 6px rgba(96, 165, 250, 0.8), 0 0 40px 10px rgba(147, 197, 253, 0.5), 0 -20px 50px 5px rgba(96, 165, 250, 0.3)',
                         filter: 'blur(1px)'
                       }}
                  />
                  <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent" 
                       style={{
                         boxShadow: '0 0 15px 4px rgba(255, 255, 255, 0.9)'
                       }}
                  />
                  <div className="relative z-10">
                  {isTop3 ? (
                    <span className="inline-flex items-center justify-center w-28 h-30 relative">
                      <svg viewBox="0 0 64 76" className="w-full h-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.35)]" aria-hidden="true">
                        <path
                          d="M32 4 C39 10, 50 12, 58 12 V39 C58 53, 47 65, 32 72 C17 65, 6 53, 6 39 V12 C14 12, 25 10, 32 4 Z"
                          fill="#ffffff"
                          stroke={topBadgeStyle.shieldStroke}
                          strokeWidth="2.5"
                        />
                      </svg>
                      <span className={`absolute top-1/2 -translate-y-1/2 text-5xl font-black ${topBadgeStyle.rankText}`}>
                        {rank}
                      </span>
                    </span>
                  ) : (
                    <span className={`font-medium text-4xl ${isLowerRank ? 'text-white' : 'text-gray-400'}`}>{rank}</span>
                  )}
                  </div>
                </td>
                <td 
                  className={`px-8 py-9 text-center border-y-4 border-yellow-400 ${rowBg} relative overflow-hidden`}
                  style={{
                    boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.22), inset 0 -1px 6px rgba(59,130,246,0.2), 0 4px 12px rgba(30,64,175,0.2)',
                    background: isTop3 
                      ? 'linear-gradient(180deg, rgba(16,43,122,0.95) 0%, rgba(30,64,175,0.85) 50%, rgba(96,165,250,0.4) 100%)'
                      : isLowerRank
                      ? 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(219,234,254,0.5) 50%, rgba(147,197,253,0.35) 100%)'
                      : 'linear-gradient(180deg, rgba(11,31,94,0.9) 0%, rgba(30,58,138,0.8) 50%, rgba(59,130,246,0.4) 100%)',
                    borderTop: '2px solid rgba(255,255,255,0.3)',
                    borderBottom: '2px solid rgba(147,197,253,0.35)'
                  }}
                >
                  <div className="absolute left-0 right-0 bottom-0 h-1.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-90" 
                       style={{
                         boxShadow: '0 0 20px 6px rgba(96, 165, 250, 0.8), 0 0 40px 10px rgba(147, 197, 253, 0.5), 0 -20px 50px 5px rgba(96, 165, 250, 0.3)',
                         filter: 'blur(1px)'
                       }}
                  />
                  <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent" 
                       style={{
                         boxShadow: '0 0 15px 4px rgba(255, 255, 255, 0.9)'
                       }}
                  />
                  <span className={`block w-full whitespace-nowrap overflow-hidden text-ellipsis font-semibold ${isTop3 ? 'text-white text-4xl' : isLowerRank ? 'text-white text-3xl' : 'text-gray-200 text-3xl'} relative z-10`}>
                    {player.name}
                  </span>
                </td>
                <td 
                  className={`px-8 py-9 text-center border-4 border-yellow-400 border-l-0 rounded-r-2xl ${rowBg} relative overflow-hidden`}
                  style={{
                    boxShadow: 'inset 0 2px 8px rgba(255,255,255,0.22), inset 0 -1px 6px rgba(59,130,246,0.2), 0 4px 12px rgba(30,64,175,0.2)',
                    background: isTop3 
                      ? 'linear-gradient(180deg, rgba(16,43,122,0.95) 0%, rgba(30,64,175,0.85) 50%, rgba(96,165,250,0.4) 100%)'
                      : isLowerRank
                      ? 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(219,234,254,0.5) 50%, rgba(147,197,253,0.35) 100%)'
                      : 'linear-gradient(180deg, rgba(11,31,94,0.9) 0%, rgba(30,58,138,0.8) 50%, rgba(59,130,246,0.4) 100%)',
                    borderTop: '2px solid rgba(255,255,255,0.3)',
                    borderBottom: '2px solid rgba(147,197,253,0.35)'
                  }}
                >
                  <div className="absolute left-0 right-0 bottom-0 h-1.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-90" 
                       style={{
                         boxShadow: '0 0 20px 6px rgba(96, 165, 250, 0.8), 0 0 40px 10px rgba(147, 197, 253, 0.5), 0 -20px 50px 5px rgba(96, 165, 250, 0.3)',
                         filter: 'blur(1px)'
                       }}
                  />
                  <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent" 
                       style={{
                         boxShadow: '0 0 15px 4px rgba(255, 255, 255, 0.9)'
                       }}
                  />
                  <div className="relative z-10">
                  {hasScore ? (
                    <span className={`font-bold ${isTop3 ? 'text-5xl text-white' : isLowerRank ? 'text-4xl text-white' : 'text-4xl text-gray-200'}`}>
                      {player.score.toLocaleString()}
                    </span>
                  ) : (
                    <span className="text-gray-500 italic text-3xl">Pending</span>
                  )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
