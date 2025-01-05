"use client";
import React from "react";

import styles from "./Sticker.module.sass";

export interface StickerComponentProps {
	text: string;
	fontSize?: string | number;
	isHovered?: boolean;
}

export function Sticker({ text, fontSize, isHovered }: StickerComponentProps) {
	if (!text) {
		console.warn("Sticker not found.");
		return null;
	}

	console.log("🏜💀👾 isHovered", isHovered);

	const formattedText = text.split("{{br}}").map((line, index) => (
		<React.Fragment key={index}>
			{line}
			<br />
		</React.Fragment>
	));

	return (
		<div className={styles.stickerHolder}>
			<div
				className={`${styles.sticker} ${isHovered ? styles.stickerHovered : ""}`}
				style={{ fontSize: fontSize ? fontSize : "1rem" }}
			>
				{formattedText}
			</div>
		</div>
	);
}
