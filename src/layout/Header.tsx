"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

import { Menu } from "@/src/components/Menu";
import styles from "./Header.module.sass";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleHamburgerClick = (slow: string) => {
		if (slow === "slow") {
			setTimeout(() => {
				setIsMenuOpen(!isMenuOpen);
			}, 4000);
			return;
		}
		setIsMenuOpen(!isMenuOpen);
	};

	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsMenuOpen(false);
			}
		};

		const handleClickOutside = (event: MouseEvent) => {
			if (event.target instanceof HTMLElement && !event.target.closest(`.${styles.menu}`)) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener("keydown", handleEscapeKey);
		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("keydown", handleEscapeKey);
			document.removeEventListener("click", handleClickOutside);
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
			<Menu isMenuOpen={isMenuOpen} onClick={() => handleHamburgerClick("slow")} />
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
		</header>
	);
};

export default Header;
