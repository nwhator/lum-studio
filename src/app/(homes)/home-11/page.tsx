import React from 'react';
import { Metadata } from 'next';
import HomeElevenMain from '@/pages/homes/home-11';

export const metadata: Metadata = {
  title: "Lum Studios - Home Eleven Page",
};

const HomeElevenPage = () => {
  return (
    <HomeElevenMain/>
  );
};

export default HomeElevenPage;