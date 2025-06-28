import React from 'react';
import PricingCards from '../components/pricing/PricingCards';
import CompanyLogos from '../components/pricing/CompanyLogos';
import StatsSection from '../components/pricing/StatsSection';
import FAQ from '../components/pricing/FAQ';
import FadeIn from '../components/common/FadeIn';
import { Box } from '@mui/material';

const Pricing: React.FC = () => {
  return (
    <Box>
      <FadeIn>
        <PricingCards />
      </FadeIn>
      
      <FadeIn threshold={0.2} delay={0.1}>
        <CompanyLogos />
      </FadeIn>
      
      <FadeIn threshold={0.2} delay={0.1}>
        <StatsSection />
      </FadeIn>
      
      <FadeIn threshold={0.2} delay={0.1}>
        <FAQ />
      </FadeIn>
    </Box>
  );
};

export default Pricing;
