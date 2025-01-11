"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./Menu.module.sass";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { isMobile } from "react-device-detect";

export interface MenuProps {
	isOpen: boolean;
	onClose: () => void;
}

interface MenuItem {
	id: number;
	label: string;
}

const smallExplosion = {
	numberOfPieces: 50,
	recycle: false,
	gravity: 0.2,
	initialVelocityX: 15,
	initialVelocityY: 30,
	friction: 0.95,
	colors: ["#d80019", "white"],
};

const largeExplosion = {
	numberOfPieces: isMobile ? 1000 : 3000,
	recycle: true,
	gravity: 0.2,
	initialVelocityX: 20,
	initialVelocityY: 40,
	friction: 0.95,
	colors: ["#d80019", "white"],
};

const GAME_INITIAL_STATE = {
	rules: false,
	gameStarted: false,
	uselessCount: 30,
	isGameCompleted: false,
	showCongrats: false,
	isLargeExploding: false,
	showRealMenu: false,
};

const GAME_TEST_STATE = {
	rules: false,
	gameStarted: true,
	uselessCount: 5,
	isGameCompleted: false,
	showCongrats: false,
	isLargeExploding: false,
	showRealMenu: false,
	isTestState: false,
};

export function Menu({ isOpen, onClose }: MenuProps) {
	const [clickedId, setClickedId] = useState<number | null>(null);
	const [showRules, setShowRules] = useState<boolean>(
		GAME_TEST_STATE.isTestState ? GAME_TEST_STATE.rules : GAME_INITIAL_STATE.rules
	);
	const [gameStarted, setGameStarted] = useState<boolean>(GAME_TEST_STATE.gameStarted);
	const [uselessCount, setUselessCount] = useState<number>(GAME_TEST_STATE.uselessCount);
	const [isGameCompleted, setIsGameCompleted] = useState<boolean>(GAME_TEST_STATE.isGameCompleted);
	const [showCongrats, setShowCongrats] = useState<boolean>(GAME_TEST_STATE.showCongrats);
	const [isLargeExploding, setIsLargeExploding] = useState<boolean>(
		GAME_TEST_STATE.isLargeExploding
	);
	const [showRealMenu, setShowRealMenu] = useState<boolean>(GAME_TEST_STATE.showRealMenu);
	const [timeSpent, setTimeSpent] = useState<number>(0);

	const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
	const gameTimers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());
	const allHiddenChecked = useRef<boolean>(false);
	const startTimeRef = useRef<number | null>(null);
	const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const { width, height } = useWindowSize();

	const MENU_ITEMS: MenuItem[] = [
		{ id: 0, label: "Shop" },
		{ id: 1, label: "Vote" },
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

	useEffect(() => {
		if (isOpen && !startTimeRef.current) {
			startTimeRef.current = Date.now();
			timerIntervalRef.current = setInterval(() => {
				if (startTimeRef.current) {
					const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
					setTimeSpent(elapsed);
				}
			}, 1000);
		}

		return () => {
			if (timerIntervalRef.current) {
				clearInterval(timerIntervalRef.current);
			}
		};
	}, [isOpen]);

	const startGame = () => {
		setShowRules(false);
		setGameStarted(true);
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
		if (isGameCompleted) return;

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
			if (newCount === 0) {
				setShowCongrats(true);
				setIsLargeExploding(true);
				setGameStarted(false);
				setShowRules(false);
				if (!GAME_TEST_STATE.isTestState) {
					localStorage.setItem("menuGameCompleted", "true");
				}
				setIsGameCompleted(true);
				setTimeout(() => {
					setIsLargeExploding(false);
				}, 6000);
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
		// Initialize state from localStorage on client-side only
		if (!GAME_TEST_STATE.isTestState && typeof window !== "undefined") {
			const menuGameStarted = Boolean(localStorage.getItem("menuGameStarted"));
			const storedCount = Number(localStorage.getItem("uselessCount"));
			const completed = Boolean(localStorage.getItem("menuGameStarted"));

			setGameStarted(menuGameStarted);
			setUselessCount(storedCount || GAME_INITIAL_STATE.uselessCount);
			setIsGameCompleted(completed);
			setShowRealMenu(completed);
		}
	}, []);

	return (
		<div className={`${styles.menu} ${isOpen && styles["is-active"]}`}>
			<ul className={styles.menuList}>
				{!showRealMenu ? (
					<>
						<h6>COMPLETELY</h6>
						<h6>USELESS</h6>
						<h6>MENU</h6>

						{showCongrats && (
							<div className={styles.congratsContainer} onClick={() => setShowCongrats(false)}>
								<Confetti
									width={width}
									height={height}
									run={isLargeExploding}
									{...largeExplosion}
									className={styles.confetti}
								/>
								<h2>Congratulations!</h2>
								<p>
									You just wasted {timeSpent} seconds <br /> of your life by trying to unlock a menu
									on a Useless website!
								</p>
								<div
									className={styles.rulesBtn}
									onClick={() => {
										setShowCongrats(false);
										setShowRealMenu(true);
									}}
								>
									Real Menu
								</div>
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
						{/* PRE-GAME MENU ITEMS & GAME MENU ITEMS */}
						{!showRules && !isGameCompleted && (
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
											{gameStarted && clickedId === item.id ? uselessCount : item.label}
										</div>
									</li>
								))}
							</div>
						)}
						{/* div with useless logo items and count */}
						{!showRules && gameStarted && (
							<div className={styles.uselessDiv}>
								{(uselessCount === 21 || uselessCount === 11) && (
									<Confetti width={width} height={height} run={true} {...smallExplosion} />
								)}
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
					// The "REAL" MEANU with navigation links when game is completed or skipped
					<div className={styles.menuItems}>
						{MENU_ITEMS.map((item) => (
							<li key={item.id} className={styles.realMenuItem}>
								<Link
									href={`/${item.label.toLowerCase()}`}
									className={styles.liInner}
									onClick={(e) => {
										(e.target as HTMLElement).style.scale = "0";
										setTimeout(() => ((e.target as HTMLElement).style.scale = "1"), 200);
										// Clear any remaining game timeouts
										if (timeoutId.current !== null) {
											clearTimeout(timeoutId.current);
										}
										gameTimers.current.forEach((timer) => {
											clearTimeout(timer);
										});
										gameTimers.current.clear();
										onClose();
									}}
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
