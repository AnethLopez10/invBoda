const WaveDivider = ({ flip = false, className = '' }) => (
  <svg
    viewBox="0 0 1440 80"
    preserveAspectRatio="none"
    className={`w-full h-12 md:h-16 block ${flip ? 'rotate-180' : ''} ${className}`}
    aria-hidden="true"
  >
    <path
      d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
      fill="#F5F0E8"
    />
  </svg>
);

export default WaveDivider;
