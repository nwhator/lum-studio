import React from 'react';
import { Metadata } from 'next';
import HomeFourMain from '@/pages/homes/home';

export const metadata: Metadata = {
  title: "Lum Studios - Home Four Page",
};

const HomePageFour = () => {
  return (
    <HomeFourMain/>
  );
};

export default HomePageFour;