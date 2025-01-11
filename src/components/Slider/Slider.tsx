"use client";
import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { isMobile } from "react-device-detect";

import styles from "./Slider.module.sass";
import { HERO_TITLES, TOP_10_STICKERS } from "@/src/base/constants";
import { Pagination, Sticker } from "@/src/components";
import UselessButtons from "./UselessButtons";
import { useDeviceSize } from "react-device-sizes";

// Sticker appears after the title is read, based on title length. Delay is in seconds
// I.e. — 6 words * this. Average reading speed is 240 words/min. 60/240 = 0.25s
const STICKER_DELAY_MULTIPLIER = 0.28;
// titles appear one by one, delay is in seconds
const TITLES_ANIMATION_DELAY = 0.3;

const swipeableConfig = {
	delta: 10, // min distance(px) before a swipe is detected
	preventDefaultTouchmoveEvent: true,
	trackTouch: true,
	trackMouse: true,
};

const Slider: React.FC = () => {
	const [activeSlide, setActiveSlide] = useState(0);
	const [isHovered, setIsHovered] = useState(false);
	const [allowHover, setAllowHover] = useState(false);
	const isFirstSlide = activeSlide === 0;
	const isLastSlide = activeSlide === HERO_TITLES.length - 1;

	const heroTitles = HERO_TITLES[activeSlide];
	const combinedTitlesArray = [];
	combinedTitlesArray.push(heroTitles.flatMap((title) => title).join(" "));

	const heroWords = combinedTitlesArray[0].split(" ").length;
	const animationDelay = heroWords * STICKER_DELAY_MULTIPLIER;

	const deviceSizes = useDeviceSize();

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

	const handlers = useSwipeable({
		onSwiping: (eventData) => {
			const sliderText = document.querySelector(`.${styles.sliderText}`);
			const stickerWrapper = document.querySelector(`.${styles.stickerWrapper}`);
			if (!sliderText || !stickerWrapper) return;

			if (
				(eventData.dir === "Left" && !isLastSlide) ||
				(eventData.dir === "Right" && !isFirstSlide)
			) {
				const transform = `translateX(${eventData.deltaX}px)`;
				(sliderText as HTMLElement).style.transform = transform;
				(stickerWrapper as HTMLElement).style.transform = transform;
				(sliderText as HTMLElement).style.transition = "none";
				(stickerWrapper as HTMLElement).style.transition = "none";
			}
		},
		onSwiped: (eventData) => {
			const sliderText = document.querySelector(`.${styles.sliderText}`);
			const stickerWrapper = document.querySelector(`.${styles.stickerWrapper}`);
			if (!sliderText || !stickerWrapper) return;

			(sliderText as HTMLElement).style.transform = "";
			(stickerWrapper as HTMLElement).style.transform = "";
			(sliderText as HTMLElement).style.transition = "transform 0.3s ease";
			(stickerWrapper as HTMLElement).style.transition = "transform 0.3s ease";

			if (eventData.dir === "Right" && !isFirstSlide) {
				handleSlideClick("Left");
			}
			if (eventData.dir === "Left" && !isLastSlide) {
				handleSlideClick("Right");
			}
		},
		...swipeableConfig,
	});

	// Move to the next or previous slide
	const handleSlideClick = (side: string) => {
		if (side === "Right" && !isLastSlide) {
			setActiveSlide((prevSlide) => (prevSlide + 1 + HERO_TITLES.length) % HERO_TITLES.length);
		}
		if (side === "Left" && !isFirstSlide) {
			setActiveSlide((prevSlide) => (prevSlide - 1 + HERO_TITLES.length) % HERO_TITLES.length);
		}
		return;
	};

	// Zoom in sticker on hover
	const handleHover = (hovered: boolean, e?: React.MouseEvent) => {
		if (hovered && allowHover) {
			setIsHovered(true);
			return;
		}
		setIsHovered(false);
	};

	// Delay possibility to unintentionally zoom in sticker on its initial entering
	useEffect(() => {
		setAllowHover(false);
		const timer = setTimeout(() => {
			setAllowHover(true);
		}, animationDelay * 1000 + 500);
		return () => clearTimeout(timer);
	}, [activeSlide, animationDelay]);

	return (
		<div className={styles.container}>
			<div className={styles.slider} {...handlers}>
				{/* HERO TITLES */}
				<div className={styles.sliderText}>
					<div className={styles.titlesToBottom}>
						{!deviceSizes.xsDown &&
							HERO_TITLES[activeSlide].map((title, index) => (
								<h1
									key={`${activeSlide}-${index}`}
									style={{
										animationDelay: `${index * TITLES_ANIMATION_DELAY}s`,
									}}
								>
									{title}
								</h1>
							))}

						{isMobile && deviceSizes.xsDown && (
							<h1
								key={activeSlide}
								style={{
									animationDelay: `0.4ms`,
								}}
							>
								{combinedTitlesArray}
							</h1>
						)}
					</div>
				</div>

				{/* STICKER */}
				{!isLastSlide && (
					<div
						key={activeSlide}
						className={`${styles.stickerWrapper} ${isHovered && styles.stickerHovered}`}
						style={{
							animationDelay: `${animationDelay}s`,
						}}
						onMouseEnter={() => handleHover(true)}
						onMouseLeave={() => handleHover(false)}
						onClick={() => setIsHovered(!isHovered)}
					>
						<Sticker text={TOP_10_STICKERS[activeSlide].text} isHovered={isHovered} />
					</div>
				)}

				{/* BUTTONS */}
				{/* TODO: Logic for the real buttons to appear: every click adds another 5 seconds
				to waiting time, every mouse enter as well. Mouse getting close to screen edges — depletes
				time. Test how long is normal to play with them (ie, 5 times each button), for max time */}
				{isLastSlide && (
					<div className={styles.buttonWrapperWrapper}>
						<UselessButtons onClick={() => handleSlideClick("Down")} />
					</div>
				)}

				{/* ARROWS */}
				{!isLastSlide && !isMobile && (
					<div
						className={styles.arrowContainer}
						style={{
							animationDelay: `${animationDelay + 1}s`,
						}}
						onClick={() => handleSlideClick("Right")}
					></div>
				)}
				{!isFirstSlide && !isMobile && (
					<div
						className={styles.arrowContainerLeft}
						style={{
							animationDelay: `${animationDelay + 1}s`,
						}}
						onClick={() => handleSlideClick("Left")}
					></div>
				)}
				<div className={styles.paginationWrapper}>
					<Pagination
						countOfPages={HERO_TITLES.length}
						activePage={activeSlide}
						onClick={(index) => setActiveSlide(index)}
					/>
				</div>
				<div key={"bg-" + activeSlide} className={styles.sliderBg}>
					{TOP_10_STICKERS[activeSlide].text}
				</div>
			</div>
		</div>
	);
};

export default Slider;
