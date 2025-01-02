"use client";
import { useEffect, useState } from "react";
import styles from "./Slider.module.sass";
import { HERO_TITLES, TOP_10_STICKERS } from "@/src/constants";
import { getFontSize } from "@/src/helpers";
import { Sticker } from "../Sticker";
import { useSwipeable } from "react-swipeable";
import { isMobile } from "react-device-detect";
import { get } from "http";

interface SliderProps {}

const config = {
	delta: 10, // min distance(px) before a swipe is detected
	preventDefaultTouchmoveEvent: true,
	trackTouch: true,
	trackMouse: true,
};

const Slider: React.FC<SliderProps> = () => {
	const [activeSlide, setActiveSlide] = useState(0);
	const [swipeDir, setSwipeDir] = useState(null);

	const isFirstSlide = activeSlide === 0;
	const isLastSlide = activeSlide === HERO_TITLES.length - 1;
	const isFirstLastSlide = isFirstSlide || isLastSlide;

	const combinedTitles = HERO_TITLES[activeSlide].flatMap((title) => title).join(" ");

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "ArrowRight" || event.key === "Enter" || event.key === " ") {
				handleNextSlide();
			}

			if (event.key === "ArrowLeft") {
				handlePrevSlide();
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	useEffect(() => {
		if (swipeDir === "Right") {
			handleNextSlide();
		} else if (swipeDir === "Left") {
			handlePrevSlide();
		}
	}, [swipeDir]);

	const handlers = useSwipeable({
		onSwiped: (eventData) => {
			eventData.dir === "Right" && !isFirstSlide && handlePrevSlide();
			eventData.dir === "Left" && !isLastSlide && handleNextSlide();
		},
		...config,
	});

	useEffect(() => {
		if (activeSlide === HERO_TITLES.length) {
			alert("You have reached the end of the slider.");
		}
	}, [activeSlide]);

	const handleNextSlide = () => {
		setActiveSlide((prevSlide) => (prevSlide + 1 + HERO_TITLES.length) % HERO_TITLES.length);
	};

	const handlePrevSlide = () => {
		setActiveSlide((prevSlide) => (prevSlide - 1 + HERO_TITLES.length) % HERO_TITLES.length);
	};

	const fontSize = getFontSize(HERO_TITLES[0].length);

	return (
		<div className={styles.container}>
			<div className={styles.slider} {...handlers}>
				{/* HERO TITLES */}
				<div className={styles.sliderText}>
					{!isMobile &&
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
					{isMobile && (
						<h1
							style={{
								animationDelay: `400ms`,
								fontSize: fontSize,
							}}
						>
							{combinedTitles}
						</h1>
					)}
				</div>

				{/* STICKER */}
				{!isLastSlide && (
					<div
						key={activeSlide}
						className={styles.stickerWrapper}
						style={{
							animationDelay: `${(TOP_10_STICKERS[activeSlide].text.length / 8.5) * 1000}ms`,
						}}
					>
						<Sticker
							text={TOP_10_STICKERS[activeSlide].text}
							fontSize={getFontSize(TOP_10_STICKERS[activeSlide].text.length)}
						/>
					</div>
				)}

				{/* BUTTONS */}
				{isLastSlide && (
					<div className={styles.stickerWrapper}>
						<div className={styles.button}>Buy Now</div>
						<div className={styles.button}>Overthink Later</div>
					</div>
				)}

				{/* ARROWS */}
				{!isLastSlide && !isMobile && (
					<div className={styles.arrowContainer} onClick={handleNextSlide}></div>
				)}
				{!isFirstSlide && !isMobile && (
					<div className={styles.arrowContainerLeft} onClick={handlePrevSlide}></div>
				)}

				{/* PAGINATION */}
				<ul className={styles.pagination}>
					{[...Array(HERO_TITLES.length)].map((_, index) => (
						<li
							key={index}
							className={index === activeSlide ? styles.active : ""}
							onClick={() => setActiveSlide(index)}
						></li>
					))}
				</ul>
				<div className={styles.sliderBg}>{TOP_10_STICKERS[activeSlide].text}</div>
			</div>
		</div>
	);
};

export default Slider;
