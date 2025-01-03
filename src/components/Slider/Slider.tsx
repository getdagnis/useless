"use client";
import { useEffect, useState } from "react";

import styles from "./Slider.module.sass";
import { HERO_TITLES, TOP_10_STICKERS } from "@/src/constants";
import { Sticker } from "../Sticker";
import { useSwipeable } from "react-swipeable";
import { isMobile } from "react-device-detect";
import { useDeviceSize } from "react-device-sizes";
import { Button } from "../Button";
import { randomTranslateButton } from "@/src/helpers";

interface SliderProps {}

const swipeableConfig = {
	delta: 10, // min distance(px) before a swipe is detected
	preventDefaultTouchmoveEvent: true,
	trackTouch: true,
	trackMouse: true,
};

const Slider: React.FC<SliderProps> = () => {
	const [activeSlide, setActiveSlide] = useState(7);

	const heroTitles = HERO_TITLES[activeSlide];
	const combinedTitlesArray = [];
	combinedTitlesArray.push(heroTitles.flatMap((title) => title).join(" "));

	const isFirstSlide = activeSlide === 0;
	const isLastSlide = activeSlide === HERO_TITLES.length - 1;

	const stickerLength = TOP_10_STICKERS[activeSlide].text.length;
	const animationDelay = (stickerLength / 12) * 100;
	let fontSize = TOP_10_STICKERS[0].text.length / 27.5 + "rem";

	const deviceSizes = useDeviceSize();
	fontSize = deviceSizes.xsDown ? "1.5rem" : fontSize;

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
							animationDelay: `${animationDelay}ms`,
						}}
					>
						<Sticker text={TOP_10_STICKERS[activeSlide].text} fontSize={fontSize} />
					</div>
				)}

				{/* BUTTONS */}
				{isLastSlide && (
					<div className={`${styles.stickerWrapper} ${styles.buttonWrapper}`}>
						<Button text="Buy Now" onClick={() => handleSlideClick("Down")} />
						<Button
							id="overthinkLater"
							text="Overthink Later"
							onClick={() => handleSlideClick("Down")}
							isSecondary
						/>
					</div>
				)}

				{/* ARROWS */}
				{!isLastSlide && !isMobile && (
					<div className={styles.arrowContainer} onClick={() => handleSlideClick("Right")}></div>
				)}
				{!isFirstSlide && !isMobile && (
					<div className={styles.arrowContainerLeft} onClick={() => handleSlideClick("Left")}></div>
				)}

				{/* PAGINATION */}
				<div className={styles.paginationWrapper}>
					<ul className={styles.pagination}>
						{[...Array(HERO_TITLES.length)].map((_, index) => (
							<li
								key={index}
								className={index === activeSlide ? styles.active : ""}
								onClick={() => setActiveSlide(index)}
							></li>
						))}
					</ul>
				</div>
				<div className={styles.sliderBg}>{TOP_10_STICKERS[activeSlide].text}</div>
			</div>
		</div>
	);
};

export default Slider;
