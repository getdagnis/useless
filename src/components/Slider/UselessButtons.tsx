import { Button } from "@/src/components";
import styles from "./UselessButtons.module.sass";
import { useState, useEffect } from "react";

interface UselessButtonsProps {
	onClick: () => void;
}

const UselessButtons = ({ onClick }: UselessButtonsProps) => {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<div className={styles.buttonWrapper}>
			<h6>COMPLETELY USELESS BUTTONS</h6>
			<div className={styles.buttons}>
				<div className={styles.btn1}>
					<Button text="Buy Now" onClick={onClick} />
				</div>
				<div
					className={styles.btn2}
					style={{
						position: "fixed",
						left: `${mousePosition.x}px`,
						top: `${mousePosition.y}px`,
						transform: "translate(-50%, -50%)",
					}}
				>
					<Button id="overthinkLater" text="Overthink Later" onClick={onClick} isSecondary />
				</div>
			</div>
		</div>
	);
};

export default UselessButtons;
