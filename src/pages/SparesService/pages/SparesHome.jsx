import React, { useEffect } from 'react';
import AboutHero from '../components/about/AboutHero';
import AboutWorkflow from '../components/about/AboutWorkflow';
import AboutLeadership from '../components/about/AboutLeadership';
import AboutFeatures from '../components/about/AboutFeatures';
import AboutShowcase from '../components/about/AboutShowcase';
import AboutStats from '../components/about/AboutStats';
import AboutCTA from '../components/about/AboutCTA';

function SparesHome() {
  // Scroll to top on mount for premium feel
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-white overflow-x-hidden font-sans">
      <AboutHero />
      <AboutWorkflow />
      <AboutLeadership />
      <AboutFeatures />
      <AboutShowcase />
      <AboutStats />
      <AboutCTA />
    </div>
  );
}

export default SparesHome;
