import React from 'react';

export function TechnicalLabelsOverlay({ labels = [], activeLayerId, onSelectLayer, isVisible = true }) {
  if (!isVisible || !labels.length) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {/* SVG Connecting Leader Lines Layer */}
      <svg className="w-full h-full absolute inset-0 pointer-events-none">
        <defs>
          <linearGradient id="techBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#168CFF" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#168CFF" stopOpacity="0.25" />
          </linearGradient>
          <linearGradient id="techOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF7A18" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FF7A18" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {labels.map((item) => {
          if (!item.visible || item.opacity < 0.15) return null;

          const isLeft = item.pinSide === 'left';
          const cardX = isLeft ? Math.max(24, item.screenX - 250) : Math.min(window.innerWidth - 260, item.screenX + 170);
          const cardY = Math.max(90, Math.min(window.innerHeight - 130, item.screenY - 24));
          const elbowX = isLeft ? cardX + 210 : cardX;

          const isOrange = item.id === '03' || item.id === '05';
          const strokeColor = isOrange ? 'url(#techOrangeGrad)' : 'url(#techBlueGrad)';
          const dotColor = isOrange ? '#FF7A18' : '#168CFF';

          return (
            <g
              key={`line-${item.id}`}
              style={{
                opacity: item.opacity,
                transition: 'opacity 0.25s ease-out'
              }}
            >
              {/* Inner Anchor dot on 3D cable */}
              <circle
                cx={item.screenX}
                cy={item.screenY}
                r="3"
                fill={dotColor}
                stroke="#07090B"
                strokeWidth="1.5"
              />
              <circle
                cx={item.screenX}
                cy={item.screenY}
                r="6.5"
                fill="none"
                stroke={dotColor}
                strokeWidth="1"
                strokeDasharray="2 2"
                opacity="0.6"
              />

              {/* Technical leader path with elbow */}
              <path
                d={`M ${item.screenX} ${item.screenY} L ${elbowX} ${cardY + 18} L ${cardX + (isLeft ? 200 : 10)} ${cardY + 18}`}
                fill="none"
                stroke={strokeColor}
                strokeWidth="1.2"
                strokeDasharray="4 2"
              />

              {/* Terminal tick */}
              <circle
                cx={elbowX}
                cy={cardY + 18}
                r="2"
                fill={dotColor}
              />
            </g>
          );
        })}
      </svg>

      {/* HTML Technical Label Cards */}
      {labels.map((item) => {
        if (!item.visible || item.opacity < 0.15) return null;

        const isLeft = item.pinSide === 'left';
        const cardX = isLeft ? Math.max(24, item.screenX - 250) : Math.min(window.innerWidth - 260, item.screenX + 170);
        const cardY = Math.max(90, Math.min(window.innerHeight - 130, item.screenY - 24));
        const isActive = activeLayerId === item.id;
        const isOrange = item.id === '03' || item.id === '05';

        return (
          <div
            key={`card-${item.id}`}
            style={{
              transform: `translate3d(${cardX}px, ${cardY}px, 0)`,
              opacity: item.opacity,
              transition: 'opacity 0.25s ease-out',
              willChange: 'transform, opacity'
            }}
            onClick={() => onSelectLayer && onSelectLayer(item)}
            className={`absolute top-0 left-0 pointer-events-auto cursor-pointer group select-none p-3.5 border transition-all duration-300 ${
              isActive
                ? 'bg-[#0D1219]/95 border-[#168CFF] shadow-[0_0_25px_rgba(22,140,255,0.35)]'
                : 'bg-[#0A0D12]/85 border-[#1E2633] hover:border-[#384860] hover:bg-[#0E141D]/95'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className={`text-[9px] font-mono-tech px-1.5 py-0.5 border font-bold ${
                  isOrange
                    ? 'border-[#FF7A18]/60 text-[#FF7A18] bg-[#FF7A18]/10'
                    : 'border-[#168CFF]/60 text-[#168CFF] bg-[#168CFF]/10'
                }`}
              >
                {item.number}
              </span>
              <span className="text-[11px] font-bold tracking-widest uppercase text-[#F5F5F5] font-mono-tech group-hover:text-white">
                {item.name}
              </span>
            </div>
            <p className="text-[10px] text-[#9CA3AF] line-clamp-1 max-w-[210px] font-sans">
              {item.material}
            </p>
            <div className="mt-1.5 flex items-center justify-between text-[9px] text-[#6B7280] font-mono-tech pt-1.5 border-t border-[#161F2B]">
              <span>{item.thickness || item.coverage || item.conductivity || item.ratedVoltage}</span>
              <span className="text-[#168CFF] opacity-0 group-hover:opacity-100 transition-opacity">
                INSPECT →
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
