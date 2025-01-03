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

	return (
		<div className={styles.sticker} style={{ fontSize: fontSize }}>
			{text}
		</div>
	);
}
