const SatinBackground = ({ className = '', children }) => (
  <div className={`satin-bg relative ${className}`}>
    <div className="absolute inset-0 paper-grain opacity-30 pointer-events-none" />
    {children}
  </div>
);

export default SatinBackground;
