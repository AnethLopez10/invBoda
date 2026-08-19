const WaxSeal = ({ size = 64, className = '' }) => (
  <div
    className={`relative flex items-center justify-center rounded-full ${className}`}
    style={{ width: size, height: size }}
    aria-hidden="true"
  >
    <div
      className="absolute inset-0 rounded-full"
      style={{
        background: 'radial-gradient(circle at 35% 30%, #E8D5A3, #C9A962 45%, #A8893A 100%)',
        boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.25), 0 4px 12px rgba(0,0,0,0.3)',
      }}
    />
    <span className="relative font-vibes text-olivo-oscuro/80 select-none" style={{ fontSize: size * 0.38 }}>
      MO
    </span>
  </div>
);

export default WaxSeal;
