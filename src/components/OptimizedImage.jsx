const PhotoSkeleton = ({ className = '' }) => (
  <div className={`w-full h-full bg-ostion-oscuro/25 animate-pulse ${className}`} />
);

const OptimizedImage = ({
  src,
  alt = '',
  priority = false,
  className = '',
  style,
  onLoad,
}) => (
  <img
    src={src}
    alt={alt}
    loading={priority ? 'eager' : 'lazy'}
    decoding="async"
    fetchPriority={priority ? 'high' : 'auto'}
    draggable={false}
    className={className}
    style={style}
    onLoad={onLoad}
  />
);

export { OptimizedImage, PhotoSkeleton };
