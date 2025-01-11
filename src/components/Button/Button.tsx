import React from "react";

import styles from "./Button.module.sass";

export interface ButtonProps {
	text: string;
	onClick: () => void;
	size?: "small" | "medium" | "large";
	icon?: React.ReactNode;
	isPrimary?: boolean;
	isSecondary?: boolean;
	id?: string;
}

export function Button({ text, icon, id, isPrimary, isSecondary, size, onClick }: ButtonProps) {
	return (
		<button
			id={id}
			className={
				isPrimary
					? `${styles.button} ${styles.isPrimary}`
					: isSecondary
					? `${styles.button} ${styles.isSecondary}`
					: icon
					? `${styles.button} ${styles.isIconButton}`
					: styles.button
			}
			onMouseUp={onClick}
		>
			<span className={size ? size : "medium"}>{text}</span>{" "}
			<span className={styles.icon}>{icon}</span>
		</button>
	);
}
