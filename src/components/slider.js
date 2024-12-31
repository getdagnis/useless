'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './slider.module.css';
import { heroTitles } from '../constants/constants';

const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleNextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide + 1) % heroTitles.length);
  };

  return (
    <div className={styles.slider}>
      {heroTitles[activeSlide].map((title, index) => (
        <h1 key={index} style={{ animationDelay: `${(index + 1) * 300}ms` }}>
          {title}
        </h1>
      ))}
      <div className={styles.arrowContainer} onClick={handleNextSlide}></div>
      {activeSlide !== 0 && <div className={styles.arrowContainerLeft} onClick={handleNextSlide}></div>}
      <ul className={styles.pagination}>
        {[...Array(heroTitles.length)].map((_, index) => (
          <li key={index}></li>
        ))}
      </ul>
    </div>
  );
};

export default Slider;
