"use client";
import { useEffect, useState } from "react";
import styles from "./slider.module.sass";
import { HERO_TITLES, TOP_10_STICKERS, STICKERS } from "../constants";
import { getSticker } from "../helpers";

const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (activeSlide === HERO_TITLES.length) {
      alert("You have reached the end of the slider.");
    }

    return;
  }, [activeSlide]);

  const handlePrevSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide - 1 + HERO_TITLES.length) % HERO_TITLES.length);
  };

  const handleNextSlide = () => {
    console.log("🍌🥕 HERO_TITLES.length", HERO_TITLES.length);
    console.log("🍌🥕 activeSlide", activeSlide);

    setActiveSlide((prevSlide) => (prevSlide + 1) % HERO_TITLES.length);
  };

  const getFontSize = (id) => {
    const sticker = getSticker(STICKERS, id);
    const length = sticker.text.length;
    sticker["length"] = length;
    console.log("🍌🥕 sticker", sticker);

    if (length > 64) {
      return `1.8rem`;
    }

    if (length > 58) {
      return `1.9rem`;
    }

    console.log("🍌🥕 sticker", sticker);
  };

  useEffect(() => {
    addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight" || event.key === "Enter" || event.key === " ") {
        handleNextSlide();
      }

      if (event.key === "ArrowLeft") {
        handlePrevSlide();
      }

      return;
    });
  }, []);
  console.log("🍌🥕 activeSlide", activeSlide);

  return (
    <div className={styles.slider}>
      <div className={styles.sliderText}>
        {HERO_TITLES[activeSlide].map((title, index) => (
          <h1 key={`${activeSlide}-${index}`} style={{ animationDelay: `${index * 400}ms` }}>
            {title}
          </h1>
        ))}
      </div>
      {activeSlide !== HERO_TITLES.length - 1 && (
        <div className={styles.sticker} style={{ fontSize: getFontSize("mvay") }}>
          {TOP_10_STICKERS[activeSlide].text}
        </div>
      )}

      {activeSlide === HERO_TITLES.length - 1 && (
        <div className={styles.buttonWrapper}>
          <div className={styles.button}>Buy Now</div>
          <div className={styles.button}>Overthink Later</div>
        </div>
      )}

      {activeSlide !== HERO_TITLES.length - 1 && (
        <div className={styles.arrowContainer} onClick={handleNextSlide}></div>
      )}

      {activeSlide !== 0 && (
        <div className={styles.arrowContainerLeft} onClick={handlePrevSlide}></div>
      )}

      <ul className={styles.pagination}>
        {[...Array(HERO_TITLES.length)].map((_, index) => (
          <li
            key={index}
            className={index === activeSlide ? styles.active : ""}
            onClick={() => setActiveSlide(index)}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default Slider;
