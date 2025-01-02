"use client";
import React from "react";

import styles from "./Sticker.module.sass";
import { getFontSize } from "@/src/helpers";

export interface StickerComponentProps {
	text: string;
	fontSize: string | number;
}

export function Sticker({ text, fontSize }: StickerComponentProps) {
	if (!text) {
		console.warn("Sticker not found.");
		return null;
	}

	console.log("🥖🥖🇫🇷🇫🇷 sticker.length", text.length);

	return (
		<div className={styles.sticker} style={{ fontSize: fontSize }}>
			{text}
		</div>
	);
}
