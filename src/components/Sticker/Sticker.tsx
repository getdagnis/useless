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
	const [isLongSticker] = React.useState(text.length > 40);
	if (!text) {
		console.log("🚨 *** Sticker not found! *** 🚨");
		return null;
	}

	console.log("🏜💀👾 text.length", text.length);

	console.log("🏜💀👾 text", text);
	console.log("🏜💀👾 isLongSticker", isLongSticker);

	const formattedText = text.split("{{br}}").map((line, index) => (
		<React.Fragment key={index}>
			{line}
			{!isMobile && <br />}
		</React.Fragment>
	));

	return (
		<div className={styles.stickerHolder}>
			<div
				className={`${isLongSticker ? styles.stickerLong : styles.sticker} ${
					isHovered ? styles.stickerHovered : ""
				}`}
				style={{ fontSize: fontSize ? fontSize : "" }}
			>
				{formattedText}
			</div>
		</div>
	);
}
