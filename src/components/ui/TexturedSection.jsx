const TEXTURES = {
  fondo1: '/images/fondos/fondo1.jpeg',
  fondo2: '/images/fondos/fondo2.jpeg',
  fondo3: '/images/fondos/fondo3.jpeg',
  fondo4: '/images/fondos/fondo4.jpeg',
};

const TexturedSection = ({
  texture = 'fondo1',
  overlay = 0.78,
  className = '',
  children,
}) => (
  <div className={`relative overflow-hidden ${className}`}>
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${TEXTURES[texture]})` }}
      aria-hidden="true"
    />
    <div
      className="absolute inset-0 bg-ostion"
      style={{ opacity: overlay }}
      aria-hidden="true"
    />
    <div className="relative z-10">{children}</div>
  </div>
);

export default TexturedSection;
