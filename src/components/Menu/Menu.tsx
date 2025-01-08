"use client";
import { JSX, useEffect, useRef, useState } from "react";

import styles from "./Menu.module.sass";

export interface MenuProps {
	isOpen: boolean;
	onClose: () => void;
}

export function Menu({ isOpen, onClose }: MenuProps): JSX.Element {
	const [showRules, setShowRules] = useState(false);
	const [gameStarted, setGameStarted] = useState(false);
	const [uselessCount, setUselessCount] = useState(42);
	const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
	const gameTimers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());
	const allHiddenChecked = useRef(false);
	const [clickedId, setClickedId] = useState<number | null>(null);

	const MENU_ITEMS = [
		{ id: 0, label: "Shop" },
		{ id: 1, label: "Vote" },
		{ id: 2, label: "Suggest" },
		{ id: 3, label: "Publish" },
		{ id: 4, label: "Gallery" },
		{ id: 5, label: "Roadmap" },
		{ id: 6, label: "About" },
		{ id: 7, label: "FAQ" },
	];

	const checkAllItemsHidden = () => {
		if (allHiddenChecked.current) return; // Only check once

		const menuItems = document.querySelectorAll(`[data-menu-index]`);
		const allHidden = Array.from(menuItems).every(
			(item) => (item as HTMLElement).style.scale === "0"
		);

		if (allHidden) {
			allHiddenChecked.current = true;
			setShowRules(true);
		}
	};

	const startGame = () => {
		setGameStarted(true);
		setShowRules(false);
		// Start the game for all menu items
		for (let i = 0; i < 8; i++) {
			uselessMenuGame(i);
		}
	};

	const uselessMenuGame = (index: number) => {
		if (gameTimers.current.has(index)) {
			clearTimeout(gameTimers.current.get(index));
			gameTimers.current.delete(index);
		}

		// Hide the item immediately using style
		const menuItem = document.querySelector(`[data-menu-index="${index}"]`);
		if (menuItem) {
			(menuItem as HTMLElement).style.scale = "0";
		}

		// Check if all items are hidden after each hide operation
		setTimeout(() => checkAllItemsHidden(), 0);

		const randomTime = Math.random() * 5000 + 3000;

		const timer = setTimeout(() => {
			if (gameStarted) {
				// Only show items if game has started
				const menuItem = document.querySelector(`[data-menu-index="${index}"]`);
				if (menuItem) {
					(menuItem as HTMLElement).style.scale = "1";
				}

				// After item appears, start a new game cycle after 1 second
				setTimeout(() => {
					const menuItem = document.querySelector(`[data-menu-index="${index}"]`);
					if (menuItem) {
						(menuItem as HTMLElement).style.scale = "0";
					}
					uselessMenuGame(index); // Start a new cycle
				}, 1000);
			}
		}, randomTime);

		gameTimers.current.set(index, timer);
	};

	const handleMenuItemClick = (index: number) => {
		setClickedId(index);
		// Remove animation class after animation completes
		setTimeout(() => setClickedId(null), 300);

		if (gameStarted) {
			if (timeoutId.current !== null) {
				clearTimeout(timeoutId.current);
			}
			setUselessCount(uselessCount - 1);
			uselessMenuGame(index);

			timeoutId.current = setTimeout(() => {
				onClose();
				if (timeoutId.current !== null) {
					clearTimeout(timeoutId.current);
				}
			}, 3000);
		} else {
			uselessMenuGame(index);
		}
	};

	useEffect(() => {
		return () => {
			if (timeoutId.current !== null) {
				clearTimeout(timeoutId.current);
			}
			gameTimers.current.forEach((timer) => {
				clearTimeout(timer);
			});
			gameTimers.current.clear();
		};
	}, []);

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
			<ul className={styles.menuList}>
				<>
					<h6>COMPLETELY</h6>
					<h6>USELESS</h6>
					<h6>MENU</h6>
				</>
				{showRules && !gameStarted && (
					<div className={styles.rulesContainer}>
						<>
							This menu is Useless. Force it to work by removing all of the Uselessness below!
							<div className={styles.rulesBtn} onClick={startGame}>
								Start
							</div>
						</>
					</div>
				)}
				{!showRules && (
					<div className={styles.menuItems}>
						{MENU_ITEMS.map((item) => (
							<li key={item.id}>
								<div
									data-menu-index={item.id}
									className={`${styles.liInner} ${clickedId === item.id ? styles.clicked : ""}`}
									onClick={() => handleMenuItemClick(item.id)}
								>
									{item.label}
								</div>
							</li>
						))}
					</div>
				)}
				{(showRules || gameStarted) && (
					<div className={styles.uselessDiv}>
						<h2 className={styles.uselessCount}>{uselessCount}</h2>
						<ul className={styles.uselessList}>
							{[...Array(uselessCount)].map((_, i) => (
								<li key={i} className={styles.uselessItem}></li>
							))}
						</ul>
					</div>
				)}
			</ul>
		</div>
	);
}
