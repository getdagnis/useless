"use client";
import { useEffect, useRef } from "react";

import styles from "./Menu.module.sass";

export interface MenuProps {
	isOpen: boolean;
	onClose: () => void;
}

export function Menu({ isOpen, onClose }: MenuProps) {
	const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleMenuItemClick = () => {
		if (timeoutId.current !== null) {
			clearTimeout(timeoutId.current);
		}
		timeoutId.current = setTimeout(() => {
			onClose();
			if (timeoutId.current !== null) {
				clearTimeout(timeoutId.current);
			}
		}, 3000);
	};

	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		document.addEventListener("keydown", handleEscapeKey);
		return () => {
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, [onClose]);

	return (
		<div className={`${styles.menu} ${isOpen && styles["is-active"]}`}>
			<ul>
				<h6>COMPLETELY</h6>
				<h6>USELESS</h6>
				<h6>MENU</h6>
				<li onClick={handleMenuItemClick}>
					<div className={styles.liInner}>Shop</div>
				</li>
				<li onClick={handleMenuItemClick}>
					<div className={styles.liInner}>Vote</div>
				</li>
				<li onClick={handleMenuItemClick}>
					<div className={styles.liInner}>Suggest</div>
				</li>
				<li onClick={handleMenuItemClick}>
					<div className={styles.liInner}>Publish</div>
				</li>
				<li onClick={handleMenuItemClick}>
					<div className={styles.liInner}>Gallery</div>
				</li>
				<li onClick={handleMenuItemClick}>
					<div className={styles.liInner}>Roadmap</div>
				</li>
				<li onClick={handleMenuItemClick}>
					<div className={styles.liInner}>About</div>
				</li>
				<li onClick={handleMenuItemClick}>
					<div className={styles.liInner}>FAQ</div>
				</li>
			</ul>
		</div>
	);
}
