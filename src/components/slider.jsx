'use client';
import { use, useEffect, useRef, useState } from 'react';
import styles from './slider.module.css';
import { heroTitles } from '../constants';

const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (activeSlide === heroTitles.length) {
      alert('You have reached the end of the slider.');
    }

    return;
  }, [activeSlide]);

  const handlePrevSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide - 1 + heroTitles.length) % heroTitles.length);
  };

  useEffect(() => {
    addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight' || event.key === 'Enter' || event.key === ' ') {
        handleNextSlide();
      }

      if (event.key === 'ArrowLeft') {
        handlePrevSlide();
      }

      return;
    });
  }, []);

  return (
    <div className={styles.slider}>
      {heroTitles[activeSlide].map((title, index) => (
        <h1 key={`${activeSlide}-${index}`} style={{ animationDelay: `${index * 400}ms` }}>
          {title}
        </h1>
      ))}
      <div
        className={styles.arrowContainer}
        onClick={() => setActiveSlide((prevSlide) => (prevSlide + 1) % heroTitles.length)}
      ></div>
      {activeSlide !== 0 && <div className={styles.arrowContainerLeft} onClick={handlePrevSlide}></div>}
      <ul className={styles.pagination}>
        {[...Array(heroTitles.length)].map((_, index) => (
          <li
            key={index}
            className={index === activeSlide ? styles.active : ''}
            onClick={() => setActiveSlide(index)}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default Slider;
