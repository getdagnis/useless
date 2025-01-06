"use client";
import { useState } from "react";
import Image from "next/image";

import { Menu } from "@/src/components/Menu";
import styles from "./Header.module.sass";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleHamburgerClick = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className={styles.header}>
			<div className={styles.logoContainer}>
				<Image
					className={styles.logo}
					src="/logo-white.svg"
					width={370}
					height={184}
					alt="Completely Useless Stickers"
					priority
				/>
			</div>
			<Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
			<div
				className={`${styles.hamburger} ${styles["hamburger--collapser"]} ${
					isMenuOpen && styles["is-active"]
				}`}
				onClick={handleHamburgerClick}
			>
				<span className={styles["hamburger-box"]}>
					<span className={styles["hamburger-inner"]}></span>
				</span>
			</div>
		</header>
	);
};

export default Header;
