import React from 'react';

export function TechnicalLabelsOverlay({ labels = [], activeLayerId, onSelectLayer, isVisible = true }) {
  if (!isVisible || !labels.length) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {/* SVG Connecting Lines Layer */}
      <svg className="w-full h-full absolute inset-0">
        <defs>
          <linearGradient id="blueTechLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#168CFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#168CFF" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="orangeTechLine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7A18" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FF7A18" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {labels.map((item) => {
          if (!item.visible || item.opacity < 0.2) return null;

          const isLeft = item.pinSide === 'left';
          const cardX = isLeft ? Math.max(20, item.screenX - 220) : Math.min(window.innerWidth - 240, item.screenX + 160);
          const cardY = Math.max(80, Math.min(window.innerHeight - 120, item.screenY - 20));
          const elbowX = isLeft ? cardX + 180 : cardX;

          const isOrange = item.id === '03' || item.id === '06';
          const strokeColor = isOrange ? 'url(#orangeTechLine)' : 'url(#blueTechLine)';
          const dotColor = isOrange ? '#FF7A18' : '#168CFF';

          return (
            <g key={`line-${item.id}`} style={{ opacity: item.opacity }}>
              {/* Anchor point on 3D cable */}
              <circle
                cx={item.screenX}
                cy={item.screenY}
                r="3.5"
                fill={dotColor}
                stroke="#07090B"
                strokeWidth="1.5"
              />
              <circle
                cx={item.screenX}
                cy={item.screenY}
                r="7"
                fill="none"
                stroke={dotColor}
                strokeWidth="1"
                strokeDasharray="2 2"
                opacity="0.6"
              />

              {/* Technical leader path */}
              <path
                d={`M ${item.screenX} ${item.screenY} L ${elbowX} ${cardY + 16} L ${cardX + (isLeft ? 170 : 10)} ${cardY + 16}`}
                fill="none"
                stroke={strokeColor}
                strokeWidth="1.2"
                strokeDasharray="4 2"
              />

              {/* Terminal tick */}
              <circle
                cx={elbowX}
                cy={cardY + 16}
                r="2"
                fill={dotColor}
              />
            </g>
          );
        })}
      </svg>

      {/* HTML Technical Label Cards */}
      {labels.map((item) => {
        if (!item.visible || item.opacity < 0.2) return null;

        const isLeft = item.pinSide === 'left';
        const cardX = isLeft ? Math.max(20, item.screenX - 220) : Math.min(window.innerWidth - 240, item.screenX + 160);
        const cardY = Math.max(80, Math.min(window.innerHeight - 120, item.screenY - 20));
        const isActive = activeLayerId === item.id;
        const isOrange = item.id === '03' || item.id === '06';

        return (
          <div
            key={`card-${item.id}`}
            style={{
              transform: `translate(${cardX}px, ${cardY}px)`,
              opacity: item.opacity,
              transition: 'opacity 0.2s ease-out'
            }}
            onClick={() => onSelectLayer && onSelectLayer(item)}
            className={`absolute top-0 left-0 pointer-events-auto cursor-pointer group select-none p-3 rounded-none border transition-all duration-300 ${
              isActive
                ? 'bg-[#0D1219]/95 border-[#168CFF] shadow-[0_0_20px_rgba(22,140,255,0.3)]'
                : 'bg-[#0A0D12]/80 border-[#1E2633] hover:border-[#384860] hover:bg-[#0E141D]/90'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className={`text-[10px] font-mono-tech px-1.5 py-0.5 border ${
                  isOrange
                    ? 'border-[#FF7A18]/50 text-[#FF7A18] bg-[#FF7A18]/10'
                    : 'border-[#168CFF]/50 text-[#168CFF] bg-[#168CFF]/10'
                }`}
              >
                {item.number}
              </span>
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#F5F5F5] font-mono-tech group-hover:text-white">
                {item.name}
              </span>
            </div>
            <p className="text-[10px] text-[#9CA3AF] line-clamp-1 max-w-[190px]">
              {item.material}
            </p>
            <div className="mt-1 flex items-center gap-2 text-[9px] text-[#6B7280] font-mono-tech">
              <span>{item.thickness || item.coverage || item.dielectric || item.conductivity}</span>
              <span className="text-[#168CFF] opacity-0 group-hover:opacity-100 transition-opacity">
                VIEW SPECS →
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
