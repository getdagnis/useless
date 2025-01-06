"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Header.module.sass";

interface Props {}

const Header = (props: Props) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleHamburgerClick = (slow?: string) => {
		if (slow === "slow") {
			setTimeout(() => {
				setIsMenuOpen(!isMenuOpen);
			}, 4000);
			return;
		}
		setIsMenuOpen(!isMenuOpen);
	};

	console.log("🏜💀👾 isMenuOpen", isMenuOpen);

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
					<h6>COMPLETELY</h6>
					<h6>USELESS</h6>
					<h6>MENU</h6>
					<li onClick={() => handleHamburgerClick("slow")}>Shop</li>
					<li onClick={() => handleHamburgerClick("slow")}>Vote</li>
					<li onClick={() => handleHamburgerClick("slow")}>Suggest</li>
					<li onClick={() => handleHamburgerClick("slow")}>Publish</li>
					<li onClick={() => handleHamburgerClick("slow")}>Gallery</li>
					{/* TODO: ends with Useless Space Progam: https://useless.space |
						"We are too excited about this to even begin listing possibilities" */}
					<li onClick={() => handleHamburgerClick("slow")}>Roadmap</li>
					<li onClick={() => handleHamburgerClick("slow")}>About</li>
					{/* TODO: FAQ such as https://codeium.com/faq but useless, i.e.:
					// what is the meaning of life? 42. what is the meaning of the universe? 42
					// what is the meaning of everything? 42. what is the meaning of nothing? 42. */}
					<li onClick={() => handleHamburgerClick("slow")}>FAQ</li>{" "}
				</ul>
			</div>
		</header>
	);
};

export default Header;
