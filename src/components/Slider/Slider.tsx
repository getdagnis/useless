"use client";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { isMobile } from "react-device-detect";
import { useDeviceSize } from "react-device-sizes";

import styles from "./Slider.module.sass";
import { HERO_TITLES, TOP_10_STICKERS } from "@/src/base/constants";
import { Button, Pagination, Sticker } from "@/src/components";

interface SliderProps {}

// Dynamic font size for longer stickers (so all fit within two lines at least on desktop)
const DYNAMIC_FONT_SIZE_DIVIDER = 31;
// Sticker appears after the title is read, based on title length. Delay is in seconds
// I.e. — 6 words * this. Average reading speed is 240 words/min. 60/240 = 0.25s
const STICKER_DELAY_MULTIPLIER = 0.25;

const swipeableConfig = {
	delta: 10, // min distance(px) before a swipe is detected
	preventDefaultTouchmoveEvent: true,
	trackTouch: true,
	trackMouse: true,
};

const Slider: React.FC<SliderProps> = () => {
	const [activeSlide, setActiveSlide] = useState(0);
	const isFirstSlide = activeSlide === 0;
	const isLastSlide = activeSlide === HERO_TITLES.length - 1;

	const heroTitles = HERO_TITLES[activeSlide];
	const combinedTitlesArray = [];
	combinedTitlesArray.push(heroTitles.flatMap((title) => title).join(" "));

	const heroWords = combinedTitlesArray[0].split(" ").length;
	const animationDelay = heroWords * STICKER_DELAY_MULTIPLIER;

	let fontSize = TOP_10_STICKERS[0].text.length / DYNAMIC_FONT_SIZE_DIVIDER + "rem";
	const deviceSizes = useDeviceSize();
	// Font size for small mobile devices
	fontSize = deviceSizes.xsDown ? "1.5rem" : fontSize;

	// Allows arrow navigation between slides
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowRight" || event.key === "Enter" || event.key === " ") {
				handleSlideClick("Right");
			}
			if (event.key === "ArrowLeft") {
				handleSlideClick("Left");
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	// Allows swipe navigation between slides both on mobile and desktop
	const handlers = useSwipeable({
		onSwiped: (eventData) => {
			eventData.dir === "Right" && !isFirstSlide && handleSlideClick("Left");
			eventData.dir === "Left" && !isLastSlide && handleSlideClick("Right");
		},
		...swipeableConfig,
	});

	const handleSlideClick = (side: string) => {
		if (side === "Right" && !isLastSlide) {
			setActiveSlide((prevSlide) => (prevSlide + 1 + HERO_TITLES.length) % HERO_TITLES.length);
		}
		if (side === "Left" && !isFirstSlide) {
			setActiveSlide((prevSlide) => (prevSlide - 1 + HERO_TITLES.length) % HERO_TITLES.length);
		}
		return;
	};

	console.log("💀🏜 activeSlide", activeSlide);

	return (
		<div className={styles.container}>
			<div className={styles.slider} {...handlers}>
				{/* HERO TITLES */}
				<div className={styles.sliderText}>
					{!deviceSizes.xsDown &&
						HERO_TITLES[activeSlide].map((title, index) => (
							<h1
								key={`${activeSlide}-${index}`}
								style={{
									animationDelay: `${index * 400}ms`,
									fontSize: fontSize,
								}}
							>
								{title}
							</h1>
						))}

					{isMobile && deviceSizes.xsDown && (
						<h1
							style={{
								animationDelay: `0.4ms`,
								fontSize: fontSize,
							}}
						>
							{combinedTitlesArray}
						</h1>
					)}
				</div>

				{/* STICKER */}
				{!isLastSlide && (
					<div
						key={activeSlide}
						className={styles.stickerWrapper}
						style={{
							animationDelay: `${animationDelay}s`,
						}}
					>
						<Sticker text={TOP_10_STICKERS[activeSlide].text} fontSize={fontSize} />
					</div>
				)}
				{/* TODO: Logic for the real buttons to appear: every click adds another 5 seconds
				to waiting time, every mouse enter as well. Mouse getting close to screen edges — depletes
				time. Test how long is normal to play with them (ie, 5 times each button), for max time */}
				{/* BUTTONS */}
				{isLastSlide && (
					<div className={styles.buttonWrapperWrapper}>
						<h6>COMPLETELY USELESS BUTTONS</h6>
						<div className={styles.buttonWrapper}>
							<Button text="Buy Now" onClick={() => handleSlideClick("Down")} />
							<Button
								id="overthinkLater"
								text="Overthink Later"
								onClick={() => handleSlideClick("Down")}
								isSecondary
							/>
						</div>
					</div>
				)}

				{/* ARROWS */}
				{!isLastSlide && !isMobile && (
					<div className={styles.arrowContainer} onClick={() => handleSlideClick("Right")}></div>
				)}
				{!isFirstSlide && !isMobile && (
					<div className={styles.arrowContainerLeft} onClick={() => handleSlideClick("Left")}></div>
				)}
				<div className={styles.paginationWrapper}>
					{" "}
					<Pagination
						countOfPages={HERO_TITLES.length}
						activePage={activeSlide}
						onClick={() => handleSlideClick("")}
					/>
				</div>
				<div className={styles.sliderBg}>{TOP_10_STICKERS[activeSlide].text}</div>
			</div>
		</div>
	);
};

export default Slider;
