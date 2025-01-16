import { Button } from "@/src/components";
import styles from "./UselessButtons.module.sass";
import { useState, useEffect, useRef } from "react";

interface UselessButtonsProps {
	onClick: () => void;
}

const UselessButtons = ({ onClick }: UselessButtonsProps) => {
	const [btn2Animation, setBtn2Animation] = useState(styles.btn2Shrink);
	const [loadingRealButtons, setLoadingRealButtons] = useState(0);
	const [showLoading, setshowLoading] = useState(false);

	const [btn2Clicked, setBtn2Clicked] = useState(false);

	const preLoadingRef = useRef<null | NodeJS.Timeout>(null);
	const loadingIntervalRef = useRef<null | NodeJS.Timeout>(null);
	const isMouseDown = useRef(false);

	useEffect(() => {
		const timeoutId = setTimeout(() => setLoadingRealButtons(1), 30000);

		const handleMouseMove = (event: MouseEvent) => {
			if (event.clientY < window.innerHeight * 0.2) {
				setLoadingRealButtons(1);
			}
		};

		document.addEventListener("mousemove", handleMouseMove);

		return () => {
			clearTimeout(timeoutId);
			document.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	const handleBtn1MouseDown = () => {
		isMouseDown.current = true;

		preLoadingRef.current = setTimeout(() => {
			if (isMouseDown.current) {
				setshowLoading(true);
			}
		}, 500);
	};

	const handleBtn1MouseUp = () => {
		isMouseDown.current = false;
		resetLoader();
	};

	const handleBtn1MouseLeave = () => {
		isMouseDown.current = false;
		resetLoader();
	};

	const resetLoader = () => {
		setshowLoading(false);
		setLoadingRealButtons(0);
		if (preLoadingRef.current) clearTimeout(preLoadingRef.current);
		if (loadingIntervalRef.current) clearInterval(loadingIntervalRef.current);
	};

	useEffect(() => {
		if (!showLoading) return;

		loadingIntervalRef.current = setInterval(() => {
			setLoadingRealButtons((prev) => {
				if (prev >= 100) {
					clearInterval(loadingIntervalRef.current!);
					return 100;
				}
				return prev + 1;
			});
		}, 100);

		return () => clearInterval(loadingIntervalRef.current!);
	}, [showLoading]);

	const btn2Animations = () => {
		if (Math.random() < 0.3) {
			setBtn2Animation(styles.btn2Grow);
		} else {
			setBtn2Animation(styles.btn2Shrink);
		}

		setBtn2Clicked(true);

		setTimeout(() => {
			setBtn2Clicked(false);
		}, 3000);
	};

	return (
		<div className={styles.buttonWrapper}>
			<h6>COMPLETELY USELESS BUTTONS</h6>
			{loadingRealButtons !== 100 && (
				<div className={styles.buttons}>
					{/* Button 1 */}
					<div className={styles.btn1}>
						<Button
							text="Buy Now"
							onClick={onClick}
							onMouseDown={handleBtn1MouseDown}
							onMouseUp={handleBtn1MouseUp}
							onMouseLeave={handleBtn1MouseLeave}
						/>
					</div>

					{/* Button 2 */}
					<div
						className={`${styles.btn2} ${btn2Animation}`}
						onClick={btn2Animations}
						style={
							btn2Clicked
								? {
										opacity: 0,
								  }
								: {}
						}
					>
						<Button id="overthinkLater" text="Overthink Later" onClick={onClick} />
					</div>
				</div>
			)}

			{/* Loading Bar */}
			{showLoading && (
				<div className={styles.loading} style={{ width: loadingRealButtons + "%" }}>
					<p>{loadingRealButtons > 0 && `Loading the real buttons... ${loadingRealButtons}%`}</p>
				</div>
			)}

			{loadingRealButtons === 100 && (
				<div className={styles.realButtons}>
					<p>Real Buttons</p>
				</div>
			)}
		</div>
	);
};

export default UselessButtons;
