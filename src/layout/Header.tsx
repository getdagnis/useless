"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Header.module.sass";

interface Props {}

const Header = (props: Props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const handleHamburgerClick = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener("keydown", handleEscapeKey);

		return () => {
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, [isMenuOpen]);

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

			<div
				className={`${styles.hamburger} ${styles["hamburger--collapser"]} ${
					isMenuOpen && styles["is-active"]
				}`}
				onClick={() => handleHamburgerClick()}
			>
				<span className={styles["hamburger-box"]}>
					<span className={styles["hamburger-inner"]}></span>
				</span>
			</div>
			<div className={`${styles.menu} ${isMenuOpen && styles["is-active"]}`}>
				<ul>
					<li onClick={() => setIsMenuOpen(!isMenuOpen)}>Don't Buy!</li>
					<li onClick={() => setIsMenuOpen(!isMenuOpen)}>Vote</li>
					<li onClick={() => setIsMenuOpen(!isMenuOpen)}>Suggest New</li>
					<li onClick={() => setIsMenuOpen(!isMenuOpen)}>About</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;
