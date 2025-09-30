'use client';
import React from 'react';

const VideOne = () => {
  
  return (
    <div className="tp-hero-bottom-img-wrap">
      <div className="tp-hero-bottom-img">
        <video loop={true} muted={true} autoPlay={true} playsInline={true}>
          <source src="https://html.hixstudio.net/videos/lum/lum.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default VideOne;