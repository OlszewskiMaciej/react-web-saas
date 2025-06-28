import React from 'react';
import HeroSection from '../components/home/HeroSection';
import Features from '../components/home/Features';
import Testimonials from '../components/home/Testimonials';
import CtaSection from '../components/home/CtaSection';
import FadeIn from '../components/common/FadeIn';
import { Box } from '@mui/material';

const Home: React.FC = () => {
  
  return (
    <Box>
      <FadeIn threshold={0.01}>
        <HeroSection />
      </FadeIn>
      
      <FadeIn threshold={0.01} distance={200}>
        <Features />
      </FadeIn>
      
      <FadeIn threshold={0.01} distance={200}>
        <Testimonials />
      </FadeIn>
      
      <FadeIn threshold={0.01} distance={200}>
        <CtaSection />
      </FadeIn>
    </Box>
  );
};

export default Home;
