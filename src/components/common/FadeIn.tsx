import React, { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

interface FadeInProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  threshold?: number;
  distance?: number;
  once?: boolean;
  sx?: SxProps<Theme>;
  [key: string]: any; // to handle other Box props
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.4,
  threshold = 0.01, 
  distance = 16,
  once = true,
  ...boxProps
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          element.style.opacity = '1';
          element.style.transform = 'translate3d(0, 0, 0)';
          
          // Disconnect after animation if once is true
          if (once && observer) {
            observer.disconnect();
          }
        } else if (!once) {
          const element = entry.target as HTMLElement;
          
          // Initial transform based on direction
          let transform = '';
          switch (direction) {
            case 'up':
              transform = `translate3d(0, ${distance}px, 0)`;
              break;
            case 'down':
              transform = `translate3d(0, -${distance}px, 0)`;
              break;
            case 'left':
              transform = `translate3d(${distance}px, 0, 0)`;
              break;
            case 'right':
              transform = `translate3d(-${distance}px, 0, 0)`;
              break;
            case 'none':
              transform = 'translate3d(0, 0, 0)';
              break;
            default:
              transform = `translate3d(0, ${distance}px, 0)`;
          }
          
          element.style.opacity = '0';
          element.style.transform = transform;
        }
      });
    };
    
    const observer = new IntersectionObserver(observerCallback, {
      threshold,
      rootMargin: '100px', // Much larger rootMargin to start loading content before it's visible
    });
    
    if (ref.current) {
      // Initial transform based on direction
      let transform = '';
      switch (direction) {
        case 'up':
          transform = `translate3d(0, ${distance}px, 0)`;
          break;
        case 'down':
          transform = `translate3d(0, -${distance}px, 0)`;
          break;
        case 'left':
          transform = `translate3d(${distance}px, 0, 0)`;
          break;
        case 'right':
          transform = `translate3d(-${distance}px, 0, 0)`;
          break;
        case 'none':
          transform = 'translate3d(0, 0, 0)';
          break;
        default:
          transform = `translate3d(0, ${distance}px, 0)`;
      }
      
      ref.current.style.opacity = '0';
      ref.current.style.transform = transform;
      
      observer.observe(ref.current);
    }
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [direction, distance, once, threshold]);
  
  return (
    <Box
      ref={ref}
      sx={{
        opacity: 0,
        transition: `opacity ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, 
                    transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
      }}
      {...boxProps}
    >
      {children}
    </Box>
  );
};

interface StaggeredFadeInProps {
  children: ReactNode[];
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  baseDelay?: number;
  staggerDelay?: number;
  duration?: number;
  threshold?: number;
  distance?: number;
  sx?: SxProps<Theme>;
  [key: string]: any; // to handle other Box props
}

export const StaggeredFadeIn: React.FC<StaggeredFadeInProps> = ({
  children,
  direction = 'up',
  baseDelay = 0,
  staggerDelay = 0.1,
  duration = 0.6,
  threshold = 0.1,
  distance = 24,
  ...boxProps
}) => {
  return (
    <Box {...boxProps}>
      {React.Children.map(children, (child, index) => (
        <FadeIn
          key={index}
          direction={direction}
          delay={baseDelay + index * staggerDelay}
          duration={duration}
          threshold={threshold}
          distance={distance}
        >
          {child}
        </FadeIn>
      ))}
    </Box>
  );
};

export default FadeIn;
