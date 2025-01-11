import { Button } from "@/src/components";
import styles from "./UselessButtons.module.sass";
import { useState, useEffect } from "react";

interface UselessButtonsProps {
	onClick: () => void;
}

const UselessButtons = ({ onClick }: UselessButtonsProps) => {
	return (
		<div className={styles.buttonWrapper}>
			<h6>COMPLETELY USELESS BUTTONS</h6>
			<div className={styles.buttons}>
				<div className={styles.btn1}>
					<Button text="Buy Now" onClick={onClick} />
				</div>
				<div className={styles.btn2}>
					<Button id="overthinkLater" text="Overthink Later" onClick={onClick} isSecondary />
				</div>
			</div>
		</div>
	);
};

export default UselessButtons;
