import ScrollReveal from './ScrollReveal';
import WaveDivider from './ui/WaveDivider';

const PhotoBanner = ({ src, alt = '', className = '' }) => (
  <ScrollReveal variant="fade" className={`relative w-full ${className}`}>
    <div className="relative w-full aspect-[4/5] max-h-[420px] overflow-hidden">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover vintage-photo-filter wave-fade-bottom"
      />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ostion to-transparent" />
    </div>
    <WaveDivider className="relative -mt-1" />
  </ScrollReveal>
);

export default PhotoBanner;
