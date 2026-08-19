import { motion } from 'framer-motion';

const motionTags = {
  section: motion.section,
  footer: motion.footer,
  div: motion.div,
};

const variants = {
  up: {
    hidden: { opacity: 0, y: 56 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, y: 40, scale: 0.94 },
    visible: { opacity: 1, y: 0, scale: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export const ScrollReveal = ({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  as = 'section',
}) => {
  const v = variants[variant] || variants.up;
  const Component = motionTags[as] || motion.section;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18, margin: '0px 0px -60px 0px' }}
      variants={v}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
};

export const ScrollRevealStagger = ({
  children,
  className = '',
  stagger = 0.12,
  as = 'div',
}) => {
  const Component = motionTags[as] || motion.div;

  return (
    <Component
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15, margin: '0px 0px -40px 0px' }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: stagger } },
    }}
  >
    {children}
  </Component>
  );
};

export const ScrollRevealItem = ({ children, className = '' }) => (
  <motion.div
    className={className}
    variants={{
      hidden: { opacity: 0, y: 28 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
      },
    }}
  >
    {children}
  </motion.div>
);

export default ScrollReveal;
