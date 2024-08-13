import React from 'react';

interface GradientLegendProps {
  minOpacity: number;
  max: number;
  gradient: Record<number, string>;
}

const GradientLegend: React.FC<GradientLegendProps> = ({ minOpacity, max, gradient }) => {
  // Create gradient stops for SVG
  const gradientStops = Object.entries(gradient).map(([offset, color]) => (
    <stop key={offset} offset={parseFloat(offset)} stopColor={color} />
  ));

  return (
    <div style={{ position: 'relative', width: '300px', height: '50px' }}>
      <svg width="100%" height="100%">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            {gradientStops}
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#gradient)"
          style={{ opacity: minOpacity }}
        />
      </svg>
      <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
        <span>0</span>
        <span>{max}</span>
      </div>
    </div>
  );
};

export default GradientLegend;
