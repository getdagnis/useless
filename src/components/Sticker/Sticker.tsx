"use client";
import React from "react";

import styles from "./Sticker.module.sass";
import { isMobile } from "react-device-detect";

export interface StickerComponentProps {
	text: string;
	fontSize?: string | number;
	isHovered?: boolean;
}

export function Sticker({ text, fontSize, isHovered }: StickerComponentProps) {
	const [isLongSticker, setIsLongSticker] = React.useState(false);
	if (!text) {
		console.warn("Sticker not found.");
		return null;
	}

	const formattedText = text.split("{{br}}").map((line, index) => (
		<React.Fragment key={index}>
			{line}
			{!isMobile && <br />}
		</React.Fragment>
	));

	const longSticker = formattedText.some((line) => typeof line === "string" && line.length > 50);

	return (
		<div className={styles.stickerHolder}>
			<div
				className={`${longSticker ? styles.stickerLong : styles.sticker} ${
					isHovered ? styles.stickerHovered : ""
				}`}
				style={{ fontSize: fontSize ? fontSize : "1rem" }}
			>
				{isMobile ? formattedText.join(" ") : formattedText}
			</div>
		</div>
	);
}
