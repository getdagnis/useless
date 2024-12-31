'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleHamburgerClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <Image
        className={styles.logo}
        src="/logo-white.svg"
        alt="Completely Useless Stickers"
        width={370}
        height={184}
        priority
      />

      <div
        className={`${styles.hamburger} ${styles['hamburger--collapser']} ${isMenuOpen && styles['is-active']}`}
        onClick={() => handleHamburgerClick()}
      >
        <span className={styles['hamburger-box']}>
          <span className={styles['hamburger-inner']}></span>
        </span>
      </div>
      <div className={`${styles.menu} ${isMenuOpen && styles['is-active']}`}>
        <ul>
          <li onClick={() => setIsMenuOpen(!isMenuOpen)}>Vote</li>
          <li onClick={() => setIsMenuOpen(!isMenuOpen)}>Support</li>
          <li onClick={() => setIsMenuOpen(!isMenuOpen)}>About</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
