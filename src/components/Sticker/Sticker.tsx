"use client";
import React from "react";

import styles from "./Sticker.module.sass";

export interface StickerComponentProps {
	text: string;
	fontSize: string | number;
}

export function Sticker({ text, fontSize }: StickerComponentProps) {
	if (!text) {
		console.warn("Sticker not found.");
		return null;
	}

	const formattedText = text.split("{{br}}").map((line, index) => (
		<React.Fragment key={index}>
			{line}
			<br />
		</React.Fragment>
	));

	return (
		<div className={styles.sticker} style={{ fontSize: fontSize }}>
			{formattedText}
		</div>
	);
}
