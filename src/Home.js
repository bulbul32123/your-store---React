import React, { useContext } from 'react';
import HeroSection from './components/HeroSection'
import Trusted from './components/Trusted';
import Services from './components/Service';
import FeatureProduct from './components/FeatureProduct';

export default function Home() {
  return (
    <>
      <HeroSection title='Your Store' />
      <FeatureProduct />
      <Services />
      <Trusted />
    </>
  )
}
