"use client";
import { JSX, useEffect, useRef, useState } from "react";
import Link from "next/link";

import styles from "./Menu.module.sass";
import router from "next/router";

export interface MenuProps {
	isOpen: boolean;
	onClose: () => void;
}

export function Menu({ isOpen, onClose }: MenuProps): JSX.Element {
	const [showRules, setShowRules] = useState(false);
	const [gameStarted, setGameStarted] = useState(false);
	const [uselessCount, setUselessCount] = useState(42);
	const [clickedId, setClickedId] = useState<number | null>(null);
	const [showCongrats, setShowCongrats] = useState(false);
	const [isGameCompleted, setIsGameCompleted] = useState(false);

	const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
	const gameTimers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());
	const allHiddenChecked = useRef(false);

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
			setTimeout(() => setShowRules(true), 500); // Add a small delay before showing rules
		}
	};

	useEffect(() => {
		if (isOpen) {
			allHiddenChecked.current = false; // Reset the check when menu opens
			// Hide all items and start the initial hiding cycle
			MENU_ITEMS.forEach((item) => {
				uselessMenuGame(item.id);
			});
		}
	}, []);

	const startGame = () => {
		setShowRules(false);
		setGameStarted(true);

		// No need to do anything else here since items are already in the game cycle
		// and gameStarted state will allow them to start appearing
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

		// Add delay before checking if all items are hidden
		setTimeout(() => checkAllItemsHidden(), 100); // Changed from 0 to 100ms

		const randomTime = Math.random() * 5000 + 3000;

		const timer = setTimeout(() => {
			if (gameStarted) {
				// This condition ensures items only appear after game starts
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
		if (isGameCompleted) return; // Skip game logic if completed

		setClickedId(index);
		setTimeout(() => setClickedId(null), 300);

		if (gameStarted) {
			if (timeoutId.current !== null) {
				clearTimeout(timeoutId.current);
			}
			const newCount = uselessCount - 1;
			setUselessCount(newCount);
			uselessMenuGame(index);

			// Show congrats when game is finished
			if (newCount <= 1) {
				setShowCongrats(true);
				localStorage.setItem("menuGameCompleted", "true");
				setIsGameCompleted(true);
				timeoutId.current = setTimeout(() => {
					onClose();
					if (timeoutId.current !== null) {
						clearTimeout(timeoutId.current);
					}
				}, 3000);
			}
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

	useEffect(() => {
		const completed = localStorage.getItem("menuGameCompleted") === "true";
		setIsGameCompleted(completed);
	}, []);

	return (
		<div className={`${styles.menu} ${isOpen && styles["is-active"]}`}>
			<ul className={styles.menuList}>
				{!isGameCompleted ? (
					<>
						<h6>COMPLETELY</h6>
						<h6>USELESS</h6>
						<h6>MENU</h6>

						{showCongrats && (
							<div className={styles.congratsContainer}>
								<h2>Congratulations!</h2>
								<p>You've unlocked the real menu!</p>
							</div>
						)}

						{showRules && !gameStarted && (
							<div className={styles.rulesContainer}>
								<>
									<div>This menu is Useless.</div>
									<div>Force it to work by removing all of the Uselessness below!</div>
									<div>Every time you click a menu item, one Useless logo will disappear.</div>
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
											className={`${styles.liInner} ${
												clickedId === item.id && gameStarted ? styles.clicked : ""
											}`}
											onClick={() => handleMenuItemClick(item.id)}
										>
											{item.label}
											{gameStarted && clickedId === item.id && (
												<div className={styles.countAbove}>{uselessCount}</div>
											)}
										</div>
									</li>
								))}
							</div>
						)}
						{!showRules && gameStarted && (
							<div className={styles.uselessDiv}>
								<h2 className={styles.uselessCount}>
									<span className={`${clickedId !== null && gameStarted ? styles.clicked : ""}`}>
										{uselessCount}
									</span>{" "}
									items left
								</h2>
								<ul className={styles.uselessList}>
									{[...Array(uselessCount)].map((_, i) => (
										<li
											key={i}
											className={styles.uselessItem}
											style={{ animationDelay: `${0.5 + 0.1 * i}s` }}
										></li>
									))}
								</ul>
							</div>
						)}
					</>
				) : (
					// The real menu with navigation links
					<div className={styles.menuItems}>
						{MENU_ITEMS.map((item) => (
							<li key={item.id}>
								<Link
									href={`/${item.label.toLowerCase()}`}
									className={styles.liInner}
									onClick={onClose}
								>
									{item.label}
								</Link>
							</li>
						))}
					</div>
				)}
			</ul>
		</div>
	);
}
